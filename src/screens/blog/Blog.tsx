import Link from 'next/link'
import { ChevronLeft, ChevronRight, Search, X } from 'lucide-react'
import { BlogPageProps } from '@/src/entities/post/model/types'
import CategoryBox from '@/src/entities/category/ui/CategoryBox'
import { PostCard } from '@/src/widget/post-card/ui/PostCard'

export default function BlogPage({
  posts,
  query = '',
  page = '1',
  basePath = '/',
}: BlogPageProps) {
  const search = query.trim()
  const terms = search
    .normalize('NFC')
    .toLocaleLowerCase()
    .split(/\s+/)
    .filter(Boolean)
  const filteredPosts = posts.filter((post) => {
    const text = [post.title, post.description, ...post.tags]
      .join(' ')
      .normalize('NFC')
      .toLocaleLowerCase()
    return terms.every((term) => text.includes(term))
  })
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / 9))
  const requestedPage = Number(page)
  const currentPage = Number.isSafeInteger(requestedPage)
    ? Math.max(1, Math.min(requestedPage, totalPages))
    : 1
  const previewPosts = filteredPosts.slice(
    (currentPage - 1) * 9,
    currentPage * 9,
  )
  const pageHref = (number: number) => {
    const params = new URLSearchParams()
    if (search) params.set('q', search)
    if (number > 1) params.set('page', String(number))
    const suffix = params.toString()
    return `${basePath}${suffix ? `?${suffix}` : ''}#posts`
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-8">
      <CategoryBox />
      <section
        id="posts"
        aria-labelledby="posts-heading"
        className="my-10 scroll-mt-24 py-8"
      >
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 id="posts-heading" className="text-2xl font-bold">
              {search ? '검색 결과' : '전체 글'}
            </h1>
            <p className="mt-2 text-sm opacity-70">
              {search
                ? `“${search}” 검색 결과 ${filteredPosts.length}개`
                : `총 ${posts.length}개의 글`}
            </p>
          </div>
          <form
            action={`${basePath}#posts`}
            role="search"
            className="flex w-full items-center gap-2 sm:w-80"
          >
            <div className="flex min-w-0 flex-1 items-center rounded-full border border-gray-200 bg-gray-50 py-1 pr-1 pl-4 transition-colors focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-500/10 dark:border-gray-700 dark:bg-white/5 dark:focus-within:border-blue-400">
              <label htmlFor="post-search" className="sr-only">
                글 검색
              </label>
              <input
                key={query}
                id="post-search"
                name="q"
                type="search"
                defaultValue={query}
                placeholder="제목, 설명, 태그 검색"
                className="min-w-0 flex-1 appearance-none bg-transparent py-2 text-sm outline-none placeholder:text-gray-400 [&::-webkit-search-cancel-button]:appearance-none"
              />
              <button
                type="submit"
                aria-label="글 검색"
                className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-200/70 hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-blue-500 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <Search size={18} aria-hidden="true" />
              </button>
            </div>
            {search && (
              <Link
                href={`${basePath}#posts`}
                aria-label="검색 초기화"
                title="검색 초기화"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <X size={18} aria-hidden="true" />
              </Link>
            )}
          </form>
        </div>
        {previewPosts.length === 0 && (
          <div className="rounded-lg border border-gray-400/40 px-4 py-12 text-center">
            <p>검색 결과가 없습니다. 다른 검색어로 찾아보세요.</p>
            <Link
              href={`${basePath}#posts`}
              className="mt-4 inline-block underline underline-offset-4"
            >
              전체 글 보기
            </Link>
          </div>
        )}
        <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {previewPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        {totalPages > 1 && (
          <nav
            aria-label="글 목록 페이지"
            className="mt-10 flex flex-wrap items-center justify-center gap-1"
          >
            {currentPage > 1 ? (
              <Link
                href={pageHref(currentPage - 1)}
                className="pagination-button"
                aria-label="이전 페이지"
              >
                <ChevronLeft size={18} aria-hidden="true" />
              </Link>
            ) : (
              <span
                className="pagination-button"
                aria-disabled="true"
                aria-label="이전 페이지"
              >
                <ChevronLeft size={18} aria-hidden="true" />
              </span>
            )}
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (number) => (
                <Link
                  key={number}
                  href={pageHref(number)}
                  aria-label={`${number} 페이지`}
                  aria-current={currentPage === number ? 'page' : undefined}
                  className={`pagination-number ${currentPage === number ? 'pagination-active' : ''}`}
                >
                  {number}
                </Link>
              ),
            )}
            {currentPage < totalPages ? (
              <Link
                href={pageHref(currentPage + 1)}
                className="pagination-button"
                aria-label="다음 페이지"
              >
                <ChevronRight size={18} aria-hidden="true" />
              </Link>
            ) : (
              <span
                className="pagination-button"
                aria-disabled="true"
                aria-label="다음 페이지"
              >
                <ChevronRight size={18} aria-hidden="true" />
              </span>
            )}
          </nav>
        )}

        <div className="mt-8 flex justify-center">
          <Link
            href="/tags"
            className="tag-border hover:bg-hoverColor rounded-lg px-6 py-2 font-semibold shadow transition-colors duration-200 focus:ring-2 focus:outline-none"
          >
            태그별 글 더보기
          </Link>
        </div>
      </section>
    </div>
  )
}
