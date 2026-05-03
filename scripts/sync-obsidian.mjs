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
  const parsedEntries = await Promise.all(sourceFiles.map(loadMarkdownFile))
  const result = {
    scanned: sourceFiles.length,
    published: 0,
    skipped: 0,
    images: 0,
    warnings: [],
    errors: [],
    removedPosts: 0,
    removedImageDirs: 0,
  }
  const publishableEntries = []

  for (const entry of parsedEntries) {
    if (!isPublishable(entry.parsed.data.publish)) {
      result.skipped += 1
      continue
    }

    const slug = getSlug(entry.parsed.data.slug, entry.sourceFile)
    const existingMetadata = await readExistingPostMetadata(slug)
    const { data, warnings } = enrichFrontmatter({
      data: entry.parsed.data,
      content: entry.parsed.content,
      existingMetadata,
      sourceFile: entry.sourceFile,
    })
    const validationErrors = validateFrontmatter({
      data,
      slug,
      sourceFile: entry.sourceFile,
    })

    if (validationErrors.length > 0) {
      result.errors.push(...validationErrors)
      continue
    }

    publishableEntries.push({
      ...entry,
      parsed: {
        ...entry.parsed,
        data,
      },
      slug,
      metadataWarnings: warnings,
    })
  }

  result.errors.push(...validateDuplicateSlugs(publishableEntries))

  if (result.errors.length > 0) {
    printSummary(result)
    process.exitCode = 1
    return
  }

  await fs.mkdir(config.outputPostDir, { recursive: true })
  await fs.mkdir(config.outputImageDir, { recursive: true })

  for (const entry of publishableEntries) {
    const { parsed, slug } = entry
    const imageOutputDir = path.join(config.outputImageDir, slug)
    await fs.rm(imageOutputDir, { recursive: true, force: true })
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
    result.warnings.push(
      ...entry.metadataWarnings.map((warning) => `${slug}: ${warning}`),
    )
    result.warnings.push(...warnings.map((warning) => `${slug}: ${warning}`))
  }

  const cleanupResult = await removeStaleGeneratedContent(
    new Set(publishableEntries.map((entry) => entry.slug)),
  )
  result.removedPosts = cleanupResult.removedPosts
  result.removedImageDirs = cleanupResult.removedImageDirs

  printSummary(result)
}

async function loadMarkdownFile(sourceFile) {
  const raw = await fs.readFile(sourceFile, 'utf8')

  return {
    sourceFile,
    parsed: matter(raw),
  }
}

