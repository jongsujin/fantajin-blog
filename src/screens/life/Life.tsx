import Link from 'next/link'
import { Card, CardContent } from '@/src/shared/ui/Card'
import { SITE_PATHS } from '@/src/shared/config/routes'

const upcomingTopics = [
  '개발자 커리어와 일하는 방식',
  '회고, 책, 일상에서 얻은 배움',
  '재테크와 생활 루틴 정리',
]

export default function LifePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="bg-cardColor/90 shadow-lg">
        <CardContent className="p-8">
          <div className="mb-10">
            <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-gray-500 uppercase">
              Life
            </p>
            <h1 className="mb-4 text-3xl font-bold">잡담과 생각을 모아둘 공간</h1>
            <p className="max-w-3xl leading-relaxed text-gray-400">
              이 공간에는 기술 글보다 조금 더 가벼운 기록을 쌓아갈 예정입니다.
              커리어에서 배운 점, 생활 루틴, 재테크와 회고처럼 시간이 지나도
              다시 꺼내보고 싶은 메모를 천천히 모아두겠습니다.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-backgroundColor/50 h-full">
              <CardContent className="h-full p-6">
                <h2 className="mb-4 text-xl font-semibold">곧 다룰 이야기</h2>
                <ul className="space-y-3 text-gray-400">
                  {upcomingTopics.map((topic) => (
                    <li key={topic} className="flex items-start gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-blue-400" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-backgroundColor/50 h-full">
              <CardContent className="flex h-full flex-col gap-4 p-6">
                <h2 className="text-xl font-semibold">둘러보기</h2>
                <p className="leading-relaxed text-gray-400">
                  아직 잡담 글이 많지 않아서, 우선은 블로그 메인과 태그 페이지에서
                  현재 글들을 더 둘러볼 수 있게 연결해두었습니다.
                </p>
                <div className="mt-auto flex flex-wrap gap-3">
                  <Link
                    href={SITE_PATHS.home}
                    className="tag-border rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100/10"
                  >
                    블로그 메인 보기
                  </Link>
                  <Link
                    href={SITE_PATHS.tags}
                    className="tag-border rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100/10"
                  >
                    태그 전체 보기
                  </Link>
                  <Link
                    href={SITE_PATHS.about}
                    className="tag-border rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100/10"
                  >
                    소개 페이지 보기
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
