import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkGfm from 'remark-gfm' // GitHub Flavored Markdown 지원 (체크박스 등)

const postsDirectory = path.join(
  process.cwd(),
  'src/entities/post/content/posts',
)

// 모든 포스트 가져오기 함수 추가
export async function getAllPosts() {
  // 디렉토리에서 모든 파일 이름 가져오기
  const fileNames = fs.readdirSync(postsDirectory)

  // 각 파일에서 데이터 추출
  const allPostsData = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith('.mdx'))
      .map(async (fileName) => {
        // 파일 이름에서 .mdx 확장자 제거하여 slug 생성
        const slug = fileName.replace(/\.mdx$/, '')

        // 파일 전체 경로
        const fullPath = path.join(postsDirectory, fileName)

        // 파일 내용 읽기
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        // gray-matter로 메타데이터 파싱
        const { data } = matter(fileContents)

        // 타입 안전성을 위한 기본값 설정
        const post = {
          slug,
          title: data.title || '',
          date: data.date || '',
          description: data.description || '',
          tags: data.tags || [],
          thumbnail: data.thumbnail || '',
          // content는 블로그 목록에서는 필요 없으므로 제외
        }

        return post
      }),
  )

  // 날짜 기준 내림차순 정렬 (최신 글이 먼저 오도록)
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export async function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // 프론트매터와 콘텐츠 분리
  const { data, content } = matter(fileContents)

  // MDX 콘텐츠 직렬화
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [
        remarkGfm, // 체크박스 지원을 위해 필요
      ],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        rehypeHighlight,
      ],
    },
    parseFrontmatter: false, // 이미 matter로 처리했기 때문
  })

  return {
    slug,
    title: data.title || '',
    date: data.date || '',
    description: data.description || '',
    tags: data.tags || [],
    content: mdxSource,
    thumbnail: data.thumbnail || '',
  }
}
