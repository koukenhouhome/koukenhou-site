# koukenhou-site：给 Claude Code 的项目说明

个人开发者网站 <https://koukenhou.com>：自我介绍和作品展示，以后自己开发的作品都在这里介绍。第一个作品是 Wakarito（仓库 `F:\KOU\Wakarito`），产品页固定在 `/wakarito/`。

@AGENTS.md

## 架构

- Astro 静态网站，`npm run build` 输出 `dist/`；不使用服务端渲染（SSR）、适配器或数据库，需要的话先和用户讨论。
- 托管在 Cloudflare Workers 的静态资源（Static Assets），配置在 `wrangler.jsonc`（只托管 `dist/`，没有 Worker 脚本）。不使用旧版 Pages。
- 部署由 Cloudflare 的 Git 集成（Workers Builds）完成：`main` → 生产环境，其他分支和 PR → 预览地址。构建命令 `npm run build`、部署命令 `npx wrangler deploy` 在 Cloudflare 控制台里设置。本仓库不保存任何 Cloudflare 令牌。
- `.github/workflows/check.yml` 只做检查（`npm run verify`），不负责部署。
- 作品内容放在 `src/content/works/*.md`，字段由 `src/content.config.ts` 校验；页面在 `src/pages/`，共用布局在 `src/layouts/BaseLayout.astro`。
- 界面语言为简体中文（`lang="zh-CN"`）。多语言以后再考虑。

## 常用命令

```bash
npm run dev       # 本地预览（Claude 用 `npx astro dev --background` 在后台启动）
npm run verify    # 完成任何改动前都要通过：astro check + 构建
npm run build && npx wrangler dev   # 用和线上相同的 Workers 运行时预览 dist/
```

## 规则

1. 仓库是公开的：不提交密钥、`.env`，以及用户没有明确同意公开的个人信息。关于页的内容由用户提供，标着 `TODO(owner)` 的地方不要自己编造经历。
2. DNS 和 Cloudflare 控制台的操作由用户在浏览器里完成；不要删除或修改 koukenhou.com 的 MX、TXT 记录（邮件路由在用）。
3. 所有改动走 Issue → 分支 → PR → 用户在预览地址验收 → 用户合并。不要自行合并 PR。建 Issue 用 `/issue`，开 PR 用 `/pr`（`.claude/skills/`）；结构以 `.github/ISSUE_TEMPLATE/` 和 `.github/pull_request_template.md` 为准，技能只写操作步骤。
4. 执行 gh 写操作或 `git push` 之前，先运行 `gh api user --jq .login`，结果必须等于 `$env:CLAUDE_GH_USER`，否则停止并告诉用户。
5. 和用户交流、Issue、PR 用中文；代码、注释、提交信息、文件名用英文。PR 标题用英文约定式提交（Conventional Commits）加全角括号里的中文说明。

## 已知的坑

- Astro 7：`z` 从 `astro/zod` 导入（`astro:content` 里的 `z` 已弃用）；内容集合定义在 `src/content.config.ts`，使用 `glob` 加载器。
- `wrangler` 在 `package.json` 里固定了版本，Workers Builds 会使用这个版本；升级时改版本号并走 PR。
- `wrangler.jsonc` 的 `compatibility_date` 不要随意改动，需要新的运行时行为时再更新。
- Claude 桌面应用启动的进程，PATH 可能缺少 fnm 的 Node；运行 npm 前先确认 `node --version` 可用。
