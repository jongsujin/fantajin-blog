import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/src/shared/ui/Card'

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="bg-cardColor/90 border border-gray-800/60 shadow-lg">
        <CardContent className="p-8">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
            <div className="flex w-full justify-between border border-white">
              <h2 className="mb-6 w-full border-b border-gray-800 pb-2 text-2xl font-bold text-gray-100">
                Fanta Jin
              </h2>
              <div className="flex h-full gap-4 border border-white">
                <Link
                  href="https://github.com/fanta-jin"
                  className="hover:text-hoverColor text-gray-400 transition-colors"
                >
                  <Image
                    src="/logo/github.svg"
                    alt="github"
                    width={24}
                    height={24}
                  />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/fanta-jin/"
                  className="hover:text-hoverColor text-gray-400 transition-colors"
                >
                  <Image
                    src="/logo/linkedin.svg"
                    alt="linkedin"
                    width={24}
                    height={24}
                  />
                </Link>
                <Link
                  href="mailto:jjs9836@naver.com"
                  className="hover:text-hoverColor text-gray-400 transition-colors"
                >
                  <Image
                    src="/logo/mail.svg"
                    alt="mail"
                    width={24}
                    height={24}
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="aspect-video w-1/2 border border-white bg-gray-400" />

          {/* 경력 사항 */}
          <div className="mt-12">
            <h2 className="mb-6 border-b border-gray-800 pb-2 text-2xl font-bold text-gray-100">
              경력 사항
            </h2>

            <div className="space-y-8">
              <div className="bg-backgroundColor/50 rounded-lg p-6">
                <h3 className="mb-2 text-xl font-semibold text-gray-100">
                  시니어 프론트엔드 개발자
                </h3>
                <p className="mb-3 text-gray-500">
                  ABC 테크놀로지 | 2020 - 현재
                </p>
                <p className="text-gray-400">
                  - React와 TypeScript를 활용한 웹 애플리케이션 개발
                  <br />
                  - 마이크로프론트엔드 아키텍처 설계 및 구현
                  <br />
                  - 주니어 개발자 멘토링 및 코드 리뷰
                  <br />- 성능 최적화 및 접근성 개선
                </p>
              </div>

              <div className="bg-backgroundColor/50 rounded-lg p-6">
                <h3 className="mb-2 text-xl font-semibold text-gray-100">
                  프론트엔드 개발자
                </h3>
                <p className="mb-3 text-gray-500">
                  XYZ 소프트웨어 | 2018 - 2020
                </p>
                <p className="text-gray-400">
                  - Vue.js를 활용한 대시보드 UI 개발
                  <br />
                  - RESTful API 연동 및 상태 관리
                  <br />
                  - 반응형 웹 디자인 구현
                  <br />- 사용자 피드백 기반 UI/UX 개선
                </p>
              </div>
            </div>
          </div>

          {/* 기술 스택 */}
          <div className="mt-12">
            <h2 className="mb-6 border-b border-gray-800 pb-2 text-2xl font-bold text-gray-100">
              기술 스택
            </h2>

            <div className="flex flex-wrap gap-3">
              {[
                'React',
                'Next.js',
                'TypeScript',
                'JavaScript',
                'HTML5',
                'CSS3',
                'Tailwind CSS',
                'Redux',
                'GraphQL',
                'Jest',
                'Cypress',
                'Git',
                'Webpack',
                'Figma',
              ].map((tech) => (
                <span
                  key={tech}
                  className="bg-backgroundColor/80 rounded-full px-3 py-1 text-sm text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
