# koukenhou-site

个人开发者 Koukenhou 的自我介绍和作品网站，地址为 <https://koukenhou.com>。

- 框架：[Astro](https://astro.build)，输出纯静态文件（`dist/`）
- 托管：Cloudflare Pages。推送到 `main` 后由 Cloudflare 的 Git 集成自动构建和发布；每个 PR 会生成预览地址
- 检查：GitHub Actions 的 `check` 工作流运行 `npm run verify`（`astro check` 和构建），只检查，不部署

## 常用命令

```bash
npm ci              # 安装依赖
npm run dev         # 本地开发服务器 http://localhost:4321
npm run verify      # 类型检查 + 构建，提 PR 前必须通过
npm run preview     # 预览构建结果
```

## 新增作品

在 `src/content/works/` 下新增 `<id>.md`，头部字段由 `src/content.config.ts` 校验，然后新建 `src/pages/<id>/index.astro`（可以参考 `wakarito`）。
