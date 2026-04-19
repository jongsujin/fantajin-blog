import fs from 'node:fs/promises'
import path from 'node:path'
import os from 'node:os'
import process from 'node:process'
import matter from 'gray-matter'

const projectRoot = process.cwd()
const defaultVaultRoot = path.join(os.homedir(), 'Documents/Obsidian Vault')

const config = {
  obsidianPostDir: resolvePath(
    process.env.OBSIDIAN_POST_DIR ||
      path.join(defaultVaultRoot, 'Blog', 'Posts'),
  ),
  obsidianAttachmentDir: resolvePath(
    process.env.OBSIDIAN_ATTACHMENT_DIR ||
      path.join(defaultVaultRoot, 'Blog', '_attachments'),
  ),
  outputPostDir: resolvePath(
    process.env.OBSIDIAN_OUTPUT_POST_DIR ||
      path.join(projectRoot, 'src/entities/post/content/posts'),
  ),
  outputImageDir: resolvePath(
    process.env.OBSIDIAN_OUTPUT_IMAGE_DIR ||
      path.join(projectRoot, 'public/images/obsidian'),
  ),
}

const imageEmbedPattern = /!\[\[([^\]\n]+)\]\]/g

async function main() {
  const sourceFiles = await findMarkdownFiles(config.obsidianPostDir)
  const result = {
    scanned: sourceFiles.length,
    published: 0,
    skipped: 0,
    images: 0,
    warnings: [],
  }

  await fs.mkdir(config.outputPostDir, { recursive: true })
  await fs.mkdir(config.outputImageDir, { recursive: true })

  for (const sourceFile of sourceFiles) {
    const raw = await fs.readFile(sourceFile, 'utf8')
    const parsed = matter(raw)

    if (!isPublishable(parsed.data.publish)) {
      result.skipped += 1
      continue
    }

    const slug = getSlug(parsed.data.slug, sourceFile)
    const imageOutputDir = path.join(config.outputImageDir, slug)
    await fs.mkdir(imageOutputDir, { recursive: true })

    const { content, imageCount, warnings } = await convertImageEmbeds({
      content: parsed.content,
      slug,
      imageOutputDir,
    })

    const frontmatter = await normalizeFrontmatter({
      data: parsed.data,
      slug,
      imageOutputDir,
      warnings,
    })

    const outputFilePath = path.join(config.outputPostDir, `${slug}.mdx`)
    await fs.writeFile(
      outputFilePath,
      matter.stringify(content.trimStart(), frontmatter),
      'utf8',
    )

    result.published += 1
    result.images += imageCount
    result.warnings.push(...warnings.map((warning) => `${slug}: ${warning}`))
  }

  printSummary(result)
}

function resolvePath(inputPath) {
  if (inputPath.startsWith('~')) {
    return path.join(os.homedir(), inputPath.slice(1))
  }

  return path.resolve(inputPath)
}

async function findMarkdownFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(dir, entry.name)

      if (entry.isDirectory()) {
        return findMarkdownFiles(entryPath)
      }

      if (!entry.isFile() || !entry.name.endsWith('.md')) {
        return []
      }

      return [entryPath]
    }),
  )

  return files.flat().sort()
}

function isPublishable(value) {
  return value === true || value === 'true'
}

function getSlug(frontmatterSlug, sourceFile) {
  if (typeof frontmatterSlug === 'string' && frontmatterSlug.trim()) {
    return slugify(frontmatterSlug)
  }

  return slugify(path.basename(sourceFile, path.extname(sourceFile)))
}

function slugify(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

async function convertImageEmbeds({ content, slug, imageOutputDir }) {
  const warnings = []
  let imageCount = 0
  const replacements = []

  for (const match of content.matchAll(imageEmbedPattern)) {
    const [rawEmbed, rawTarget] = match
    const { attachmentPath, alt } = parseObsidianImageTarget(rawTarget)
    const fileName = path.basename(attachmentPath)
    const sourceImagePath = path.join(
      config.obsidianAttachmentDir,
      attachmentPath,
    )
    const targetImagePath = path.join(imageOutputDir, fileName)

    try {
      await fs.copyFile(sourceImagePath, targetImagePath)
      imageCount += 1
      replacements.push({
        from: rawEmbed,
        to: `![${alt || path.parse(fileName).name}](${toPublicImageUrl(
          slug,
          fileName,
        )})`,
      })
    } catch {
      warnings.push(`이미지를 찾을 수 없어 변환하지 않았습니다: ${rawEmbed}`)
    }
  }

  const convertedContent = replacements.reduce(
    (nextContent, replacement) =>
      nextContent.split(replacement.from).join(replacement.to),
    content,
  )

  return {
    content: convertedContent,
    imageCount,
    warnings,
  }
}

function parseObsidianImageTarget(rawTarget) {
  const [target, alias] = rawTarget.split('|').map((value) => value.trim())
  const fileName = path.basename(target)
  const isSizeAlias = alias && /^\d+(x\d+)?$/.test(alias)

  return {
    attachmentPath: target,
    alt: !alias || isSizeAlias ? path.parse(fileName).name : alias,
  }
}

async function normalizeFrontmatter({ data, slug, imageOutputDir, warnings }) {
  const frontmatter = { ...data }
  delete frontmatter.publish
  delete frontmatter.slug

  if (frontmatter.date) {
    frontmatter.date = formatDate(frontmatter.date)
  }

  if (frontmatter.thumbnail) {
    frontmatter.thumbnail = await normalizeThumbnail({
      slug,
      thumbnail: String(frontmatter.thumbnail),
      imageOutputDir,
      warnings,
    })
  }

  return frontmatter
}

function formatDate(value) {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10)
  }

  return String(value)
}

function normalizeThumbnail({ slug, thumbnail, imageOutputDir, warnings }) {
  if (thumbnail.startsWith('/')) {
    return thumbnail
  }

  const thumbnailFileName = path.basename(thumbnail)
  const sourceImagePath = path.join(config.obsidianAttachmentDir, thumbnail)
  const targetImagePath = path.join(imageOutputDir, thumbnailFileName)

  return fs.copyFile(sourceImagePath, targetImagePath).then(
    () => toPublicImageUrl(slug, thumbnailFileName),
    () => {
      warnings.push(`썸네일 이미지를 찾을 수 없습니다: ${thumbnail}`)
      return thumbnail
    },
  )
}

function toPublicImageUrl(slug, fileName) {
  return `/images/obsidian/${encodeURIComponent(slug)}/${encodeURIComponent(
    fileName,
  )}`
}

function printSummary(result) {
  console.log('Obsidian 동기화 완료')
  console.log(`- 확인한 글: ${result.scanned}개`)
  console.log(`- 발행한 글: ${result.published}개`)
  console.log(`- 건너뛴 글: ${result.skipped}개`)
  console.log(`- 복사한 이미지: ${result.images}개`)

  if (result.warnings.length > 0) {
    console.warn('\n경고')
    for (const warning of result.warnings) {
      console.warn(`- ${warning}`)
    }
  }
}

main().catch((error) => {
  console.error('Obsidian 동기화 실패')
  console.error(error)
  process.exitCode = 1
})
