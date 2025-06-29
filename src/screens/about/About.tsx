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
                안녕하세요! 배운 것을 실전에 접목시키고, 팀과 함께 성장하는 문제
                해결형 개발자입니다.
                <br />
                항상 겸손과 협업을 중요시 하며 함께 일하는 사람들의 가치를
                소중히 여기고 최고의 성과를 낼 수 있도록 노력합니다.
              </p>
              <p className="mb-6 leading-relaxed">
                배움과 나눔을 좋아하고 소속된 팀에 기여하는 것을 좋아합니다.
                <br />
                또한 배움에서 그치지 않고 실제로 접목 시키는 것을 중요시 합니다.
                <br />
                단순 개발자 역할에서 끝나는 것이 아닌 아이디어를 실현하고
                사용자의 문제를 해결하는 Solver가 되기 위해 노력하고 있습니다.
                <br />
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
                  <li>
                    Tailwind CSS, Styled Components를 활용한 반응형 UI 구현
                  </li>
                  <li>Cypress, Vitest, Playwright를 활용한 테스트 환경 구축</li>
                  <li>
                    Cytoscape.js, ApexCharts 등을 활용한 대규모 데이터 시각화
                    대시보드 플랫폼 구현 경험
                  </li>
                  <li>Tanstack Query, Recoil, Zustand 등의 상태 관리 경험</li>
                  <li>
                    GitHub Action 을 활용하여 테스트 자동화 및 자동 배포
                    워크플로우 구축 경험
                  </li>
                  <li>
                    S3와 CloudFront를 활용한 프론트엔드 웹 서비스 배포 경험
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-3 text-xl font-semibold">
                  Backend Development
                </h3>
                <ul className="list-disc space-y-2 pl-5">
                  <li>Node.js, Express를 활용한 RESTful API 개발</li>
                  <li>
                    MySQL을 활용한 데이터베이스 쿼리로 데이터 응답 속도 개선
                    경험
                  </li>
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
                <h3 className="mb-2 text-xl font-bold">프론트엔드 개발자</h3>
                <p className="mb-3 font-semibold text-gray-500">
                  바이옴에이츠 | 2024.07 - 현재
                </p>
                <ul className="list-disc pl-5">
                  <li>
                    <p className="font-medium">
                      미생물균주 관리 대시보드 플랫폼 BASyMCo 리뉴얼
                    </p>
                    <ul className="mt-2 list-disc pl-5">
                      <li>
                        기존 Dash 기반 플랫폼 React로 마이그레이션 작업 달성
                      </li>
                      <li>
                        대용량 데이터 시각화 대시보드 플랫폼 구현 및 캐싱과
                        무한스크롤 등으로 시각화 시간 90% 이상 개선
                      </li>
                      <li>
                        AWS 인프라에 맞춰 S3 및 GitHub Actions를 활용한 CI/CD
                        파이프라인 구축
                      </li>
                      <li>
                        Gemini API와 사내 데이터를 활용한 Next.js 기반 챗봇
                        서비스 구현
                      </li>
                      <li>
                        Express.js를 활용한 API 서버 개발과 DB 쿼리 최적화 및
                        프론트엔드 캐싱 전략으로 데이터 처리 시간 80% 이상 개선
                      </li>
                    </ul>
                  </li>
                  <li className="mt-3">
                    <p className="font-medium">스마트팜 대시보드 플랫폼 개발</p>
                    <ul className="mt-2 list-disc pl-5">
                      <li>
                        농장 데이터 관리 및 분석 대시보드 플랫폼 프론트엔드 파트
                        리더 역할 수행
                      </li>
                      <li>
                        작물 생육, 양액 공급 , 업무일지 등 데이터 시각화 및 기록
                        기능 개발
                      </li>
                      <li>
                        사용자 요구사항을 반영해 UI/UX 리디자인 및 신규 페이지
                        기획
                      </li>
                      <li>
                        Express 기반 API 개발, 페이지 재설계 및 프론트엔드
                        작업으로 데이터 응답 시간을 2초 이내로 개선
                      </li>
                    </ul>
                  </li>
                  <li className="mt-3">
                    <p className="font-medium">
                      스마트팜 농장 데이터 관리 챗봇 서비스 Farmit 플랫폼 개발
                    </p>
                    <ul className="mt-2 list-disc pl-5">
                      <li>
                        Next.js 서버 컴포넌트를 활용하여 데이터 요청 최소화 및
                        컴포넌트 역할 분리
                      </li>
                      <li>Vercel AI SDK, Google Gemini API 기반 챗봇 구현</li>
                      <li>
                        사용자 질문에 맞는 함수를 호출해 사용자 데이터 기반
                        답변을 제공하는 Function Calling 챗봇 구현
                      </li>
                      <li>
                        프롬프트 분리 및 라우팅 설계로 토큰 사용량 30% 최적화
                      </li>
                      <li>
                        합성 컴포넌트 패턴 도입으로 재사용 가능한 컴포넌트 설계
                      </li>
                      <li>
                        Web Animation API를 통한 공통 애니메이션 컴포넌트 구축
                      </li>
                    </ul>
                  </li>
                  <li className="mt-3">
                    <p className="font-medium">
                      영상 텍스트 추출 웹 서비스 개발
                    </p>
                    <ul className="mt-2 list-disc pl-5">
                      <li>
                        사내 데이터 정제화를 위한 Next.js 기반 영상 텍스트 추출
                        서비스 개발
                      </li>
                      <li>
                        Google Cloud Text-to-Speech API 및 GCP 버킷 연동으로
                        자동 업로드 기능 구현
                      </li>
                      <li>
                        외부 서드파티 API 기반 서비스를 자체 구현하여 서비스
                        운영 비용 60% 이상 감소 성과 달성
                      </li>
                    </ul>
                  </li>
                  <li className="mt-3">
                    <p className="font-medium">GreenTech 2025 박람회 참가</p>
                    <ul className="mt-2 list-disc pl-5">
                      <li>Farmit 플랫폼의 시나리오 기반 사용자 시연 주도</li>
                      <li>해외 부스 운영 및 실시간 제품 데모 경험 보유</li>
                    </ul>
                  </li>
                </ul>
              </div>{' '}
              <div className="bg-backgroundColor/50 rounded-lg px-6 py-4">
                <h3 className="mb-2 text-xl font-bold">
                  프론트엔드 개발자 인턴
                </h3>
                <p className="mb-3 font-semibold text-gray-500">
                  바이옴에이츠 | 2024.03 - 2024.06
                </p>
                <ul className="list-disc pl-5">
                  <li>
                    <p className="font-medium">
                      미생물균주 관리 대시보드 플랫폼 BASyMCo 개발
                    </p>
                    <ul className="mt-2 list-disc pl-5">
                      <li>
                        프로젝트 초기 기획부터 Figma 기반 UI 디자인, 요구사항
                        정의, 개발까지 전 과정 주도적으로 참여
                      </li>
                      <li>기존 Dash 기반 플랫폼 React로 전환 작업 달성</li>
                      <li>
                        TanStack Query를 활용해 무한스크롤 및 캐싱 기반 균주
                        생장 곡선 시각화 성능을 1초 이내로 80% 이상 단축
                      </li>
                      <li>
                        AWS S3 + CloudFront, GitHub Actions 기반 자동 배포 환경
                        구축
                      </li>
                    </ul>
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
                    'Playwright',
                    'Vitest',
                    'Recoil',
                    'Zustand',
                    'Tanstack Query',
                    'Tanstack Table',
                    'React Hook Form',
                    'Cytoscape.js',
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
