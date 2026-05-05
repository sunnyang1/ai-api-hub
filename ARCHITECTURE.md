# 🏗 AI API Hub — 架构设计文档

## 目录

1. [项目概述](#1-项目概述)
2. [技术架构](#2-技术架构)
3. [应用启动流程](#3-应用启动流程)
4. [组件树](#4-组件树)
5. [路由设计](#5-路由设计)
6. [数据架构](#6-数据架构)
7. [状态管理](#7-状态管理)
8. [主题系统](#8-主题系统)
9. [动画系统](#9-动画系统)
10. [样式架构](#10-样式架构)
11. [构建配置](#11-构建配置)
12. [目录结构约定](#12-目录结构约定)

---

## 1. 项目概述

AI API Hub 是一个**纯客户端单页应用（SPA）**，定位为 AI 模型统一管理平台。当前版本为前端概念原型，所有数据均为静态 Mock 数据，无后端 API 集成。

### 架构特点

- **零后端依赖** — 无需服务器，纯静态文件部署
- **组件驱动** — 基于 React 函数组件 + Hooks 的声明式架构
- **类型安全** — TypeScript 全覆盖，严格类型检查
- **Context 服务** — 主题和 Toast 通过 React Context 提供
- **约定优于配置** — 清晰的目录结构和文件命名约定

### 核心数据

| 数据类型 | 来源 | 文件 |
|---------|------|------|
| AI 模型目录 | 静态数据 | `src/data/models.ts` |
| 定价方案 | 静态数据 | `src/data/pricing.ts` |
| 使用统计 | Mock 数据 | `src/data/usage.ts` |

---

## 2. 技术架构

```
┌─────────────────────────────────────────────────────────────┐
│                      浏览器 (Browser)                        │
├─────────────────────────────────────────────────────────────┤
│  index.html                                                  │
│  ├── <div id="root">                                         │
│  └── <script type="module" src="/src/main.tsx">              │
├─────────────────────────────────────────────────────────────┤
│  React 应用层                                                │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │ ThemeContext │  │ToastContext │  │  React Router DOM   │ │
│  │  (Provider)  │  │ (Provider)  │  │  (BrowserRouter)    │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                    页面组件 (Pages)                      ││
│  │  Home | Models | Compare | Rankings | Dashboard          ││
│  │  Chat  | Pricing | Docs    | Keys                       ││
│  └─────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────┐│
│  │                   共享组件 (Components)                   ││
│  │  Layout | Header | Footer | CountUp                      ││
│  │  ScrollReveal | ThemeContext | ToastContext              ││
│  └─────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────┐│
│  │                    数据层 (Data)                         ││
│  │  models.ts  |  pricing.ts  |  usage.ts                  ││
│  └─────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────┐│
│  │                   类型定义 (Types)                        ││
│  │  AIModel | Provider | ChatMessage | PricingTier         ││
│  │  APIKey  | UsageStats                                    ││
│  └─────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────┤
│  样式层 (Tailwind CSS + CSS Variables)                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │ 暗色主题变量  │  │ 亮色主题变量  │  │  Tailwind 工具类  │  │
│  │ (:root)      │  │ (html.light) │  │  (Utility-first) │  │
│  └──────────────┘  └──────────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. 应用启动流程

```
1. index.html 加载 → 执行 /src/main.tsx
                           │
2. createRoot(document.getElementById('root'))
                           │
3. React.StrictMode 包装
                           │
4. ThemeProvider 初始化
   ├── 读取 localStorage('theme')
   ├── 若无则检测系统偏好 (prefers-color-scheme)
   └── 设置 <html> 的 class (dark/light)
                           │
5. ToastProvider 初始化
   └── 提供 addToast / removeToast 方法
                           │
6. App 组件渲染
   └── BrowserRouter → Routes → Layout
       ├── Header (固定顶部导航)
       ├── Outlet (页面内容区)
       └── Footer (页脚)
```

### 关键入口代码

```typescript
// src/main.tsx
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </ThemeProvider>
  </StrictMode>,
);
```

---

## 4. 组件树

### 4.1 完整组件树

```
App (BrowserRouter)
└── Routes
    └── Route path="/" element={<Layout />}
        ├── Header
        │   ├── Logo + 站点名
        │   ├── 导航链接 × 9（含子路由高亮）
        │   ├── 主题切换按钮
        │   └── 移动端汉堡菜单
        ├── Outlet
        │   ├── Home
        │   │   ├── Hero 区域 (ScrollReveal)
        │   │   ├── 统计数据 (CountUp × 4)
        │   │   ├── 特性网格 (ScrollReveal)
        │   │   ├── 精选模型卡片
        │   │   ├── 操作流程步骤 (ScrollReveal)
        │   │   ├── 代码示例块
        │   │   └── CTA 区域
        │   ├── Models
        │   │   ├── 搜索栏
        │   │   ├── 提供商筛选
        │   │   ├── 标签筛选
        │   │   ├── 排序/视图切换
        │   │   └── 模型卡片列表/网格
        │   ├── Compare
        │   │   ├── 模型选择器（最多 4 个）
        │   │   └── 多维度对比表格 + 评分系统
        │   ├── Rankings
        │   │   ├── 前三名领奖台
        │   │   ├── 排名维度切换 (4 种)
        │   │   └── 完整排名列表
        │   ├── Dashboard
        │   │   ├── 统计概览卡片 × 4
        │   │   ├── 每日用量柱状图 (SVG)
        │   │   ├── 每日请求折线图 (SVG)
        │   │   ├── 模型用量环形图 (SVG)
        │   │   ├── 小时请求柱状图 (SVG)
        │   │   └── 模型详细用量表格
        │   ├── Chat
        │   │   ├── 对话侧栏
        │   │   ├── 消息列表
        │   │   ├── 消息输入框
        │   │   └── 模型选择下拉
        │   ├── Pricing
        │   │   ├── 定价卡片 × 3
        │   │   └── FAQ 问答区
        │   ├── Docs
        │   │   ├── 侧栏文档导航 (6 节)
        │   │   └── 文档内容渲染器 (自定义 Markdown)
        │   └── Keys
        │       ├── 密钥统计概览
        │       ├── 密钥列表 (CRUD)
        │       └── 安全使用提示
        └── Footer
            ├── 产品链接
            ├── 开发者链接
            ├── 公司链接
            └── 法律链接
```

### 4.2 共享组件详解

| 组件 | 类型 | 职责 | 关键 Props |
|------|------|------|-----------|
| **Layout** | 布局 | 页面骨架，渲染 Header + Outlet + Footer | 无（通过 Outlet 嵌套子路由） |
| **Header** | 导航 | 固定顶栏，滚动毛玻璃效果，响应式菜单 | 无（使用 Context + 路由状态） |
| **Footer** | 展示 | 四栏页脚导航 | 无 |
| **ThemeContext** | Provider | 主题切换（dark/light），管理 `html` class | children |
| **ToastContext** | Provider | 全局通知系统，支持 4 种类型 | children |
| **CountUp** | 动画 | 数字滚动动画，IntersectionObserver 触发 | `end`, `duration`, `prefix`, `suffix` |
| **ScrollReveal** | 动画 | 滚动入场动画，支持 5 种方向 | `direction`, `delay`, `className` |

---

## 5. 路由设计

### 5.1 路由表

| 路由路径 | 页面组件 | 嵌套层级 | 说明 |
|---------|---------|---------|------|
| `/` | `Home` | Layout → index | 首页/落地页 |
| `/models` | `Models` | Layout → models | 模型广场 |
| `/compare` | `Compare` | Layout → compare | 模型对比 |
| `/rankings` | `Rankings` | Layout → rankings | 排行榜 |
| `/dashboard` | `Dashboard` | Layout → dashboard | 用量仪表盘 |
| `/chat` | `Chat` | Layout → chat | 在线体验 |
| `/pricing` | `Pricing` | Layout → pricing | 价格方案 |
| `/docs` | `Docs` | Layout → docs | 开发文档 |
| `/keys` | `Keys` | Layout → keys | 密钥管理 |

### 5.2 路由配置

```typescript
// src/App.tsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="models" element={<Models />} />
      <Route path="compare" element={<Compare />} />
      <Route path="rankings" element={<Rankings />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="chat" element={<Chat />} />
      <Route path="pricing" element={<Pricing />} />
      <Route path="docs" element={<Docs />} />
      <Route path="keys" element={<Keys />} />
    </Route>
  </Routes>
</BrowserRouter>
```

### 5.3 路由设计原则

- **嵌套路由** — 所有页面共享 `Layout` 组件提供的 Header 和 Footer
- **Outlet** — 使用 React Router 的 `<Outlet />` 渲染子路由内容
- **相对路径** — 子路由使用相对路径（无需前缀 `/`）
- **Index Route** — `/` 使用 `index` 属性渲染 Home 组件

---

## 6. 数据架构

### 6.1 数据模型

#### AIModel（AI 模型）

```typescript
interface AIModel {
  id: string;            // 唯一标识 (e.g., "gpt-4o")
  name: string;          // 显示名称
  provider: string;      // 提供商名称
  providerLogo: string;  // 提供商 Logo URL
  description: string;   // 模型描述
  tags: string[];        // 标签（分类、特性）
  contextWindow: number; // 上下文窗口大小（tokens）
  inputPrice: number;    // 输入价格 ($/M tokens)
  outputPrice: number;   // 输出价格 ($/M tokens)
  features: string[];    // 特性列表
  popularity: number;    // 人气指数 (0-100)
  isNew?: boolean;       // 新模型标记
  isRecommended?: boolean; // 推荐标记
}
```

#### Provider（提供商）

```typescript
interface Provider {
  id: string;              // 唯一标识
  name: string;            // 显示名称
  logo: string;            // Logo URL
  description: string;     // 描述
  modelsCount: number;     // 模型数量
  status: 'active' | 'beta' | 'coming_soon';
}
```

#### ChatMessage（聊天消息）

```typescript
interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  model?: string;          // 使用的模型
}
```

#### PricingTier（定价方案）

```typescript
interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: number;
  priceUnit: string;        // "月" | "年"
  features: string[];       // 功能列表
  highlighted?: boolean;    // 是否高亮
  cta: string;              // 按钮文案
}
```

#### APIKey（API 密钥）

```typescript
interface APIKey {
  id: string;
  name: string;
  key: string;              // 完整的 Key（仅创建时可见）
  prefix: string;           // 显示前缀（如 "sk-ai..."）
  createdAt: Date;
  lastUsedAt?: Date;
  usage: number;            // 已用额度
  limit: number;            // 额度上限
  status: 'active' | 'revoked';
}
```

#### UsageStats（用量统计）

```typescript
interface UsageStats {
  date: string;
  tokens: number;
  cost: number;
  requests: number;
}
```

### 6.2 数据流

```
┌──────────┐    import    ┌──────────┐    props     ┌──────────┐
│ src/data │ ──────────→ │ 页面组件  │ ───────────→ │ 子组件   │
│ 静态数据  │             │ (Pages)  │              │          │
└──────────┘             └──────────┘              └──────────┘
                              │
                              │ useState / useMemo
                              ▼
                        ┌──────────┐
                        │ 状态管理  │
                        │ (本地)   │
                        └──────────┘
```

**数据流向是单向的**：
1. 页面组件从 `src/data/` import 数据
2. 通过 `useState` 或 `useMemo` 在本地管理渲染状态（搜索词、排序方式、选中项等）
3. 通过 props 传递给子组件进行渲染
4. 用户交互通过回调函数更新本地状态，触发重新渲染

### 6.3 数据目录内容

#### `src/data/models.ts` — 14 个模型 + 8 个提供商

| 提供商 | 模型数 | 代表模型 |
|--------|--------|---------|
| OpenAI | 2 | GPT-4o, GPT-4o Mini |
| Anthropic | 2 | Claude 3.5 Sonnet, Claude 3 Opus |
| Google | 2 | Gemini 1.5 Pro, Gemini 1.5 Flash |
| Meta | 2 | Llama 3.1 405B, Llama 3.1 70B |
| DeepSeek | 2 | DeepSeek-V3, DeepSeek-Coder |
| Mistral AI | 2 | Mixtral 8x22B, Mistral Large |
| Alibaba | 2 | Qwen2-72B, Qwen-VL-Plus |
| Baidu | 1 | ERNIE 4.0 |

#### `src/data/pricing.ts` — 3 个定价方案

| 方案 | 价格 | Tokens 额度 | 目标用户 |
|------|------|------------|---------|
| 免费版 | $0/月 | 100K | 个人开发者 |
| 专业版 | $29/月 | 5M | 中小团队 |
| 企业版 | $199/月 | 无限 | 大型企业 |

#### `src/data/usage.ts` — 模拟用量数据

- `dailyUsageData` — 10 天每日用量趋势（4/26 - 5/5）
- `modelUsageData` — 8 个模型的用量分布
- `hourlyUsageData` — 12 个时段请求分布
- `weeklyStats` — 周汇总统计（总 tokens、总成本、平均延迟、成功率）

---

## 7. 状态管理

项目不引入 Redux/Zustand 等第三方状态管理库，全部使用 React 内置机制：

### 7.1 状态分类

| 状态类型 | 管理方式 | 作用域 | 示例 |
|---------|---------|--------|------|
| **全局状态** | React Context | 整个应用 | 主题模式、Toast 通知 |
| **页面状态** | useState/useMemo | 单个页面 | 搜索词、排序方式、选中项 |
| **组件状态** | useState | 单个组件 | 展开/折叠、悬停状态 |
| **持久化状态** | localStorage | 跨会话 | 主题偏好 |

### 7.2 Context Provider 详解

#### ThemeContext

```typescript
// 提供的值
interface ThemeContextType {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}
```

**行为**：
1. 初始化时从 `localStorage` 读取主题
2. 若无存储值，使用 `window.matchMedia('(prefers-color-scheme: dark)')` 获取系统偏好
3. 切换时同时更新 `html` 元素的 class 和 `localStorage`
4. 通过 CSS 变量实现主题切换（无需重新渲染组件样式）

#### ToastContext

```typescript
// 提供的值
interface ToastContextType {
  toasts: Toast[];
  addToast: (type, message) => void;
  removeToast: (id) => void;
}

type ToastType = 'success' | 'error' | 'info' | 'warning';
```

**行为**：
- 支持 4 种通知类型
- 自动 4 秒后消失
- 支持主动关闭
- 全局任意组件可通过 Context 调用

---

## 8. 主题系统

### 8.1 实现方式

采用 **CSS 自定义属性（CSS Variables）+ Tailwind dark: 前缀** 的双轨制方案：

- **CSS Variables** — 定义颜色、背景等设计令牌
- **Tailwind `dark:`** — 快速切换组件级别的样式

### 8.2 主题变量定义

```css
/* src/index.css */
:root {
  --color-bg-primary: #0a0a0f;
  --color-bg-secondary: #111118;
  --color-text-primary: #ffffff;
  /* ...更多变量 */
}

html.light {
  --color-bg-primary: #f8fafc;
  --color-bg-secondary: #ffffff;
  --color-text-primary: #0f172a;
  /* ...更多变量 */
}
```

### 8.3 主题切换流程

```
用户点击 Header 主题按钮
        │
        ▼
toggleTheme() 调用
        │
        ├──→ 更新 Context 中的 theme 状态
        ├──→ 更新 <html> class（add/remove 'light'）
        └──→ 写入 localStorage('theme')
```

---

## 9. 动画系统

项目使用两类动画，均基于浏览器原生 API，无第三方动画库：

### 9.1 CountUp — 数字滚动动画

**实现原理**：
- 使用 `IntersectionObserver` 监听元素进入视口
- 元素可见时，通过 `requestAnimationFrame` 逐帧更新数字
- 缓动公式：`easeOutCubic`（三次缓出函数）

**使用示例**：
```tsx
<CountUp end={98420000} duration={2000} suffix="+" />
```

### 9.2 ScrollReveal — 滚动显示动画

**实现原理**：
- `IntersectionObserver` 检测元素进入视口
- 进入时添加 CSS transition class
- 支持 5 种动画方向：`up`、`down`、`left`、`right`、`scale`

**使用示例**：
```tsx
<ScrollReveal direction="up" delay={200}>
  <YourComponent />
</ScrollReveal>
```

---

## 10. 样式架构

### 10.1 样式分层

```
1. Tailwind 基础层 (@tailwind base)        — CSS Reset + 基础样式
2. CSS 自定义属性 (:root / html.light)      — 主题设计令牌
3. Tailwind 组件层 (@tailwind components)   — 自定义组件类 (container-wide, section-padding)
4. Tailwind 工具层 (@tailwind utilities)    — 原子化工具类
5. 全局工具类 (.gradient-text, .glass 等)   — 项目特定的通用样式
```

### 10.2 Tailwind 自定义配置

从 `tailwind.config.cjs` 中扩展了：

- **颜色** — `primary`, `dark` 色阶（适配暗色主题）
- **动画** — 自定义 `fade-in`, `slide-up` 等入场动画
- **字体** — Inter 作为默认字体

---

## 11. 构建配置

### 11.1 Vite 配置

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  base: './',           // 相对路径 — 支持子目录部署
  build: {
    cssMinify: false,   // 禁用 CSS 压缩（开发调试用）
  },
});
```

### 11.2 TypeScript 配置

| 配置文件 | 用途 | 关键设置 |
|---------|------|---------|
| `tsconfig.json` | 根配置，引用子配置 | references: app, node |
| `tsconfig.app.json` | 应用源码 | target: ES2023, strict, noUnusedLocals/Parameters |
| `tsconfig.node.json` | 构建工具 | 仅用于 vite.config.ts |

### 11.3 构建产物

```
dist/
├── index.html
├── favicon.svg
├── icons.svg
└── assets/
    ├── index-C6mkIMpg.js    # 主 JS bundle
    └── index-wmu7YDDU.css   # 主 CSS bundle
```

---

## 12. 目录结构约定

### 文件组织原则

| 目录 | 用途 | 规则 |
|------|------|------|
| `src/components/` | 共享/可复用组件 | 每个组件一个文件，无子目录 |
| `src/pages/` | 路由级页面组件 | 一个页面一个文件，文件名对应路由 |
| `src/data/` | 静态数据文件 | 纯数据，无组件逻辑 |
| `src/types/` | TypeScript 类型定义 | 集中的类型声明文件 |
| `src/assets/` | 构建时处理的资源 | 图片、字体等 |
| `public/` | 构建时直接拷贝的资源 | 无需处理的静态文件 |

### 命名约定

- **组件文件** — PascalCase（`ScrollReveal.tsx`）
- **数据文件** — camelCase（`models.ts`）
- **类型文件** — camelCase（`index.ts`）
- **配置文件** — kebab-case 或带后缀（`vite.config.ts`, `tailwind.config.cjs`）
- **组件导出** — 默认导出（`export default function ComponentName`）
- **数据导出** — 命名导出（`export const models: AIModel[]`）

---

## 附录

### A. 依赖关系图

```
react + react-dom           ← 核心框架
├── react-router-dom        ← 路由管理
├── lucide-react            ← 图标库
└── (内置 Hooks)            ← useState, useContext, useMemo

devDependencies:
├── typescript              ← 类型检查
├── vite + @vitejs/plugin-react ← 构建
├── tailwindcss + postcss + autoprefixer ← 样式
├── eslint + plugins        ← 代码规范
└── @types/*                ← 类型声明
```

### B. 浏览器兼容性

- 目标浏览器：现代浏览器（Chrome、Firefox、Safari、Edge 最新两个版本）
- 核心依赖：ES2023+、CSS Grid、CSS Custom Properties、IntersectionObserver
- 不支持 IE 11 及以下
