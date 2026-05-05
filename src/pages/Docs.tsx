import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Key,
  Terminal,
  ChevronRight,
  Copy,
  Check,
  Zap,
  Globe,
  Shield,
  MessageSquare,
  Gauge,
} from 'lucide-react';

const docSections = [
  {
    id: 'overview',
    title: '平台概述',
    icon: BookOpen,
    content: `
## AI API Hub 概述

AI API Hub 是一个统一的 AI 模型 API 聚合平台，让开发者通过**单一接口**访问来自全球顶级厂商的大语言模型。

### 核心优势

- **统一接口** — 一套 API 标准，兼容 OpenAI、Anthropic、Google、Meta 等
- **模型丰富** — 覆盖 8 家提供商、14 个大语言模型
- **按需付费** — 灵活定价，从免费版到企业版满足不同需求
- **高可用性** — 99.7% 成功率，平均 245ms 响应延迟
- **安全可靠** — 企业级 API Key 管理，数据加密传输

### 支持的提供商

| 提供商 | 代表模型 | 状态 |
|--------|---------|------|
| OpenAI | GPT-4o, GPT-4o Mini | 活跃 |
| Anthropic | Claude 3.5 Sonnet, Claude 3 Opus | 活跃 |
| Google | Gemini 1.5 Pro, Gemini 1.5 Flash | 活跃 |
| Meta | Llama 3.1 405B, Llama 3.1 70B | 活跃 |
| DeepSeek | DeepSeek-V3, DeepSeek-Coder | 活跃 |
| Mistral AI | Mixtral 8x22B, Mistral Large | 活跃 |
| Alibaba | Qwen2-72B, Qwen-VL-Plus | 活跃 |
| Baidu | ERNIE 4.0 | 活跃 |
    `.trim(),
  },
  {
    id: 'quickstart',
    title: '快速开始',
    icon: Zap,
    content: `
## 快速开始

3 分钟完成接入，开始调用 AI 模型。

### 1. 获取 API Key

1. 注册并登录 AI API Hub 账号
2. 前往 [API 密钥](/keys) 页面
3. 点击"创建新密钥"按钮
4. 复制生成的 API Key（密钥仅显示一次，请妥善保存）

### 2. 安装 SDK

\\\`\\\`\\\`bash
# Python（推荐使用 OpenAI SDK）
pip install openai

# Node.js
npm install openai

# cURL（无需安装）
\\\`\\\`\\\`

### 3. 发起第一个请求

\\\`\\\`\\\`python
from openai import OpenAI

client = OpenAI(
    base_url="https://api.aihub.com/v1",
    api_key="your-api-key-here"
)

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": "你是一个有帮助的助手。"},
        {"role": "user", "content": "用一句话介绍人工智能。"}
    ],
    temperature=0.7,
    max_tokens=200
)

print(response.choices[0].message.content)
\\\`\\\`\\\`

### 4. 环境变量最佳实践

\\\`\\\`\\\`bash
# 不要将 API Key 硬编码在代码中！
# 使用环境变量：
export AIHUB_API_KEY="your-api-key-here"
\\\`\\\`\\\`

\\\`\\\`\\\`python
import os
from openai import OpenAI

client = OpenAI(
    base_url="https://api.aihub.com/v1",
    api_key=os.environ.get("AIHUB_API_KEY")
)
\\\`\\\`\\\`
    `.trim(),
  },
  {
    id: 'models',
    title: '模型列表',
    icon: Globe,
    content: `
## 支持的模型

通过统一的 \\\`model\\\` 参数即可切换不同模型。更多模型请查看 [模型库](/models)。

### 推荐模型

| 模型 ID | 提供商 | 上下文窗口 | 输入价格 | 输出价格 | 适用场景 |
|---------|--------|-----------|---------|---------|---------|
| \\\`gpt-4o\\\` | OpenAI | 128K | $2.5/M | $10/M | 多模态、通用任务 |
| \\\`claude-3-5-sonnet\\\` | Anthropic | 200K | $3/M | $15/M | 推理、编码 |
| \\\`gemini-1-5-pro\\\` | Google | 2M | $3.5/M | $10.5/M | 超长上下文、多模态 |
| \\\`deepseek-chat\\\` | DeepSeek | 64K | $0.5/M | $1/M | 中文、高性价比 |

### 高性价比模型

| 模型 ID | 提供商 | 上下文窗口 | 输入价格 | 输出价格 |
|---------|--------|-----------|---------|---------|
| \\\`gpt-4o-mini\\\` | OpenAI | 128K | $0.15/M | $0.6/M |
| \\\`gemini-1-5-flash\\\` | Google | 1M | $0.35/M | $0.7/M |
| \\\`llama-3-1-70b\\\` | Meta | 128K | $0.5/M | $0.7/M |
| \\\`deepseek-coder\\\` | DeepSeek | 64K | $0.3/M | $0.6/M |

### 查询可用模型

\\\`\\\`\\\`bash
curl https://api.aihub.com/v1/models \\
  -H "Authorization: Bearer your-api-key"
\\\`\\\`\\\`
    `.trim(),
  },
  {
    id: 'authentication',
    title: '认证鉴权',
    icon: Key,
    content: `
## 认证方式

所有 API 请求都需要通过 **Bearer Token** 进行身份验证。

### HTTP Header

\\\`\\\`\\\`
Authorization: Bearer your-api-key-here
\\\`\\\`\\\`

### cURL 示例

\\\`\\\`\\\`bash
curl https://api.aihub.com/v1/models \\
  -H "Authorization: Bearer sk-ai-xxxxxxxxxxxxxxxx"
\\\`\\\`\\\`

### Python SDK 示例

\\\`\\\`\\\`python
from openai import OpenAI

client = OpenAI(
    base_url="https://api.aihub.com/v1",
    api_key="sk-ai-xxxxxxxxxxxxxxxx"
)
\\\`\\\`\\\`

### Node.js SDK 示例

\\\`\\\`\\\`javascript
import OpenAI from 'openai';

const client = new OpenAI({
  baseURL: 'https://api.aihub.com/v1',
  apiKey: 'sk-ai-xxxxxxxxxxxxxxxx',
});
\\\`\\\`\\\`

### 安全建议

- 不要将 API Key 硬编码在代码中
- 使用环境变量或密钥管理服务存储 API Key
- 定期轮换 API Key
- 为不同的应用创建独立的 API Key
- 前往 [密钥管理](/keys) 页面设置用量限额
    `.trim(),
  },
  {
    id: 'chat',
    title: '对话 API',
    icon: MessageSquare,
    content: `
## Chat Completions API

Chat Completions 是最核心的 API 端点，用于与模型进行对话交互。

### 端点

\\\`\\\`\\\`
POST https://api.aihub.com/v1/chat/completions
\\\`\\\`\\\`

### 请求参数

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| \\\`model\\\` | string | 是 | — | 模型 ID，如 \\\`gpt-4o\\\`、\\\`claude-3-5-sonnet\\\` |
| \\\`messages\\\` | array | 是 | — | 消息列表，支持 system/user/assistant 角色 |
| \\\`temperature\\\` | float | 否 | 1.0 | 随机性控制 (0-2)，越高越有创造性 |
| \\\`max_tokens\\\` | int | 否 | 模型上限 | 生成的最大 token 数 |
| \\\`top_p\\\` | float | 否 | 1.0 | 核采样概率，与 temperature 二选一 |
| \\\`stream\\\` | boolean | 否 | false | 是否使用流式输出 |
| \\\`stop\\\` | string/array | 否 | null | 停止生成的标记 |

### 基本调用

\\\`\\\`\\\`bash
curl https://api.aihub.com/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer your-api-key" \\
  -d '{
    "model": "gpt-4o",
    "messages": [
      {"role": "system", "content": "你是一个专业的编程助手。"},
      {"role": "user", "content": "用 Python 写一个快速排序算法。"}
    ],
    "temperature": 0.3,
    "max_tokens": 1000
  }'
\\\`\\\`\\\`

### 多轮对话

\\\`\\\`\\\`python
from openai import OpenAI

client = OpenAI(
    base_url="https://api.aihub.com/v1",
    api_key="your-api-key"
)

messages = [
    {"role": "system", "content": "你是一个有帮助的助手。"},
    {"role": "user", "content": "什么是机器学习？"},
]

# 第一轮
response = client.chat.completions.create(
    model="gpt-4o",
    messages=messages
)

# 将助手回复加入上下文
messages.append({
    "role": "assistant",
    "content": response.choices[0].message.content
})

# 第二轮
messages.append({
    "role": "user",
    "content": "能举个简单的例子吗？"
})

response = client.chat.completions.create(
    model="gpt-4o",
    messages=messages
)
print(response.choices[0].message.content)
\\\`\\\`\\\`
    `.trim(),
  },
  {
    id: 'streaming',
    title: '流式输出',
    icon: Terminal,
    content: `
## 流式输出 (Streaming)

流式输出允许在模型生成内容的同时逐步接收响应，显著提升用户体验。

### Python 流式调用

\\\`\\\`\\\`python
from openai import OpenAI

client = OpenAI(
    base_url="https://api.aihub.com/v1",
    api_key="your-api-key"
)

stream = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "写一首关于春天的诗"}],
    stream=True
)

for chunk in stream:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="")
\\\`\\\`\\\`

### Node.js 流式调用

\\\`\\\`\\\`javascript
import OpenAI from 'openai';

const client = new OpenAI({
  baseURL: 'https://api.aihub.com/v1',
  apiKey: 'your-api-key',
});

const stream = await client.chat.completions.create({
  model: 'gpt-4o',
  messages: [{ role: 'user', content: '写一首关于春天的诗' }],
  stream: true,
});

for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content || '');
}
\\\`\\\`\\\`

### 原生 Fetch (SSE 解析)

\\\`\\\`\\\`javascript
const response = await fetch('https://api.aihub.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your-api-key'
  },
  body: JSON.stringify({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: '你好' }],
    stream: true
  })
});

const reader = response.body.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;

  const chunk = decoder.decode(value);
  const lines = chunk.split('\\n');

  for (const line of lines) {
    if (line.startsWith('data: ')) {
      const data = line.slice(6);
      if (data === '[DONE]') break;

      try {
        const json = JSON.parse(data);
        const content = json.choices[0]?.delta?.content;
        if (content) process.stdout.write(content);
      } catch (e) {
        // 忽略解析错误
      }
    }
  }
}
\\\`\\\`\\\`
    `.trim(),
  },
  {
    id: 'rate-limits',
    title: '速率限制',
    icon: Gauge,
    content: `
## 速率限制

为确保服务质量，API 根据套餐等级设置了不同的速率限制。

### 限制规则

| 套餐 | 请求频率 | Tokens/分钟 | 并发连接 |
|------|---------|------------|---------|
| 免费版 | 30 RPM | 50K | 2 |
| 专业版 | 300 RPM | 500K | 10 |
| 企业版 | 3000 RPM | 5M | 50 |

### 响应头

每次 API 响应都会包含速率限制信息：

\\\`\\\`\\\`
x-ratelimit-limit-requests: 300
x-ratelimit-remaining-requests: 287
x-ratelimit-reset-requests: 45s
x-ratelimit-limit-tokens: 500000
x-ratelimit-remaining-tokens: 482000
\\\`\\\`\\\`

### 处理 429 错误

当超过速率限制时，API 返回 429 状态码。建议实现指数退避重试：

\\\`\\\`\\\`python
import time
from openai import OpenAI

client = OpenAI(
    base_url="https://api.aihub.com/v1",
    api_key="your-key"
)

def chat_with_retry(messages, max_retries=3):
    for attempt in range(max_retries):
        try:
            return client.chat.completions.create(
                model="gpt-4o",
                messages=messages
            )
        except Exception as e:
            if "429" in str(e) and attempt < max_retries - 1:
                wait_time = 2 ** attempt  # 指数退避：1s, 2s, 4s
                print(f"速率限制，等待 {wait_time}s 后重试...")
                time.sleep(wait_time)
            else:
                raise
\\\`\\\`\\\`
    `.trim(),
  },
  {
    id: 'errors',
    title: '错误处理',
    icon: Shield,
    content: `
## 错误处理

AI API Hub 使用标准 HTTP 状态码和 JSON 格式返回错误信息。

### HTTP 状态码

| 状态码 | 说明 | 常见原因 |
|--------|------|---------|
| 200 | 请求成功 | — |
| 400 | 请求参数错误 | 缺少必填参数、参数类型错误 |
| 401 | 认证失败 | API Key 无效或已过期 |
| 403 | 权限不足 | 无权访问该模型或资源 |
| 404 | 资源不存在 | 模型 ID 不存在 |
| 429 | 请求过于频繁 | 超出速率限制 |
| 500 | 服务器内部错误 | 临时故障，建议重试 |
| 503 | 服务暂时不可用 | 服务维护中 |

### 错误响应格式

\\\`\\\`\\\`json
{
  "error": {
    "message": "Incorrect API key provided: sk-ai-xxxx. You can find your API key at https://aihub.com/keys.",
    "type": "authentication_error",
    "code": "invalid_api_key"
  }
}
\\\`\\\`\\\`

### 常见错误码

| 错误码 | 说明 | 解决方案 |
|--------|------|---------|
| \\\`invalid_api_key\\\` | API Key 无效 | 检查 Key 是否正确，是否已过期 |
| \\\`model_not_found\\\` | 模型不存在 | 检查 model 参数拼写 |
| \\\`rate_limit_exceeded\\\` | 超过速率限制 | 降低请求频率或升级套餐 |
| \\\`insufficient_quota\\\` | 额度不足 | 升级套餐或等待额度重置 |
| \\\`context_length_exceeded\\\` | 上下文超长 | 缩短输入或使用更大上下文模型 |
| \\\`server_error\\\` | 服务器错误 | 等待后重试 |

### 重试策略

\\\`\\\`\\\`python
import time
from openai import OpenAI

def call_with_retry(messages, max_retries=3):
    client = OpenAI(base_url="https://api.aihub.com/v1")

    for attempt in range(max_retries):
        try:
            return client.chat.completions.create(
                model="gpt-4o",
                messages=messages
            )
        except Exception as e:
            # 仅对可重试的错误进行退避
            if attempt == max_retries - 1:
                raise
            wait = 2 ** attempt
            print(f"请求失败，{wait}s 后重试... ({attempt + 1}/{max_retries})")
            time.sleep(wait)
\\\`\\\`\\\`
    `.trim(),
  },
];

