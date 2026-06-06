=== 마지막 세션: 2026-04-10 ===

=== 다음 작업 ===

## 1. 기수 목록 모바일 반응성 변경 PR

- 모바일/데스크톱 멤버 뷰 중 viewport에 맞는 하나만 마운트하도록 변경.
- 기수 목록 row animation delay를 최대 300ms로 제한.
- 기수 탭 클릭 시 라우트 전환 대신 local state + TanStack Query cache로 섹션을 전환.
- 서버 fetch에 track 필터를 반영하고, numbered cohort 탭은 현재 기수의 인접 기수만 idle 시점에 prefetch.
- 전체 탭 + track=all은 여전히 전체 멤버를 렌더하므로 limit/pagination API 검토 필요.
- 검증: `corepack pnpm --filter @who-tech/web exec tsc --noEmit`, `corepack pnpm --filter @who-tech/web exec next build`, 브라우저 모바일 DOM/탭 반응 확인.

## 2. 이전 PR 정리

```bash
cd frontend && gh pr merge 2 --merge --admin
```

PR: https://github.com/iftype/who-tech-frontend/pull/2
