# 贡献指南

感谢你对 AI API Hub 项目的关注！我们欢迎各种形式的贡献，包括但不限于：

- 提交 Bug 报告
- 提出新功能建议
- 改进文档
- 提交代码修复或新功能

## 开发流程

### 1. 环境准备

确保你已安装：
- Node.js >= 18
- npm >= 9

### 2. 本地开发

```bash
# Fork 并克隆仓库
git clone https://github.com/<你的用户名>/ai-api-hub.git
cd ai-api-hub

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 3. 代码规范

- 使用 TypeScript 编写代码，确保类型安全
- 遵循 ESLint 配置，提交前运行 `npm run lint`
- 组件使用函数式组件 + Hooks
- 样式优先使用 Tailwind CSS 工具类
- 保持代码简洁可读，添加必要的注释

### 4. 提交规范

提交信息请遵循以下格式：

```
<type>: <简短描述>

<详细描述（可选）>
```

类型说明：
- `feat` - 新功能
- `fix` - Bug 修复
- `docs` - 文档更新
- `style` - 代码格式调整（不影响功能）
- `refactor` - 代码重构
- `perf` - 性能优化
- `test` - 测试相关
- `chore` - 构建/工具链相关

### 5. 提交 PR

1. 确保代码可以正常构建：`npm run build`
2. 确保没有 Lint 错误：`npm run lint`
3. 更新相关文档（如需要）
4. 在 PR 描述中清楚说明改动内容和原因

## 行为准则

请保持友善和尊重，共同维护一个开放包容的社区环境。
