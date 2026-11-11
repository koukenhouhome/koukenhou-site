---
name: pr
description: 按 koukenhou-site 的 PR 模板完成自检、AI 审查并创建 PR（含预览地址验收清单）。用法：/pr [Issue 编号]
argument-hint: '[Issue 编号]'
---

关联的 Issue：$ARGUMENTS（没写时从分支名推断，例如 `fix/12-footer-overlap` 对应 #12）

结构以 `.github/pull_request_template.md` 为准，本技能只说明操作步骤。项目规则见 `CLAUDE.md`。不要合并 PR，合并由用户执行。

## 1. 自检

1. 当前必须在功能分支上，不能在 `main` 上。分支名建议为 `<类型>/<Issue 编号>-<简短英文>`。
2. 运行 `npm run verify`，全部通过后再继续；失败就先修复。
3. 有页面变化时，用 `npm run build && npx wrangler dev` 在本地按 Issue 的验收标准检查一遍，测完停掉服务。
4. 运行 `/code-review` 审查本分支的改动。处理发现的问题，记录“发现了什么、怎么处理的”。

## 2. 写 PR

1. **读取 `.github/pull_request_template.md`**，保留全部 `##` 小节和顺序，删除 HTML 注释。
2. **标题**：英文约定式提交 + 全角括号里的中文说明，类型与 Issue 对应（【缺陷】fix、【功能】和【内容】feat、【文档】docs、【维护】chore/build/ci）。
3. **关联 Issue**：`Closes #<编号>`。
4. **改动说明**：改了什么、为什么；方案的选择链接到 Issue，不重复。
5. **验证与证据**：自动检查、AI 审查结果、本地检查结果。前三节必填，不能写“无”。
6. **用户验收**：在“预览地址：”后面写上本分支的预览地址（推算方法见第 4 节），保留模板里的“准备”“逐页检查”“手机宽度”三项，再根据 Issue 的“验收标准”逐条写成“操作 → 预期”。没有页面或行为变化时（例如只改仓库文档）写“无（原因）”。
7. **风险与后续**：没覆盖到的地方、新发现的问题（另开 Issue 并链接）；没有时写“无（原因）”。

## 3. 推送并创建

```powershell
gh api user --jq .login   # must equal $env:CLAUDE_GH_USER, otherwise stop and tell the user
git push -u origin HEAD
gh pr create --base main --title "<标题>" --body-file <草稿文件>
```

草稿文件放在会话的临时目录（scratchpad），用 UTF-8 保存。用户调用 `/pr` 就是同意推送并创建 PR。

## 4. 确认预览地址

Cloudflare 不会在 PR 下发评论，GitHub 检查的摘要里也只有构建 ID，**预览地址只出现在构建日志里**（`Preview URL:` 一行）。

1. 推算：分支名里的 `/` 换成 `-`，再接 `-koukenhou-site.koukenhou-hjf.workers.dev`。例如 `chore/5-wrangler-previews` → `https://chore-5-wrangler-previews-koukenhou-site.koukenhou-hjf.workers.dev`。
2. 等 `Workers Builds: koukenhou-site` 检查成功、且对应最新提交后（`gh pr checks <编号>`，只读一次，不要轮询），用 `curl` 访问 `/`、`/about/`、`/wakarito/` 和一个不存在的路径，应分别返回 200、200、200、404。
3. 访问失败，或者分支名很长、含特殊字符时，以构建日志为准：打开检查里的构建链接（Cloudflare 控制台，需要用户已登录），读 `Preview URL:` 一行，再更新 PR 描述里的地址。

创建后告诉用户：PR 链接、CI 和 Cloudflare 检查的状态、预览地址，以及需要拖进哪些截图。
