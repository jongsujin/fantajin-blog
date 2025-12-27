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
                  <li>React를 활용한 컴포넌트 기반 사용자 인터페이스 개발</li>
                  <li>
                    Next.js를 활용한 서버사이드 렌더링 기반 웹 애플리케이션 개발
                  </li>
                  <li>
                    Tailwind CSS, Styled Component, Emotion 등의 CSS 활용 경험
                  </li>
                  <li>Cypress, Playwright를 활용한 테스트 환경 구축</li>
                  <li>Tanstack Query, Recoil, Zustand 등의 상태 관리 경험</li>
                  <li>
                    Cytoscape.js, ApexCharts, Plotly.js 등을 활용한 대규모
                    데이터 시각화 대시보드 플랫폼 구현 경험
                  </li>
                  <li>
                    GitHub Action을 활용하여 테스트 자동화 및 자동 배포
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
                  <li>FastAPI과 LangChain 기반 Agent AI 서버 개발</li>
                  <li>
                    Vertex AI 등 GCP 기반 RAG Vector DB 파이프라인 구축 경험
                  </li>
                  <li>GCP Cloud Run 기반 자동 배포 워크플로우 구축</li>
                  <li>Node.js, Express를 활용한 RESTful API 개발</li>
                  <li>
                    AWS Lambda, DynamoDB를 활용한 서버리스 애플리케이션 구축
                  </li>
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
                <h3 className="mb-2 text-xl font-bold">개발자</h3>
                <p className="mb-3 font-semibold text-gray-500">
                  바이옴에이츠 | 2024.07 - 현재 | 경기도 과천시
                </p>
                <ul className="list-disc pl-5">
                  <li>
                    <p className="font-medium">
                      영농일지 기반 농장 관리 플랫폼 Farmit 출시
                    </p>
                    <ul className="mt-2 list-disc pl-5">
                      <li>
                        Next.js → React 재구축으로 구조 개선 및 유지보수성 향상
                      </li>
                      <li>Storybook CI/CD 도입하여 디자인 시스템 자동화</li>
                      <li>Capacitor + WebView 기반 하이브리드 앱 환경 구축</li>
                      <li>SSE 기반 실시간 챗봇 UI 개발</li>
                      <li>
                        FastAPI 기반 AI 챗봇 서버 및 Cloud Run 배포 파이프라인
                        구성
                      </li>
                      <li>LangChain Agent 기반 대화형 챗봇 API 개발</li>
                      <li>
                        사용자 농사 데이터 기반 &apos;추천 할 일·영농일지 자동
                        생성&apos; 기능 구현
                      </li>
                      <li>
                        Vertex AI 기반 RAG 파이프라인 구축 및 벡터 검색 시스템
                        개발
                      </li>
                    </ul>
                  </li>
                  <li className="mt-3">
                    <p className="font-medium">BASyMCo 서비스 리뉴얼</p>
                    <ul className="mt-2 list-disc pl-5">
                      <li>
                        기존 폴더 구조를 FSD 방식으로 개편하여 컴포넌트 재사용성
                        및 유지 보수성 향상
                      </li>
                      <li>
                        불필요한 라이브러리 삭제 및 코드 스플리팅으로 번들 크기
                        50% 이상 최적화 및 빌드 시간 30% 향상
                      </li>
                      <li>
                        Playwright을 활용한 e2e 테스트 기반 CI/CD 파이프라인
                        구축
                      </li>
                    </ul>
                  </li>
                  <li className="mt-3">
                    <p className="font-medium">스마트팜 대시보드 플랫폼 개발</p>
                    <ul className="mt-2 list-disc pl-5">
                      <li>
                        작물 생육, 양액 공급, 업무일지 등 농장 운영 데이터
                        시각화 기능 개발
                      </li>
                      <li>
                        사용자 요구 반영해 UI/UX 전면 리디자인 및 신규 페이지
                        기획
                      </li>
                      <li>
                        Express 기반 API 개발 및 페이지 구조 개선으로 데이터
                        응답 속도 2초 이내로 최적화
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
                </ul>
              </div>{' '}
              <div className="bg-backgroundColor/50 rounded-lg px-6 py-4">
                <h3 className="mb-2 text-xl font-bold">학생 연구원</h3>
                <p className="mb-3 font-semibold text-gray-500">
                  바이옴에이츠 | 2024.03 - 2024.06 | 경기도 과천시
                </p>
                <ul className="list-disc pl-5">
                  <li>
                    <p className="font-medium">
                      사내 미생물 복합균주 관리 및 시각화 플랫폼 BASyMCo 개발
                    </p>
                    <ul className="mt-2 list-disc pl-5">
                      <li>
                        프로젝트 초기 기획부터 Figma 기반 UI 디자인, 요구사항
                        정의, 개발까지 전 과정 주도적으로 참여
                      </li>
                      <li>기존 Python 구조를 React 기반으로 전환</li>
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
                    'FastAPI',
                    'LangChain',
                    'Vertex AI',
                    'GCP Cloud Run',
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
