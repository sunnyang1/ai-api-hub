# 更新日志

所有重要变更都会记录在此文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
版本号遵循 [Semantic Versioning](https://semver.org/lang/zh-CN/)。

## [Unreleased]

### 文档

- 更新 README.md — 完善项目简介、技术栈表格、架构概览、目录结构说明
- 新增 ARCHITECTURE.md — 详细的架构设计文档（组件树、数据流、路由设计等）
- 更新 CHANGELOG.md — 补充完整功能与技术栈记录
- 更新 CONTRIBUTING.md — 完善贡献流程和代码规范
- 更新 Docs.tsx — 优化应用内开发文档

---

## [1.0.0] - 2026-05-05

### 新增

#### 页面模块（9 个）

- 🏠 **首页** (`/`) — 现代化落地页，Hero 区域 + 统计数据动画 + 特性网格 + 操作流程 + CTA
- 🤖 **模型广场** (`/models`) — 14 个 AI 模型的搜索/筛选/排序/视图切换
- ⚖️ **模型对比** (`/compare`) — 最多 4 个模型的多维度并排对比 + 性价比评分系统
- 📊 **排行榜** (`/rankings`) — 前三名领奖台 + 四种排名维度的完整榜单
- 📈 **仪表盘** (`/dashboard`) — 统计卡片 + 4 个自定义 SVG 图表 + 数据表格
- 💬 **在线体验** (`/chat`) — 完整对话界面，模型选择 + 预设对话演示
- 💰 **价格方案** (`/pricing`) — 免费/专业($29)/企业($199) 三档定价 + FAQ
- 📖 **开发文档** (`/docs`) — 6 节开发者文档（快速开始、模型、认证、对话 API、流式输出、错误处理）
- 🔑 **密钥管理** (`/keys`) — API Key CRUD（创建/复制/隐藏/撤销）+ 安全提示

#### 共享组件（7 个）

- `Layout` — 页面布局骨架（Header + Outlet + Footer）
- `Header` — 固定顶栏导航（9 链接 + 滚动毛玻璃 + 移动端菜单 + 主题切换）
- `Footer` — 四栏页脚导航
- `ThemeContext` — 深色/浅色主题 Provider（localStorage + 系统偏好）
- `ToastContext` — 全局通知系统（4 类型 + 自动消失）
- `CountUp` — 数字滚动动画（IntersectionObserver + easeOutCubic）
- `ScrollReveal` — 滚动入场动画（5 方向 + scale）

#### 数据与类型

- 8 个 AI 提供商 + 14 个模型完整数据（`src/data/models.ts`）
- 3 档定价方案数据（`src/data/pricing.ts`）
- 模拟用量数据 — 日趋势/模型分布/小时分布/周汇总（`src/data/usage.ts`）
- 6 个 TypeScript 接口定义（`src/types/index.ts`）

#### 设计系统

- 🌙 深色/浅色主题切换（CSS Variables + Tailwind dark: 前缀）
- 📱 移动端响应式适配（含安全区 padding）
- ✨ 滚动触发动画效果（IntersectionObserver）
- 📊 自定义 SVG 图表（柱状图/折线图/环形图，无第三方图表库）

### 技术栈

| 类别 | 技术 | 版本 |
|------|------|------|
| 框架 | React | 19.2.5 |
| 语言 | TypeScript | ~6.0 |
| 构建 | Vite | 8.0.10 |
| 样式 | Tailwind CSS | 3.4.19 |
| 路由 | React Router DOM | 7.14.2 |
| 图标 | Lucide React | 1.14.0 |
| 代码检查 | ESLint | 10.2.1 |
| CSS 处理 | PostCSS + Autoprefixer | 8.5 / 10.5 |
| 字体 | Inter (Google Fonts) | — |
