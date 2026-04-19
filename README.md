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

Obsidian 이미지 문법은 블로그 이미지 경로로 변환됩니다.

```md
![[cache-flow.png]]
![[cache-flow.png|캐시 흐름]]
```

동기화 후 이미지는 글의 `slug` 기준 폴더로 복사됩니다.

```txt
public/images/obsidian/react-cache/cache-flow.png
```

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
