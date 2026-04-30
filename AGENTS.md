# Development notes

1. Always use git worktree (in .worktrees) for development.
2. Always document the plan (in .spec/PLANS) before working. Have a detailed TODO for each plan. Include human test suggestions.
3. When possible, always write tests before feature.
4. Never push unless explicitly told so.
5. For end-to-end testing, always execute the existing script at `./tests/playwright-test.cjs` (e.g. via `npm run test:e2e`) instead of generating new test scripts.
