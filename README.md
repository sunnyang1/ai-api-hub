<div align="center">

# 🚀 AI API Hub

**一站式 AI 模型管理平台**

One API to access all AI models — 以统一接口访问全球顶级大模型

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19.2.5-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-7.14-CA4245?logo=reactrouter)](https://reactrouter.com/)

[在线预览](https://sunnyang1.github.io/ai-api-hub) · [问题反馈](https://github.com/sunnyang1/ai-api-hub/issues) · [贡献代码](https://github.com/sunnyang1/ai-api-hub/pulls)

</div>

---

## 📖 项目简介

AI API Hub 是一个纯前端单页应用（SPA），定位为 AI 模型统一管理平台，让开发者能够通过一个平台浏览、对比和管理来自全球顶级厂商的 AI 大语言模型。

项目目前为**纯前端概念原型**，使用 **React 19 + TypeScript + Vite 8 + Tailwind CSS v3** 构建，所有数据均为静态 Mock 数据，适合作为 SaaS 管理面板模板或学习参考。

### 核心能力

- **模型发现** — 浏览 8 家提供商、14 个模型的完整目录
- **模型对比** — 多维度并排对比（价格、性能、上下文窗口、特性）
- **排行榜** — 多维度评测排名（人气、价格、性能、上下文）
- **用量分析** — 仪表盘包含自定义 SVG 图表和统计概览
- **在线体验** — 内置 Chat 界面，模拟对话效果
- **定价展示** — 三级定价方案（免费/专业/企业）
- **API 文档** — 开发者接入指南与代码示例
- **密钥管理** — API Key CRUD 操作界面

---

## ✨ 功能特性

| 模块 | 路由 | 描述 |
|------|------|------|
| 🏠 **首页** | `/` | 现代化落地页，展示核心统计数据、功能亮点、操作流程和 CTA |
| 🤖 **模型广场** | `/models` | 搜索、筛选、排序浏览 14 个 AI 模型，支持网格/列表视图切换 |
| ⚖️ **模型对比** | `/compare` | 选择最多 4 个模型进行多维度并排对比，含性价比评分系统 |
| 📊 **排行榜** | `/rankings` | 前 3 名领奖台 + 完整榜单，支持 4 种排名维度 |
| 📈 **仪表盘** | `/dashboard` | API 用量分析：统计卡片 + 自定义 SVG 图表 + 数据表格 |
| 💬 **在线体验** | `/chat` | 完整的对话界面，支持模型选择和预设对话演示 |
| 💰 **价格方案** | `/pricing` | 免费/专业($29)/企业($199) 三档定价，含 FAQ |
| 📖 **开发文档** | `/docs` | 6 节文档（快速开始、模型列表、认证、对话 API、流式输出、错误处理） |
| 🔑 **密钥管理** | `/keys` | 创建/复制/隐藏/撤销 API Key，含用量概览和安全建议 |

### 🎨 设计亮点

- **响应式布局** — 适配桌面、平板和移动设备，含安全区适配
- **深色/浅色主题** — 一键切换，自动跟随系统偏好，持久化到 localStorage
- **滚动动画** — IntersectionObserver 驱动的入场动画，支持 5 种方向
- **数字滚动** — CountUp 组件实现缓动数字动画
- **自定义图表** — 纯 SVG 手写柱状图、折线图、环形图（无第三方图表库）
- **组件化架构** — 7 个高度复用的共享组件，模块化页面设计

---

## 🛠 技术栈

| 层级 | 技术 | 版本 | 用途 |
|------|------|------|------|
| **框架** | React | 19.2.5 | 声明式 UI，函数组件 + Hooks |
| **语言** | TypeScript | 6.0 | 类型安全，严格模式（noUnusedLocals/Parameters） |
| **构建工具** | Vite | 8.0.10 | 开发服务器 + 生产构建，HMR |
| **React 插件** | @vitejs/plugin-react | 6.0.1 | Vite React 支持 |
| **样式方案** | Tailwind CSS | 3.4.19 | 原子化 CSS 工具类 |
| **CSS 处理** | PostCSS + Autoprefixer | 8.5.14 / 10.5.0 | CSS 后处理 + 浏览器前缀 |
| **路由** | React Router DOM | 7.14.2 | 客户端路由，嵌套路由 |
| **图标库** | Lucide React | 1.14.0 | 轻量 SVG 图标 |
| **代码质量** | ESLint | 10.2.1 | 静态代码检查（flat config） |
| **字体** | Inter | — | Google Fonts 加载 |

### 技术决策说明

- **无状态管理库** — 项目规模适中，使用 React 内置 `useState`/`useContext` 足以管理所有状态
- **无 UI 组件库** — 所有组件基于 Tailwind CSS 自定义构建，确保完全的设计控制
- **无图表库** — Dashboard 图表使用纯 SVG 手写，减少依赖体积
- **无后端** — 当前为纯前端原型，所有数据静态存储在 `src/data/` 目录中
- **相对路径构建** — `vite.config.ts` 中 `base: './'`，支持任意子目录部署（如 GitHub Pages）

---

## 📦 快速开始

### 环境要求

- Node.js >= 18.0
- npm >= 9.0（或 pnpm >= 8.0）

### 安装与运行

```bash
# 克隆项目
git clone https://github.com/sunnyang1/ai-api-hub.git
cd ai-api-hub

# 安装依赖
npm install

# 启动开发服务器 (http://localhost:5173)
npm run dev

# 构建生产版本 (输出到 dist/)
npm run build

# 预览生产构建
npm run preview

# 代码检查
npm run lint
```

---

## 📂 项目结构

```
ai-api-hub/
├── public/                    # 静态资源（直接拷贝到 dist/）
│   ├── favicon.svg            #   网站图标
│   └── icons.svg              #   SVG 图标精灵图
├── src/                       # 源代码
│   ├── assets/                # 构建时处理的资源
│   │   └── hero.png           #   首页 Hero 图片
│   ├── components/            # 共享/可复用组件
│   │   ├── Layout.tsx         #   页面布局骨架（Header + Outlet + Footer）
│   │   ├── Header.tsx         #   固定导航栏（9 链接 + 移动端菜单 + 主题切换）
│   │   ├── Footer.tsx         #   四栏页脚（产品/开发/公司/法律）
│   │   ├── ThemeContext.tsx   #   深色/浅色主题 Context Provider
│   │   ├── ToastContext.tsx   #   全局 Toast 通知 Context Provider
│   │   ├── CountUp.tsx        #   数字滚动动画（IntersectionObserver + 缓动）
│   │   └── ScrollReveal.tsx   #   滚动触发显示动画（5 方向 + scale）
│   ├── data/                  # 静态种子数据
│   │   ├── models.ts          #   8 提供商 + 14 模型完整数据
│   │   ├── pricing.ts         #   3 档定价方案数据
│   │   └── usage.ts           #   模拟用量数据（日/模型/小时/周汇总）
│   ├── pages/                 # 路由级页面组件
│   │   ├── Home.tsx           #   首页（Hero + 统计 + 特性 + 流程 + CTA）
│   │   ├── Models.tsx         #   模型广场（搜索 + 筛选 + 视图切换）
│   │   ├── Compare.tsx        #   模型对比（多选 + 多维度评分）
│   │   ├── Rankings.tsx       #   排行榜（领奖台 + 排名切换）
│   │   ├── Dashboard.tsx      #   仪表盘（卡片 + 图表 + 数据表）
│   │   ├── Chat.tsx           #   在线体验（对话界面 + 模型选择）
│   │   ├── Pricing.tsx        #   价格方案（定价卡片 + FAQ）
│   │   ├── Docs.tsx           #   开发文档（侧栏导航 + 内容渲染）
│   │   └── Keys.tsx           #   密钥管理（CRUD + 安全提示）
│   ├── types/                 # TypeScript 类型定义
│   │   └── index.ts           #   所有共享接口（AIModel, Provider, ChatMessage 等）
│   ├── App.tsx                # 根组件 + React Router 路由配置
│   ├── main.tsx               # 应用入口（StrictMode + 全局 Provider 包装）
│   └── index.css              # 全局样式 + Tailwind 导入 + CSS 变量
├── index.html                 # HTML 入口文件
├── vite.config.ts             # Vite 构建配置（base: './', cssMinify: false）
├── tailwind.config.cjs        # Tailwind 配置（自定义颜色/动画/字体）
├── postcss.config.cjs         # PostCSS 配置（tailwindcss + autoprefixer）
├── tsconfig.json              # TypeScript 根配置
├── tsconfig.app.json          #   应用源码 TS 配置（target: ES2023）
├── tsconfig.node.json         #   构建工具 TS 配置
├── eslint.config.js           # ESLint 扁平配置
├── package.json               # 项目依赖与脚本
├── README.md                  # 项目文档（本文件）
├── ARCHITECTURE.md            # 架构设计文档
├── CHANGELOG.md               # 版本更新日志
├── CONTRIBUTING.md            # 贡献指南
└── LICENSE                    # MIT 开源协议
```

---

## 🏗 架构概览

```
main.tsx
  └─ StrictMode
     └─ ThemeProvider (Context)      ← 主题状态管理
        └─ ToastProvider (Context)   ← 全局通知状态
           └─ BrowserRouter
              └─ Routes
                 └─ Layout           ← 页面骨架
                    ├─ Header        ← 导航栏（固定顶部）
                    ├─ Outlet        ← 路由内容区
                    │  ├─ Home
                    │  ├─ Models
                    │  ├─ Compare
                    │  ├─ Rankings
                    │  ├─ Dashboard
                    │  ├─ Chat
                    │  ├─ Pricing
                    │  ├─ Docs
                    │  └─ Keys
                    └─ Footer        ← 页脚

数据流：
  src/data/  → 页面组件直接 import → useState 管理状态 → JSX 渲染
  ThemeContext  → 全局主题切换 → CSS 变量 + Tailwind dark class
  ToastContext  → 全局通知 → 4 类型（success/error/info/warning）
```

详细架构设计请参阅 [ARCHITECTURE.md](./ARCHITECTURE.md)。

---

## 🚀 部署

### GitHub Pages

本项目已配置为可直接部署到 GitHub Pages：

```bash
npm run build
# 将 dist/ 目录内容推送到 gh-pages 分支
```

### 其他平台

- `vite.config.ts` 中 `base: './'` 已配置，构建产物支持任意子目录部署
- 构建后只需部署 `dist/` 目录中的静态文件即可
- 适用于 Netlify, Vercel, Cloudflare Pages 等平台

---

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

详细贡献流程请参阅 [CONTRIBUTING.md](./CONTRIBUTING.md)。

快速步骤：
1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改（遵循 [约定式提交](https://www.conventionalcommits.org/)）
4. 确保 `npm run build` 和 `npm run lint` 通过
5. 推送分支并打开 Pull Request

---

## 📜 开源协议

本项目基于 [MIT License](LICENSE) 开源。

---

<div align="center">

Made with ❤️ by [sunnyang1](https://github.com/sunnyang1)

</div>
