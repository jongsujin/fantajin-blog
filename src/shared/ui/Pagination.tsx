'use client'

import { useState } from 'react'
import { PaginationProps } from '@/src/entities/post/model/types'
import { PostCard } from '@/src/widget/post-card/ui/PostCard'

export default function Pagination({
  posts,
  tag,
  itemsPerPage = 6,
}: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(1)

  // 해당 태그의 게시글만 필터링
  const filteredPosts = posts.filter((post) => post.tags.includes(tag))

  // 페이지네이션을 위한 게시글 분할
  const indexOfLastPost = currentPage * itemsPerPage
  const indexOfFirstPost = indexOfLastPost - itemsPerPage
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)

  // 총 페이지 수 계산
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage)

  // 페이지 변경 함수
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <>
      <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {currentPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {/* 페이지네이션 UI */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
              disabled={currentPage === 1}
              className="pagination-button disabled:opacity-50"
              aria-label="이전 페이지"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`pagination-number ${
                    currentPage === number ? 'pagination-active' : ''
                  }`}
                >
                  {number}
                </button>
              ),
            )}

            <button
              onClick={() =>
                paginate(
                  currentPage < totalPages ? currentPage + 1 : totalPages,
                )
              }
              disabled={currentPage === totalPages}
              className="pagination-button disabled:opacity-50"
              aria-label="다음 페이지"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
