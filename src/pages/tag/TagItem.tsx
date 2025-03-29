import { Card, CardContent } from '@/src/shared/ui/Card'
import { PostCard } from '@/src/widget/post-card/ui/PostCard'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { Post } from '@/src/entities/post/model/types'
import Link from 'next/link'
import { getAllPosts } from '@/src/entities/post/api/post'

interface TagItemProps {
  posts: Post[]
  tag: string
}

interface Params extends ParsedUrlQuery {
  tag: string
}

export default function TagItem({ posts, tag }: TagItemProps) {
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="bg-cardColor/90 mb-8 border border-gray-800/60 shadow-lg">
        <CardContent className="p-8">
          <div className="flex w-full items-center justify-between">
            <h1 className="flex items-center gap-3 text-center text-2xl font-bold text-gray-100">
              <p>
                <span className="text-textColor">{tag}</span> 관련 게시글
              </p>
            </h1>
            <Link
              href="/tags"
              className="text-hoverColor text-sm hover:underline"
            >
              모든 태그 보기
            </Link>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {posts.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-gray-400">이 태그에 해당하는 게시글이 없습니다.</p>
        </div>
      )}
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts()
  const tags = [...new Set(posts.flatMap((post) => post.tags))]

  const paths = tags.map((tag) => ({
    params: { tag },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<TagItemProps, Params> = async ({
  params,
}) => {
  const tag = params?.tag as string
  const allPosts = await getAllPosts()
  const filteredPosts = allPosts.filter((post) => post.tags.includes(tag))

  return {
    props: {
      posts: filteredPosts,
      tag,
    },
  }
}
