'use server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(
  process.cwd(),
  'src/entities/post/content/posts',
)

function readPostFile(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`)
  return fs.readFileSync(fullPath, 'utf8')
}

function parsePostSummary(fileContents: string, slug: string) {
  const { data } = matter(fileContents)

  return {
    slug,
    title: data.title || '',
    date: data.date || '',
    description: data.description || '',
    tags: data.tags || [],
    thumbnail: data.thumbnail || '',
  }
}

// 모든 포스트 가져오기 함수 추가
export async function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory)

  const allPostsData = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith('.mdx'))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.mdx$/, '')
        const fileContents = fs.readFileSync(
          path.join(postsDirectory, fileName),
          'utf8',
        )

        return parsePostSummary(fileContents, slug)
      }),
  )

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export async function getPostMetadataBySlug(slug: string) {
  return parsePostSummary(readPostFile(slug), slug)
}

export async function getPostBySlug(slug: string) {
  const fileContents = readPostFile(slug)

  const { content } = matter(fileContents)

  return {
    ...parsePostSummary(fileContents, slug),
    content,
  }
}
