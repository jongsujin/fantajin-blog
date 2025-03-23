'use client';

import { Post } from '@/src/entities/post/model/types';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import { MDXRemote } from 'next-mdx-remote';
import { Card, CardContent } from '@/src/shared/ui/Card';

// 커스텀 MDX 컴포넌트 (선택사항)
const components = {
  // 커스텀 컴포넌트 정의
};

interface PostDetailProps {
  post: Post;
}

export function PostDetail({ post }: PostDetailProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardContent className="prose prose-invert max-w-none">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold text-gray-100">{post.title}</h1>
            <p className="text-sm text-gray-500">
              {format(parseISO(post.date), 'yyyy년 MM월 dd일', { locale: ko })}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-backgroundColor/80 rounded-full px-3 py-1 text-xs text-gray-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div>
            {/* MDXRemote 컴포넌트로 직렬화된 콘텐츠 렌더링 */}
            {post.content && (
              <MDXRemote {...post.content} components={components} />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}