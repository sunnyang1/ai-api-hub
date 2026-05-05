<div align="center">

# 🚀 AI API Hub

**一站式 AI 模型管理平台**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19.2.5-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)

[在线预览](https://sunnyang1.github.io/ai-api-hub) · [问题反馈](https://github.com/sunnyang1/ai-api-hub/issues) · [贡献代码](https://github.com/sunnyang1/ai-api-hub/pulls)

</div>

---

## ✨ 功能特性

| 模块 | 描述 |
|------|------|
| 🏠 **首页** | 现代化落地页，展示平台核心数据与功能亮点 |
| 🤖 **模型广场** | 浏览、筛选、搜索主流 AI 大模型（OpenAI、Claude、Gemini、Llama 等） |
| ⚖️ **模型对比** | 多维度并排对比不同模型的能力、价格、上下文长度 |
| 📊 **排行榜** | 实时更新的模型性能排名与评测数据 |
| 📈 **仪表盘** | 个人 API 使用统计、消耗分析、趋势图表 |
| 💬 **在线体验** | 内置 Chat 界面，直接体验不同模型的对话效果 |
| 💰 **价格方案** | 清晰透明的定价策略与套餐对比 |
| 📖 **开发文档** | 完整的 API 接入指南与 SDK 说明 |
| 🔑 **密钥管理** | 安全便捷的 API Key 生成与管理 |

### 🎨 设计亮点

- **响应式布局** - 完美适配桌面端、平板与移动设备
- **深色/浅色主题** - 支持一键切换，自动跟随系统偏好
- **流畅动画** - 基于滚动触发的优雅入场动画
- **组件化架构** - 高度复用的 UI 组件，易于扩展维护

---

## 🛠 技术栈

- **框架**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **构建工具**: [Vite 8](https://vitejs.dev/)
- **样式方案**: [Tailwind CSS v3](https://tailwindcss.com/)
- **路由**: [React Router DOM v7](https://reactrouter.com/)
- **图标库**: [Lucide React](https://lucide.dev/)
- **字体**: Inter (Google Fonts)

---

## 📦 快速开始

### 环境要求

- Node.js >= 18.0
- npm >= 9.0 或 pnpm >= 8.0

### 安装依赖

```bash
# 克隆项目
git clone https://github.com/sunnyang1/ai-api-hub.git
cd ai-api-hub

# 安装依赖
npm install
```

### 开发模式

```bash
npm run dev
```

服务启动后访问 http://localhost:5173

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist/` 目录。

### 预览生产构建

```bash
npm run preview
```

### 代码检查

```bash
npm run lint
```

---

## 📂 项目结构

```
ai-api-hub/
├── public/                 # 静态资源
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/             # 图片、字体等资源
│   ├── components/         # 公共组件
│   │   ├── CountUp.tsx     # 数字滚动动画
│   │   ├── Footer.tsx      # 页脚
│   │   ├── Header.tsx      # 导航栏
│   │   ├── Layout.tsx      # 页面布局骨架
│   │   ├── ScrollReveal.tsx# 滚动显示动画
│   │   ├── ThemeContext.tsx# 主题上下文
│   │   └── ToastContext.tsx# 全局提示
│   ├── data/               # 静态数据
│   │   ├── models.ts       # AI 模型数据
│   │   ├── pricing.ts      # 定价数据
│   │   └── usage.ts        # 使用统计数据
│   ├── pages/              # 页面组件
│   │   ├── Home.tsx        # 首页
│   │   ├── Models.tsx      # 模型广场
│   │   ├── Compare.tsx     # 模型对比
│   │   ├── Rankings.tsx    # 排行榜
│   │   ├── Dashboard.tsx   # 仪表盘
│   │   ├── Chat.tsx        # 在线体验
│   │   ├── Pricing.tsx     # 价格方案
│   │   ├── Docs.tsx        # 开发文档
│   │   └── Keys.tsx        # 密钥管理
│   ├── types/              # TypeScript 类型定义
│   ├── App.tsx             # 根组件与路由配置
│   ├── main.tsx            # 应用入口
│   └── index.css           # 全局样式与 Tailwind 导入
├── index.html              # HTML 入口
├── vite.config.ts          # Vite 配置
├── tailwind.config.cjs     # Tailwind 配置
├── tsconfig.json           # TypeScript 配置
├── eslint.config.js        # ESLint 配置
└── package.json            # 项目依赖
```

---

## 🚀 部署

### GitHub Pages

本项目已配置为可直接部署到 GitHub Pages：

```bash
npm run build
# 将 dist/ 目录内容推送到 gh-pages 分支
```

### 其他平台

由于 `vite.config.ts` 中已配置 `base: './'`，构建产物支持任意子目录部署。

---

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

请确保代码通过 ESLint 检查，并遵循现有的代码风格。

---

## 📜 开源协议

本项目基于 [MIT License](LICENSE) 开源。

---

<div align="center">

Made with ❤️ by [sunnyang1](https://github.com/sunnyang1)

</div>
