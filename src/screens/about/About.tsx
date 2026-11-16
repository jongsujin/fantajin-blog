import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/src/shared/ui/Card'
import { Tag } from '@/src/widget/tag/ui/Tag'

interface ProjectItem {
  title: string
  period?: string
  descriptions: string[]
  techStack: string[]
}

interface CareerItem {
  company: string
  period: string
  role: string
  projects: ProjectItem[]
}

const CAREER_DATA: CareerItem[] = [
  {
    company: '(주)온라이브플러스',
    period: '2026.03 - 재직중',
    role: 'Software Engineer · 선임 (정규직)',
    projects: [
      {
        title: '리워드 앱테크 플랫폼 Cashpocket 개발 및 운영',
        descriptions: [
          '광고주가 상품 정보를 반복 입력해야 하는 캠페인 생성 과정을 개선했습니다. 웹 스크래핑 파이프라인으로 상품 URL에서 이미지·상품 정보를 자동 수집하고 AI로 등록 데이터를 구조화하여 캠페인 생성 시간을 80% 이상 단축했습니다.',
          'Sentry 기반 모니터링 시스템을 도입하여 사용자 문의 이후 대응하던 운영 방식을 릴리즈 및 이벤트 중심의 선제적 모니터링 체계로 개선했습니다.',
          'Maestro 기반 React Native E2E 테스트 파이프라인을 구축하여 회원가입, 캠페인 신청 및 리뷰 제출, 알림 등 핵심 사용자 플로우를 배포 전 자동 검증할 수 있는 환경을 마련했습니다.',
        ],
        techStack: [
          'Next.js',
          'React Native',
          'MongoDB',
          'AWS EC2',
          'Playwright',
          'Maestro',
          'Sentry',
        ],
      },
      {
        title: '개발 생산성 향상을 위한 도구 제작 및 AI Native 환경 구축',
        descriptions: [
          '환경변수를 공유하는 과정에서 발생하는 번거로움과 보안상 위험을 해결하기 위해 age 암호화 라이브러리 기반 환경변수 관리 CLI와 만료일 설정 및 관리 이력을 추적할 수 있는 시스템을 구축했습니다.',
          '하네스 엔지니어링 기법과 ADR 문서를 적용하여 Claude Code 기반 사내 플러그인 마켓플레이스를 구축했으며, 코드 리뷰 시간을 50% 이상 단축하고 Sentry 에러 대응 시간을 80% 이상 단축했습니다.',
          'API 명세서 작성 및 실제 호출 흐름을 비교하는 플러그인을 개발하여 약 140개의 미사용 API를 식별 및 정리하고, API 명세서가 누락되지 않는 시스템을 구축했습니다.',
          '기존 수동 배포 시스템을 개선하기 위해 CI/CD 환경을 구축하여 동일한 품질 이슈가 재발하지 않는 개발 프로세스를 마련했습니다. 이 과정에서 ESLint 1,600건, TypeScript 관련 에러 900건 등 총 2,500건 이상의 레거시 코드 이슈를 해결하고, 환경변수 CLI를 연동하여 자동으로 환경변수가 주입되는 파이프라인을 구축했습니다.',
          'Docker, Prisma, Seed Script를 활용하여 MongoDB 로컬 개발 환경을 표준화하고 신규 기능 개발 및 테스트 환경을 일관성 있게 구축했습니다.',
        ],
        techStack: [
          'age 암호화 라이브러리',
          'Claude Code',
          'Sentry',
          'CI/CD',
          'ESLint',
          'TypeScript',
          'Docker',
          'Prisma',
          'Seed Script',
          'MongoDB',
        ],
      },
    ],
  },
  {
    company: '(주)바이옴에이츠',
    period: '2024.07 - 2026.02',
    role: 'Frontend Developer · 연구원 (정규직)',
    projects: [
      {
        title: '영농일지 기반 농장 관리 플랫폼 Farmit 개발',
        period: '2024.07 - 2026.02',
        descriptions: [
          '농촌진흥청 데이터와 사내 농법 데이터를 기반으로 문서 청킹·임베딩·인덱싱 파이프라인을 구성하고, Vertex AI Search 기반 벡터 검색 시스템을 구축했습니다. 이를 활용해 사용자 농사 데이터에 맞는 추천 할 일과 영농일지 자동 생성 기능을 구현했습니다.',
          'FastAPI와 LangChain 기반 AI Agent 서버를 구축하여, 사용자 질의에 따라 RAG 검색과 기존 플랫폼 API를 선택적으로 호출하는 에이전틱 아키텍처를 설계했습니다.',
          'SSE 기반 스트리밍 챗봇 UI를 개발하고, Vertex AI Search와의 gRPC 통신에서 발생하던 연결 지연을 Keep-alive 방식으로 개선하여 AI 응답 시간을 120초에서 2초 이내로 약 98% 단축했습니다.',
          'AI 서버를 Cloud Run에 배포하고, 문서 업로드부터 임베딩·인덱싱까지 이어지는 데이터 처리 및 배포 환경을 구성했습니다.',
          '디자이너가 없는 환경에서 공통 컴포넌트를 Storybook으로 관리하고 GitHub Actions 기반 CI/CD를 구축하여 디자인 시스템의 최신 상태를 자동으로 유지하도록 했습니다.',
          'WebView 기반 모바일 앱 출시를 위해 기존 Next.js 서비스를 React 구조로 재구성하고, Capacitor 기반 Android/iOS 하이브리드 앱 환경을 구축했습니다.',
        ],
        techStack: [
          'React',
          'Next.js',
          'Capacitor',
          'FastAPI',
          'Vertex AI',
          'LangChain',
          'LangSmith',
          'Cloud Run',
          'Storybook',
          'GitHub Actions',
        ],
      },
      {
        title: '미생물 복합균주 연구 데이터 관리 플랫폼 BASyMCo 리뉴얼',
        period: '2024.07 - 2026.02',
        descriptions: [
          '수백~수천 개의 생장곡선을 한 화면에서 시각화하며 발생하던 지연을 분석하고, 프론트엔드 렌더링뿐 아니라 백엔드 API의 과도한 응답 데이터도 병목으로 판단해 DTO 구조를 개선했습니다.',
          'TanStack Query 캐싱으로 불필요한 API 호출을 줄이고, Lazy Loading과 Suspense를 적용해 필요한 그래프부터 점진적으로 렌더링하도록 개선하여 생장곡선 렌더링 시간을 20초에서 1초 이내로 약 95% 단축했습니다.',
          '레거시 라이브러리 제거와 코드 스플리팅을 통해 번들 크기를 50% 이상 줄이고 빌드 시간을 약 30% 단축했습니다.',
          'Playwright E2E 테스트를 GitHub Actions CI/CD에 통합하여 데이터 조회·필터링·시각화 등 주요 기능의 사이드 이펙트를 배포 전에 검증할 수 있도록 했습니다.',
          '기존 Python Dash 기반 서비스를 React로 전환하고 AWS S3·CloudFront 기반 배포 환경을 구축하여 유지보수성과 운영 안정성을 개선했습니다.',
        ],
        techStack: [
          'React',
          'TypeScript',
          'TanStack Query',
          'Playwright',
          'GitHub Actions',
          'AWS S3',
          'CloudFront',
        ],
      },
    ],
  },
]

