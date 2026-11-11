---
name: issue
description: 按 koukenhou-site 的 Issue 表单创建或更新 Issue（缺陷、功能、内容、文档、维护）。用法：/issue <要记录的问题或需求>，或 /issue <编号> 更新已有 Issue
argument-hint: <问题或需求 | Issue 编号>
---

要记录或更新的内容：$ARGUMENTS

结构以 `.github/ISSUE_TEMPLATE/` 下的表单为准，本技能只说明操作步骤。项目规则见 `CLAUDE.md`。

## 创建

1. **判断类型和范围**：
   - 类型：缺陷，或功能、内容、文档、维护中的一种；
   - 范围：页面或部分，例如“首页”“关于页”“Wakarito 页”“全站”“部署”。
2. **读取对应的表单**：缺陷读 `1-bug.yml`，其他读 `2-task.yml`。不要凭记忆写结构。
3. **按表单生成正文**：每个字段写成 `### <label>`，顺序与表单一致，和网页提交后的样子相同。
   - 下拉框字段写选中的那一项的完整文字；
   - 有默认值（`value`）的字段，暂时没有新内容就保留默认值；
   - 选填字段没有内容时写“无（原因）”，不要硬凑内容。
4. **缺陷要先复现**：在生产地址或预览地址上实际打开一次，写清完整网址和步骤；需要截图时保存到 `$env:CLAUDE_LAB_DIR\evidence\koukenhou-site\<编号或 draft-简短名>\`，告诉用户要拖进哪些文件（GitHub 没有上传图片的接口）。
5. **标题**：`【类型】范围：详细描述`，写到半年后只看标题也能想起是什么事。
6. **语言**：中文正文，技术术语按全局规则标注；区分“已验证（附依据）”“推测”“建议”。仓库是公开的，不写密钥和用户没有同意公开的个人信息。
7. **核对账号后创建**：
   ```powershell
   gh api user --jq .login   # must equal $env:CLAUDE_GH_USER, otherwise stop and tell the user
   gh issue create --title "<标题>" --body-file <草稿文件> --label "type:<type>"
   ```
   标签：缺陷 `type:bug`，功能和内容 `type:feature`，文档 `type:docs`，维护 `type:chore`。
   草稿文件放在会话的临时目录（scratchpad），用 UTF-8 保存。

用户调用 `/issue` 就是同意创建。如果是你在工作中自己发现的新问题，先问用户是否要建 Issue。

## 更新

1. 读取当前正文：`gh issue view <编号> --json body --jq .body`。
2. 只修改对应字段，保留其他内容，再用 `gh issue edit <编号> --body-file <文件>` 写回。
3. 另发一条简短评论说明改了什么，例如“已补充调查结论”，让时间线上留下记录。