async function readExistingPostMetadata(slug) {
  const existingPostPath = path.join(config.outputPostDir, `${slug}.mdx`)

  try {
    const raw = await fs.readFile(existingPostPath, 'utf8')
    return matter(raw).data
  } catch {
    return null
  }
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

function enrichFrontmatter({ data, content, existingMetadata, sourceFile }) {
  const nextData = { ...data }
  const warnings = []
  const fileName = path.relative(config.obsidianPostDir, sourceFile)

  if (
    (typeof nextData.description !== 'string' ||
      nextData.description.trim().length === 0) &&
    typeof existingMetadata?.description === 'string' &&
    existingMetadata.description.trim().length > 0
  ) {
    nextData.description = existingMetadata.description
    warnings.push(
      `${fileName}에 description이 없어 기존 발행 글의 description을 재사용했습니다.`,
    )
  }

  if (
    typeof nextData.description !== 'string' ||
    nextData.description.trim().length === 0
  ) {
    const fallbackDescription = createDescriptionFallback(content)

    if (fallbackDescription) {
      nextData.description = fallbackDescription
      warnings.push(
        `${fileName}에 description이 없어 본문 첫 문단으로 자동 생성했습니다.`,
      )
    }
  }

  if (!hasValidTags(nextData.tags) && hasValidTags(existingMetadata?.tags)) {
    nextData.tags = existingMetadata.tags
    warnings.push(
      `${fileName}에 tags가 없어 기존 발행 글의 tags를 재사용했습니다.`,
    )
  }

  return {
    data: nextData,
    warnings,
  }
}

function validateFrontmatter({ data, slug, sourceFile }) {
  const errors = []
  const prefix = `${path.relative(config.obsidianPostDir, sourceFile)}`

  if (slug.length === 0) {
    errors.push(`${prefix}: slug를 만들 수 없습니다. 파일명 또는 frontmatter slug를 확인해주세요.`)
  }

  if (typeof data.title !== 'string' || data.title.trim().length === 0) {
    errors.push(`${prefix}: title은 비어 있지 않은 문자열이어야 합니다.`)
  }

  if (!data.date || Number.isNaN(new Date(data.date).getTime())) {
    errors.push(`${prefix}: date는 올바른 날짜여야 합니다.`)
  }

  if (
    typeof data.description !== 'string' ||
    data.description.trim().length === 0
  ) {
    errors.push(`${prefix}: description은 비어 있지 않은 문자열이어야 합니다.`)
  }

  if (!Array.isArray(data.tags) || data.tags.length === 0) {
    errors.push(`${prefix}: tags는 하나 이상의 값을 가진 배열이어야 합니다.`)
  } else if (
    data.tags.some(
      (tag) => typeof tag !== 'string' || tag.trim().length === 0,
    )
  ) {
    errors.push(`${prefix}: tags에는 비어 있지 않은 문자열만 사용할 수 있습니다.`)
  }

  if (data.thumbnail != null && typeof data.thumbnail !== 'string') {
    errors.push(`${prefix}: thumbnail은 문자열 경로여야 합니다.`)
  }

  return errors
}

function hasValidTags(tags) {
  return (
    Array.isArray(tags) &&
    tags.length > 0 &&
    tags.every((tag) => typeof tag === 'string' && tag.trim().length > 0)
  )
}

function createDescriptionFallback(content) {
  const paragraphs = content
    .split(/\n\s*\n/)
    .map((paragraph) => stripMarkdown(paragraph).replace(/\s+/g, ' ').trim())
    .filter(Boolean)

  if (paragraphs.length === 0) {
    return ''
  }

  return paragraphs[0].slice(0, 140).trim()
}

function stripMarkdown(value) {
  return value
    .replace(/!\[\[[^\]]+\]\]/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
    .replace(/\[(.*?)\]\([^)]+\)/g, '$1')
    .replace(/[`*_>#-]/g, ' ')
}

function validateDuplicateSlugs(entries) {
  const counts = new Map()

  for (const entry of entries) {
    counts.set(entry.slug, (counts.get(entry.slug) || 0) + 1)
  }

  return entries
    .filter((entry) => counts.get(entry.slug) > 1)
    .map(
      (entry) =>
        `${path.relative(config.obsidianPostDir, entry.sourceFile)}: slug "${entry.slug}"가 중복됩니다.`,
    )
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
  frontmatter.contentSource = 'obsidian'

  if (frontmatter.date) {
    frontmatter.date = formatDate(frontmatter.date)
  }

  if (frontmatter.description) {
    frontmatter.description = String(frontmatter.description).trim()
  }

  if (Array.isArray(frontmatter.tags)) {
    frontmatter.tags = frontmatter.tags.map((tag) => String(tag).trim())
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

async function removeStaleGeneratedContent(publishedSlugs) {
  const result = {
    removedPosts: 0,
    removedImageDirs: 0,
  }

  const outputEntries = await fs.readdir(config.outputPostDir, {
    withFileTypes: true,
  })

  for (const entry of outputEntries) {
    if (!entry.isFile() || !entry.name.endsWith('.mdx')) {
      continue
    }

    const slug = entry.name.replace(/\.mdx$/, '')
    if (publishedSlugs.has(slug)) {
      continue
    }

    const fullPath = path.join(config.outputPostDir, entry.name)
    const fileContents = await fs.readFile(fullPath, 'utf8')
    const parsed = matter(fileContents)

    if (!isManagedObsidianPost({ slug, parsed, content: fileContents })) {
      continue
    }

    await fs.rm(fullPath, { force: true })
    result.removedPosts += 1
  }

  const imageEntries = await fs.readdir(config.outputImageDir, {
    withFileTypes: true,
  })

  for (const entry of imageEntries) {
    if (!entry.isDirectory() || publishedSlugs.has(entry.name)) {
      continue
    }

    await fs.rm(path.join(config.outputImageDir, entry.name), {
      recursive: true,
      force: true,
    })
    result.removedImageDirs += 1
  }

  return result
}

function isManagedObsidianPost({ slug, parsed, content }) {
  if (parsed.data.contentSource === 'obsidian') {
    return true
  }

  const encodedPrefix = `/images/obsidian/${encodeURIComponent(slug)}/`
  const thumbnail = String(parsed.data.thumbnail || '')

  return thumbnail.includes(encodedPrefix) || content.includes(encodedPrefix)
}

function printSummary(result) {
  console.log('Obsidian 동기화 완료')
  console.log(`- 확인한 글: ${result.scanned}개`)
  console.log(`- 발행한 글: ${result.published}개`)
  console.log(`- 건너뛴 글: ${result.skipped}개`)
  console.log(`- 복사한 이미지: ${result.images}개`)
  console.log(`- 정리한 글: ${result.removedPosts}개`)
  console.log(`- 정리한 이미지 폴더: ${result.removedImageDirs}개`)

  if (result.warnings.length > 0) {
    console.warn('\n경고')
    for (const warning of result.warnings) {
      console.warn(`- ${warning}`)
    }
  }

  if (result.errors.length > 0) {
    console.error('\n오류')
    for (const error of result.errors) {
      console.error(`- ${error}`)
    }
  }
}

main().catch((error) => {
  console.error('Obsidian 동기화 실패')
  console.error(error)
  process.exitCode = 1
})
