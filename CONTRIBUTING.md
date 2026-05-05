# 贡献指南

感谢你对 AI API Hub 项目的关注！我们欢迎各种形式的贡献，包括但不限于：

- 提交 Bug 报告
- 提出新功能建议
- 改进文档
- 提交代码修复或新功能

## 目录

1. [环境准备](#1-环境准备)
2. [本地开发](#2-本地开发)
3. [代码规范](#3-代码规范)
4. [提交规范](#4-提交规范)
5. [Pull Request 流程](#5-pull-request-流程)
6. [项目架构约定](#6-项目架构约定)

---

## 1. 环境准备

确保你已安装：

- **Node.js** >= 18.0
- **npm** >= 9.0（或 pnpm >= 8.0）

推荐使用 VS Code 编辑器，并安装以下插件：

- ESLint — 代码检查
- Tailwind CSS IntelliSense — 智能提示
- Prettier — 代码格式化（可选）

---

## 2. 本地开发

```bash
# Fork 并克隆仓库
git clone https://github.com/<你的用户名>/ai-api-hub.git
cd ai-api-hub

# 安装依赖
npm install

# 启动开发服务器（http://localhost:5173）
npm run dev

# 构建生产版本（确保无编译错误）
npm run build

# 运行代码检查
npm run lint
```

### 开发工作流

1. 从 `main` 分支拉取最新代码
2. 创建功能分支：`git checkout -b feature/your-feature-name`
3. 进行开发，确保 `npm run dev` 正常运行
4. 提交前运行 `npm run lint` 和 `npm run build`
5. 提交代码并推送分支
6. 创建 Pull Request

---

## 3. 代码规范

### TypeScript

- 所有新代码必须使用 TypeScript
- 启用严格模式（`strict: true`）
- 启用未使用变量检查（`noUnusedLocals`, `noUnusedParameters`）
- 类型定义统一放在 `src/types/index.ts`

### React 组件

- 使用**函数式组件** + Hooks（不使用 Class 组件）
- 每个组件一个文件，使用**默认导出**
- 组件命名遵循 **PascalCase**
- Props 类型使用 **interface** 声明在组件文件中
- 避免超过 300 行的组件，过大的组件应拆分

```tsx
// 推荐写法
interface MyComponentProps {
  title: string;
  onAction?: () => void;
}

export default function MyComponent({ title, onAction }: MyComponentProps) {
  // ...
}
```

### 样式

- **优先使用 Tailwind CSS 工具类**，避免写自定义 CSS
- 仅在必要时添加全局样式到 `src/index.css`
- 使用 Tailwind 的响应式前缀（`sm:`, `md:`, `lg:`, `xl:`）
- 使用 CSS 自定义属性（`var(--color-*)`）而非硬编码颜色值

### 代码组织

- 页面组件放 `src/pages/`，一个文件对应一个路由
- 共享组件放 `src/components/`，无子目录嵌套
- 静态数据放 `src/data/`，每个数据文件对应一个领域
- 类型定义放 `src/types/index.ts`，统一管理

---

## 4. 提交规范

提交信息请遵循 [约定式提交（Conventional Commits）](https://www.conventionalcommits.org/) 规范：

```
<type>: <简短描述>

<详细描述（可选）>
```

### 类型说明

| 类型 | 说明 | 示例 |
|------|------|------|
| `feat` | 新功能 | `feat: 添加模型导出功能` |
| `fix` | Bug 修复 | `fix: 修复暗色模式下表格边框缺失` |
| `docs` | 文档更新 | `docs: 更新 API 调用示例` |
| `style` | 代码格式调整（不影响功能） | `style: 统一缩进格式` |
| `refactor` | 代码重构 | `refactor: 提取模型卡片为独立组件` |
| `perf` | 性能优化 | `perf: 优化模型列表虚拟滚动` |
| `test` | 测试相关 | `test: 添加模型对比单元测试` |
| `chore` | 构建/工具链相关 | `chore: 升级 Vite 到 8.0` |

### 提交示例

```
feat: 添加模型导出功能

支持将选中的模型数据导出为 CSV 和 JSON 格式。
在模型对比页和排行榜页添加了导出按钮。
```

---

## 5. Pull Request 流程

1. **确保代码质量**
   - `npm run build` 无错误
   - `npm run lint` 无警告
   - 新增功能已手动测试

2. **更新相关文档**
   - 新组件/页面在 `README.md` 结构说明中提及
   - 重大架构变更更新 `ARCHITECTURE.md`
   - 用户可见功能更新 `CHANGELOG.md`

3. **PR 描述模板**
   ```markdown
   ## 变更类型
   - [ ] 新功能
   - [ ] Bug 修复
   - [ ] 文档更新
   - [ ] 代码重构
   - [ ] 其他

   ## 变更说明
   简要描述做了什么改动。

   ## 测试截图（如适用）
   附上 UI 变更的前后对比截图。

   ## 关联 Issue
   Closes #xxx
   ```

---

## 6. 项目架构约定

### 数据流

```
src/data/*.ts → 页面组件 (useState) → 子组件 (props)
```

- 所有数据在 `src/data/` 中静态定义
- 页面组件通过 import 获取数据，通过 `useState` 管理渲染状态
- 无后端 API 调用，无数据获取层

### 状态管理

- **全局状态** — React Context（ThemeContext, ToastContext）
- **页面状态** — `useState` / `useMemo`
- **持久化** — `localStorage`（仅主题偏好）

### 路由

- 新页面在 `src/App.tsx` 的 `<Route>` 中注册
- 页面组件放 `src/pages/`，文件名与路由路径一致
- 所有页面通过 `Layout` 组件共享 Header 和 Footer

### 目录结构约定

```
src/
├── components/   # 共享组件（每个组件一个文件）
├── pages/        # 页面组件（每个页面对应一个路由）
├── data/         # 静态数据
├── types/        # 类型定义（统一放在 index.ts）
└── assets/       # 资源文件
```

---

## 行为准则

请保持友善和尊重，共同维护一个开放包容的社区环境。

- 使用欢迎和包容的语言
- 尊重不同的观点和经验
- 优雅地接受建设性批评
- 关注对社区最有利的事情
- 对其他社区成员表现出同理心
