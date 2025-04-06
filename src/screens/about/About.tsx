import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/src/shared/ui/Card'
import { Tag } from '@/src/widget/tag/ui/Tag'

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="bg-cardColor/90 shadow-lg">
        <CardContent className="p-8">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
            <div className="flex w-full justify-between">
              <h2 className="mb-6 w-full border-b border-gray-800 pb-2 text-2xl font-bold">
                Fanta Jin
              </h2>
            </div>
          </div>

          {/* 프로필 이미지와 소개 */}
          <div className="mt-8 flex flex-col items-center gap-8 md:flex-row md:items-start">
            {/* 프로필 이미지 */}
            <div className="h-48 w-48 overflow-hidden rounded-full border-4 shadow-lg">
              <Image
                src="/assets/profile/Profile.jpg"
                alt="프로필 이미지"
                width={192}
                height={192}
                className="h-full w-full object-cover"
              />
            </div>

            {/* 소개 텍스트 */}
            <div className="flex h-full flex-1 flex-col justify-center">
              <p className="mb-6 leading-relaxed">
                안녕하세요! 사용자 경험을 중요시 하는 프론트엔드 개발자입니다.
                <br />
                기술로 문제를 해결할 수 있는 개발자가 되기 위해 노력하고
                있습니다. 문제를 해결하는 과정에서 더 나은 방법을 찾아내는 것을
                좋아합니다. <br />
                또한 새로운 기술을 배우고 적용하는 것을 좋아합니다.
              </p>

              <p className="mb-6 leading-relaxed">
                늘 성장하고 단단한 개발자가 되기 위해 노력하고 있습니다. <br />
                성장과 도전을 최우선 가치로 여기며 빠르진 않아도 꾸준히 나아감을
                목표로 하고 있습니다.
              </p>

              <div className="flex h-full gap-4">
                <Link
                  href="https://github.com/fanta-jin"
                  className="hover:text-hoverColor transition-colors"
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
                  className="hover:text-hoverColor transition-colors"
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
                  className="hover:text-hoverColor transition-colors"
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

          {/** 할 수 있는 것 */}
          <div className="mt-12">
            <h2 className="mb-6 border-b border-gray-800 pb-2 text-2xl font-bold">
              핵심 역량
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="mb-3 text-xl font-semibold">
                  Frontend Development
                </h3>
                <ul className="list-disc space-y-2 pl-5">
                  <li>React와 Next.js를 활용한 웹 애플리케이션 개발</li>
                  <li>TypeScript를 사용한 타입 안전성 확보</li>
                  <li>
                    Tailwind CSS, Styled Components를 활용한 반응형 UI 구현
                  </li>
                  <li>Recoil, Context API를 이용한 상태 관리</li>
                  <li>Cypress, React Testing Library를 활용한 테스트 작성</li>
                  <li>웹 성능 최적화 및 접근성 개선</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-3 text-xl font-semibold">
                  Backend Development
                </h3>
                <ul className="list-disc space-y-2 pl-5">
                  <li>Node.js, Express를 활용한 RESTful API 개발</li>
                  <li>MySQL 데이터베이스 설계 및 관리</li>
                  <li>
                    AWS Lambda, DynamoDB를 활용한 서버리스 애플리케이션 구축
                  </li>
                  <li>JWT를 이용한 인증 시스템 구현</li>
                  <li>AWS, Vercel을 활용한 배포 및 CI/CD 파이프라인 구축</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 경력 사항 */}
          <div className="mt-12">
            <h2 className="mb-6 border-b border-gray-800 pb-2 text-2xl font-bold">
              경력 사항
            </h2>

            <div className="space-y-8">
              <div className="bg-backgroundColor/50 rounded-lg p-6">
                <h3 className="mb-2 text-xl font-semibold">
                  프론트엔드 개발자
                </h3>
                <p className="mb-3">BIOMATZ | 2024.07 - 현재</p>
                <ul className="list-disc pl-5">
                  <li>React와 TypeScript를 활용한 웹 애플리케이션 개발</li>
                  <li>마이크로프론트엔드 아키텍처 설계 및 구현</li>
                  <li>주니어 개발자 멘토링 및 코드 리뷰</li>
                  <li>성능 최적화 및 접근성 개선</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="mb-6 border-b border-gray-800 pb-2 text-2xl font-bold">
              기술 스택
            </h2>

            <div className="space-y-6">
              {/* 프론트엔드 기술 스택 */}
              <div>
                <h3 className="mb-3 text-xl font-semibold">Frontend Stack</h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    'React',
                    'Next.js',
                    'TypeScript',
                    'JavaScript',
                    'HTML5',
                    'CSS3',
                    'Tailwind CSS',
                    'Jest',
                    'Cypress',
                    'Recoil',
                  ].map((tech) => (
                    <Tag key={tech} tag={tech} />
                  ))}
                </div>
              </div>

              {/* 백엔드 기술 스택 */}
              <div>
                <h3 className="mb-3 text-xl font-semibold">Backend Stack</h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    'Node.js',
                    'Express',
                    'MySQL',
                    'DynamoDB',
                    'AWS',
                    'Vercel',
                  ].map((tech) => (
                    <Tag key={tech} tag={tech} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
