import { Card, CardContent } from '@/src/shared/ui/Card'
import Link from 'next/link'
import { Tag } from '@/src/widget/tag/ui/Tag'
import { Post } from '@/src/entities/post/model/types'
import Pagination from '@/src/shared/ui/Pagination'

interface TagListProps {
  posts: Post[]
  tag?: string
}

export default function TagList({ posts, tag }: TagListProps) {
  // 모든 포스트에서 태그 추출
  const allTags = posts?.flatMap((post) => post.tags) || []

  // 중복 제거 및 태그별 게시글 수 계산
  const tagCounts = allTags.reduce(
    (acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  // 태그 알파벳 순으로 정렬
  const uniqueTags = Object.keys(tagCounts).sort()

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="bg-cardColor/90 shadow-lg">
        <CardContent className="p-4">
          <h1 className="mb-8 border-b border-gray-800 pb-2 text-3xl font-bold">
            {tag ? `${tag} 관련 게시글` : '태그 목록'}
          </h1>

          {!tag && (
            <div className="mb-8">
              <p className="mb-4">
                블로그에 사용된 모든 태그 목록입니다. 태그를 클릭하면 해당
                태그의 게시글을 볼 수 있습니다.
              </p>
            </div>
          )}

          {!tag ? (
            <div className="flex flex-wrap gap-4">
              {uniqueTags.map((tag) => (
                <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`}>
                  <div className="group transition-transform duration-300 hover:scale-105">
                    <div className="flex items-center gap-2">
                      <Tag tag={tag} />
                      <span className="text-sm text-gray-400">
                        ({tagCounts[tag]})
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            // 태그별 게시글 목록 및 페이지네이션은 클라이언트 컴포넌트로 분리
            <Pagination posts={posts} tag={tag} itemsPerPage={6} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
