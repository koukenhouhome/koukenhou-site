<!--
PR 标题：英文约定式提交 + 全角括号里的中文说明，例如
feat(about): add self introduction（新增自我介绍）
前三节必填，不能写“无”；后两节没有内容时写“无（原因）”。
-->

## 关联 Issue

Closes #

## 改动说明

<!-- 改了什么、为什么这样做。 -->

## 验证与证据

- **自动检查**：见本页 CI 结果（`check / verify`：astro check + 构建）和 Cloudflare 的构建检查。
- **AI 审查**：<!-- /code-review 的发现和处理结果 -->
- **前后对比**：<!-- 截图，或说明在预览地址上看哪里 -->

## 用户验收

<!-- 在 Cloudflare 预览地址上验收，全部勾选后再合并。没有页面或行为变化时写“无（原因）”。 -->

预览地址：<!-- 分支名里的 / 换成 -，再接 -koukenhou-site.koukenhou-hjf.workers.dev；以 Cloudflare 构建日志里 "Preview URL:" 一行为准 -->

- [ ] 准备：本 PR 里 Cloudflare 的构建检查（`Workers Builds: koukenhou-site`）已成功，且对应最新提交；打开上面的预览地址
- [ ] 逐页检查：`/`、`/about/`、`/wakarito/` 正常显示；随便输入一个不存在的路径，显示“页面不存在”
- [ ] 手机宽度：用手机打开，或在浏览器开发者工具里切到约 375px 宽，没有横向滚动条、文字没有被截断
- [ ] 操作 1：…… → 预期：……

## 风险与后续

<!-- 没覆盖到的地方、发现的新问题（另开 Issue 并链接）。 -->
