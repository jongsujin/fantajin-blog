# Blog Project

## 프로젝트 소개

Next.js과 MDX를 사용한 블로그 프로젝트입니다.

## 기술 스택

- Next.js
- MDX
- Tailwind CSS
- TypeScript
- Vercel

## 프로젝트 구조

```bash
app/
├── about/
├── blog/
└── tags/
src/
├── _app/
├── entities/
├── features/
├── screens/
├── shared/
└── widgets/
```

## 프로젝트 실행

```bash
npm install
npm run dev
```

## Obsidian 글 동기화

Obsidian에서 작성한 글을 블로그 MDX 포스트로 변환할 수 있습니다.

기본 입력 경로는 현재 Mac의 Obsidian Vault 구조에 맞춰져 있습니다.

```bash
~/Documents/Obsidian Vault/Blog/Posts
~/Documents/Obsidian Vault/Blog/_attachments
```

글은 아래 frontmatter에서 `publish: true`인 파일만 동기화됩니다.

```md
---
title: "React Cache 정리"
slug: "react-cache"
date: "2026-04-19"
description: "React cache 동작 방식을 정리합니다."
tags:
  - 개발
  - React
thumbnail: "react-cache.png"
publish: true
---
```

발행 대상 글은 아래 조건을 만족해야 합니다.

- `title`: 비어 있지 않은 문자열
- `date`: 파싱 가능한 날짜
- `description`: 비어 있지 않은 문자열
- `tags`: 하나 이상의 문자열 배열
- `thumbnail`: 선택 사항이지만, 있으면 문자열 경로

조건을 만족하지 않으면 동기화가 실패하고 어떤 파일이 문제인지 터미널에 출력됩니다.

Obsidian 이미지 문법은 블로그 이미지 경로로 변환됩니다.

```md
![[cache-flow.png]]
![[cache-flow.png|캐시 흐름]]
```

동기화 후 이미지는 글의 `slug` 기준 폴더로 복사됩니다.

```txt
public/images/obsidian/react-cache/cache-flow.png
```

이미 동기화된 글이라도 `publish: false`로 바꾸거나 파일을 삭제하면, 다음 동기화 때
해당 Obsidian 산출물 `.mdx`와 이미지 폴더가 함께 정리됩니다.

동기화 명령어는 아래와 같습니다.

```bash
npm run sync:obsidian
npm run build
```

Vault 경로가 다르면 환경 변수로 바꿀 수 있습니다.

```bash
OBSIDIAN_POST_DIR="/path/to/vault/Blog/Posts" \
OBSIDIAN_ATTACHMENT_DIR="/path/to/vault/Blog/_attachments" \
npm run sync:obsidian
```