export default function Docs() {
  const [activeSection, setActiveSection] = useState('overview');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const activeDoc = docSections.find((s) => s.id === activeSection) || docSections[0];

  const handleCopy = async (code: string, id: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const renderContent = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      if (line.startsWith('## ')) {
        elements.push(
          <h2 key={i} className="text-2xl font-bold text-white mt-8 mb-4">
            {line.replace('## ', '')}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={i} className="text-xl font-semibold text-white mt-6 mb-3">
            {line.replace('### ', '')}
          </h3>
        );
      } else if (line.startsWith('```')) {
        const language = line.replace('```', '').trim();
        let code = '';
        i++;
        while (i < lines.length && !lines[i].startsWith('```')) {
          code += lines[i] + '\n';
          i++;
        }
        const codeId = `code-${i}`;
        elements.push(
          <div key={i} className="relative my-4">
            <div className="flex items-center justify-between px-4 py-2 bg-dark-800 border border-dark-700 border-b-0 rounded-t-lg">
              <span className="text-xs text-dark-400">{language || 'code'}</span>
              <button
                onClick={() => handleCopy(code.trim(), codeId)}
                className="flex items-center gap-1 text-xs text-dark-400 hover:text-white transition-colors"
              >
                {copiedCode === codeId ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    已复制
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    复制
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 bg-dark-950 border border-dark-700 rounded-b-lg overflow-x-auto">
              <code className="text-sm font-mono text-dark-300">{code.trim()}</code>
            </pre>
          </div>
        );
      } else if (line.startsWith('|')) {
        const tableLines = [line];
        i++;
        while (i < lines.length && lines[i].startsWith('|')) {
          tableLines.push(lines[i]);
          i++;
        }
        i--;

        if (tableLines.length >= 2) {
          const headers = tableLines[0].split('|').filter((h) => h.trim());
          const rows = tableLines.slice(2).map((row) =>
            row.split('|').filter((c) => c.trim())
          );

          elements.push(
            <div key={i} className="overflow-x-auto my-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-dark-700">
                    {headers.map((h, idx) => (
                      <th key={idx} className="text-left py-2 px-3 text-dark-300 font-medium">
                        {h.trim()}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, ridx) => (
                    <tr key={ridx} className="border-b border-dark-800">
                      {row.map((cell, cidx) => (
                        <td key={cidx} className="py-2 px-3 text-dark-400">
                          {cell.trim()}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
      } else if (line.trim()) {
        elements.push(
          <p key={i} className="text-dark-300 leading-relaxed mb-2">
            {line.split(/(`[^`]+`)/g).map((part, idx) => {
              if (part.startsWith('`') && part.endsWith('`')) {
                const code = part.slice(1, -1);
                return (
                  <code key={idx} className="px-1.5 py-0.5 bg-dark-800 rounded text-primary-300 text-sm font-mono">
                    {code}
                  </code>
                );
              }
              return <span key={idx}>{part}</span>;
            })}
          </p>
        );
      } else {
        elements.push(<div key={i} className="h-3" />);
      }

      i++;
    }

    return elements;
  };

  return (
    <div className="min-h-screen py-6 sm:py-8">
      <div className="container-wide section-padding">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <BookOpen className="w-5 h-5 text-primary-400" />
                <h2 className="text-base sm:text-lg font-bold text-white">开发文档</h2>
              </div>
              <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 -mx-2 px-2 lg:mx-0 lg:px-0">
                {docSections.map((section) => {
                  const Icon = section.icon;
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`flex items-center gap-2 sm:gap-3 px-3 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm transition-all text-left flex-shrink-0 lg:w-full ${
                        isActive
                          ? 'bg-primary-500/20 text-primary-300'
                          : 'text-dark-400 hover:text-white hover:bg-dark-800'
                      }`}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span className="whitespace-nowrap">{section.title}</span>
                      {isActive && <ChevronRight className="w-4 h-4 ml-auto hidden lg:block" />}
                    </button>
                  );
                })}
              </nav>

              <div className="hidden lg:block mt-8 p-4 rounded-xl bg-dark-900 border border-dark-700/50">
                <h3 className="text-sm font-medium text-white mb-2">需要帮助？</h3>
                <p className="text-dark-400 text-xs mb-3">
                  如果在集成过程中遇到问题，可以查看我们的示例代码或联系技术支持。
                </p>
                <Link
                  to="/chat"
                  className="flex items-center gap-2 text-sm text-primary-400 hover:text-primary-300"
                >
                  <MessageSquare className="w-4 h-4" />
                  在线体验
                </Link>
              </div>
            </div>
          </aside>

          {/* Content */}
          <main className="flex-1 min-w-0">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-dark-700/50">
                <activeDoc.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-400" />
                <h1 className="text-xl sm:text-2xl font-bold text-white">{activeDoc.title}</h1>
              </div>
              <div className="prose prose-invert max-w-none">
                {renderContent(activeDoc.content)}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
