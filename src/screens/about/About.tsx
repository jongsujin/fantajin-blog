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
                  href="https://github.com/jongsujin"
                  className="hover:text-hoverColor transition-colors"
                  target="_blank"
                >
                  <Image
                    src="/logo/github.svg"
                    alt="github"
                    width={24}
                    height={24}
                  />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/%EC%A2%85%EC%88%98-%EC%A7%84-723550332/?trk=opento_sprofile_goalscard"
                  className="hover:text-hoverColor transition-colors"
                  target="_blank"
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
                  target="_blank"
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
                  <li>Cypress, Vitest를 활용한 테스트 환경 구축</li>
                  <li>
                    Cytoscape.js, ApexCharts 등을 활용한 대규모 데이터터 시각화
                    대시보드 플랫폼 구현 경험
                  </li>
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
                  <li>기존 Dash 기반 플랫폼 React로 마이그레이션 작업 달성</li>
                  <li>
                    대용량 데이터 시각화 대시보드 플랫폼 구현 및 캐싱과
                    무한스크롤 등으로 시각화 시간 90% 이상 개선
                  </li>
                  <li>
                    AWS 인프라에 맞춰 S3 및 GitHub Actions를 활용한 CI/CD
                    파이프라인 구축
                  </li>
                  <li>
                    Gemini API와 사내 데이터를 활용한 Next.js 기반 챗봇 서비스
                    구현
                  </li>
                  <li>
                    Express.js를 활용한 API 서버 개발과 DB 쿼리 최적화 및
                    프론트엔드 캐싱 전략으로 데이터 처리 시간 80% 이상 개선
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="mb-6 border-b border-gray-800 pb-2 text-2xl font-bold">
              기타 활동
            </h2>
            <div className="space-y-8">
              <div className="bg-backgroundColor/50 rounded-lg p-6">
                <h3 className="mb-2 text-xl font-semibold">
                  오픈소스 컨트리뷰션 아카데미 멘티
                </h3>
                <p className="mb-3">2024.09 - 2024.10</p>
                <ul className="list-disc pl-5">
                  <li>AntDesign 라이브러리 한글화 작업 참여</li>
                  <li>
                    AntDesign 컴포넌트 번역 파트를 맡아, 사용자 친화적인 번역
                    작업을 하기 위한 팀 내 협업 경험
                  </li>
                </ul>
              </div>
              <div className="bg-backgroundColor/50 rounded-lg p-6">
                <h3 className="mb-2 text-xl font-semibold">
                  야놀자X패스트캠퍼스 프론트엔드 부트캠프 1기
                </h3>
                <p className="mb-3">2023.07 - 2024.01</p>
                <ul className="list-disc pl-5">
                  <li>
                    야놀자X패스트캠퍼스 프론트엔드 부트캠프 1기 교육생으로 참여
                  </li>
                  <li>
                    Next.js , React 기반의 협업 프로젝트를 경험하였고 우수
                    수료생 선정
                  </li>
                </ul>
              </div>
              <div className="bg-backgroundColor/50 rounded-lg p-6">
                <h3 className="mb-2 text-xl font-semibold">
                  한국장학재단 사회리더대학생멘토링 12기 수료
                </h3>
                <p className="mb-3">2022.05 - 2022.11</p>
                <ul className="list-disc pl-5">
                  <li>
                    한국장학재단 사회리더대학생멘토링 IT 분야 멘토링 참여로
                    글로벌 리더 및 좋은 개발자가 되기 위한 지식과 마인드 함양
                    경험
                  </li>
                  <li>멘티 대표 팀장을 역임하여 일정 및 프로젝트 관리 경험</li>
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
                    'Zustand',
                    'Tanstack Query',
                    'Tanstack Table',
                    'React Hook Form',
                    'CytoScrape',
                    'ApexCharts',
                    'Plotly.js',
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
                    'AWS Lambda',
                    'AWS S3',
                    'AWS CloudFront',
                    'AWS SNS',
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