const AI_EXPERIENCES = [
  '웹 스크래핑과 AI로 상품 정보를 자동 수집해 캠페인 생성 시간을 단축했습니다.',
  'Claude Code 기반 사내 플러그인 마켓플레이스를 구축해 코드 리뷰 시간을 단축했습니다.',
  'Vertex AI Search와 LangChain으로 농장 관리 AI 추천 및 챗봇을 개발했습니다.',
]

const SKILLS = [
  'React',
  'Next.js',
  'React Native',
  'TypeScript',
  'JavaScript',
  'HTML',
  'CSS',
  'FastAPI',
  'Nest.js',
  'MongoDB',
  'Firebase',
  'Docker',
]

const ACTIVITIES = [
  {
    title: '오픈소스 컨트리뷰션 아카데미 멘티',
    period: '2024.09 - 2024.10',
    descriptions: [
      'Ant Design 라이브러리 한글화 프로젝트에 참여했습니다.',
      'Ant Design 컴포넌트 번역 파트를 맡아 사용자 친화적인 번역을 제공하기 위해 팀원들과 협업했습니다.',
    ],
  },
  {
    title: '야놀자 X 패스트캠퍼스 프론트엔드 부트캠프 1기',
    period: '2023.07 - 2024.01',
    descriptions: [
      '야놀자 X 패스트캠퍼스 프론트엔드 부트캠프 1기 교육생으로 참여했습니다.',
      'Next.js, React 기반의 협업 프로젝트를 수행했으며 우수 수료생으로 선정되었습니다.',
    ],
  },
  {
    title: '한국장학재단 사회리더대학생멘토링 12기 수료',
    period: '2022.05 - 2022.11',
    descriptions: [
      '한국장학재단 사회리더대학생멘토링 IT 분야 멘티로 참여하여 개발자로서 필요한 지식과 마인드를 함양했습니다.',
      '멘티 대표 팀장을 역임하여 일정 및 프로젝트를 관리했습니다.',
    ],
  },
]

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="bg-cardColor/90 shadow-lg">
        <CardContent className="p-8">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
            <div className="flex w-full justify-between">
              <h2 className="mb-6 w-full border-b border-gray-800 pb-2 text-2xl font-bold">
                Fanta Jin (진종수)
              </h2>
            </div>
          </div>

          {/* 프로필 이미지와 소개 */}
          <div className="mt-8 flex flex-col items-center gap-8 md:flex-row md:items-start">
            {/* 프로필 이미지 */}
            <div className="h-48 w-48 shrink-0 overflow-hidden rounded-full border-4 shadow-lg">
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
              <p className="mb-4 leading-relaxed font-medium">
                React, Next.js, TypeScript 기반으로 웹·앱 서비스를 개발하고 운영해 온 프론트엔드 개발자입니다.
              </p>
              <p className="mb-4 leading-relaxed">
                대용량 연구 데이터 시각화 과정에서 API 요청 개선 후에도 남아 있던 데이터 가공과 그래프 렌더링 병목을 분석하고 해결했습니다. 또한 웹 스크래핑과 AI를 활용한 캠페인 등록 자동화, SSE 기반 AI 챗봇 UI를 구현하며 사용자 경험을 개선해 왔습니다.
              </p>
              <p className="mb-4 leading-relaxed">
                제품 개발뿐 아니라 코드 품질과 개발 생산성 향상에도 관심을 가지고 있습니다. E2E 테스트 자동화와 CI/CD 파이프라인을 구축해 배포 검증 체계를 마련했으며, Claude Code 기반 사내 플러그인 마켓플레이스와 개발 지원 에이전트를 도입해 반복적인 개발 업무를 자동화했습니다. 또한 환경변수 중앙 관리 CLI를 자체 개발해 팀의 보안과 개발 환경 관리 프로세스를 개선했습니다.
              </p>
              <p className="mb-6 leading-relaxed">
                프론트엔드를 중심으로 문제 해결에 필요한 기술 영역까지 확장하며, 사용자 경험과 팀의 개발 생산성을 함께 높이는 개발자를 지향합니다.
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
                  href="https://www.linkedin.com/in/jongsujin/"
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

          {/* 경력 사항 */}
          <div className="mt-12">
            <h2 className="mb-6 border-b border-gray-800 pb-2 text-2xl font-bold">
              경력 사항
            </h2>

            <div className="space-y-8">
              {CAREER_DATA.map((career) => (
                <div
                  key={career.company}
                  className="bg-backgroundColor/50 rounded-lg p-6"
                >
                  <h3 className="mb-1 text-xl font-bold">{career.company}</h3>
                  <p className="mb-6 font-semibold text-gray-500">
                    {career.period} | {career.role}
                  </p>

                  <div className="space-y-8">
                    {career.projects.map((project) => (
                      <div key={project.title}>
                        <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                          <h4 className="text-lg font-semibold">
                            {project.title}
                          </h4>
                          {project.period && (
                            <span className="text-sm text-gray-500">
                              {project.period}
                            </span>
                          )}
                        </div>
                        <ul className="list-disc space-y-2 pl-5 leading-relaxed">
                          {project.descriptions.map((desc, idx) => (
                            <li key={idx}>{desc}</li>
                          ))}
                        </ul>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.techStack.map((tech) => (
                            <Tag key={tech} tag={tech} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI 활용 경험 */}
          <div className="mt-12">
            <h2 className="mb-6 border-b border-gray-800 pb-2 text-2xl font-bold">
              AI 활용 경험
            </h2>
            <div className="bg-backgroundColor/50 rounded-lg p-6">
              <ul className="list-disc space-y-2 pl-5 leading-relaxed">
                {AI_EXPERIENCES.map((exp, idx) => (
                  <li key={idx}>{exp}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* 스킬 */}
          <div className="mt-12">
            <h2 className="mb-6 border-b border-gray-800 pb-2 text-2xl font-bold">
              기술 스택
            </h2>
            <div className="flex flex-wrap gap-3">
              {SKILLS.map((tech) => (
                <Tag key={tech} tag={tech} />
              ))}
            </div>
          </div>

          {/* 학력 */}
          <div className="mt-12">
            <h2 className="mb-6 border-b border-gray-800 pb-2 text-2xl font-bold">
              학력
            </h2>
            <div className="bg-backgroundColor/50 rounded-lg p-6">
              <h3 className="mb-1 text-xl font-bold">단국대학교</h3>
              <p className="font-semibold text-gray-500">
                2018.03 - 2024.08 | SW융합콘텐츠전공 · 학사 졸업
              </p>
            </div>
          </div>

          {/* 자격증 */}
          <div className="mt-12">
            <h2 className="mb-6 border-b border-gray-800 pb-2 text-2xl font-bold">
              자격증
            </h2>
            <div className="bg-backgroundColor/50 rounded-lg p-6">
              <h3 className="mb-1 text-xl font-bold">SQLD (SQL 개발자)</h3>
              <p className="font-semibold text-gray-500">
                2022.06 | 한국데이터산업진흥원
              </p>
            </div>
          </div>

          {/* 기타 활동 */}
          <div className="mt-12">
            <h2 className="mb-6 border-b border-gray-800 pb-2 text-2xl font-bold">
              기타 활동
            </h2>
            <div className="space-y-6">
              {ACTIVITIES.map((activity) => (
                <div
                  key={activity.title}
                  className="bg-backgroundColor/50 rounded-lg p-6"
                >
                  <h3 className="mb-1 text-xl font-semibold">
                    {activity.title}
                  </h3>
                  <p className="mb-3 font-semibold text-gray-500">
                    {activity.period}
                  </p>
                  <ul className="list-disc space-y-2 pl-5 leading-relaxed">
                    {activity.descriptions.map((desc, idx) => (
                      <li key={idx}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
