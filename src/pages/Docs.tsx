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
} from 'lucide-react';

const docSections = [
  {
    id: 'quickstart',
    title: '快速开始',
    icon: Zap,
    content: `
## 快速开始

### 1. 获取 API Key

1. 注册并登录 AI Hub 账号
2. 前往 [API 密钥](/keys) 页面
3. 点击"创建新密钥"按钮
4. 复制生成的 API Key（注意：密钥只显示一次）

### 2. 安装 SDK

\`\`\`bash
# Python
pip install openai

# Node.js
npm install openai

# Go
go get github.com/sashabaranov/go-openai
\`\`\`

### 3. 发起第一个请求

\`\`\`python
from openai import OpenAI

client = OpenAI(
    base_url="https://api.aihub.com/v1",
    api_key="your-api-key"
)

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "user", "content": "你好！"}
    ]
)

print(response.choices[0].message.content)
\`\`\`
    `.trim(),
  },
  {
    id: 'models',
    title: '模型列表',
    icon: Globe,
    content: `
## 支持的模型

AI Hub 支持以下模型，你可以通过统一的接口访问它们：

| 模型 | 提供商 | 上下文窗口 | 输入价格 | 输出价格 |
|------|--------|-----------|---------|---------|
| gpt-4o | OpenAI | 128K | $2.5/M | $10/M |
| gpt-4o-mini | OpenAI | 128K | $0.15/M | $0.6/M |
| claude-3-5-sonnet | Anthropic | 200K | $3/M | $15/M |
| gemini-1-5-pro | Google | 2M | $3.5/M | $10.5/M |
| deepseek-chat | DeepSeek | 64K | $0.5/M | $1/M |
| llama-3-1-405b | Meta | 128K | $1.5/M | $2/M |

更多模型请查看 [模型库](/models)。
    `.trim(),
  },
  {
    id: 'authentication',
    title: '认证',
    icon: Key,
    content: `
## 认证方式

AI Hub 使用 API Key 进行认证。所有请求都需要在 HTTP Header 中包含认证信息。

### HTTP Header

\`\`\`
Authorization: Bearer your-api-key
\`\`\`

### 示例

\`\`\`bash
curl https://api.aihub.com/v1/models \\
  -H "Authorization: Bearer your-api-key"
\`\`\`

### 安全建议

- 不要将 API Key 硬编码在代码中
- 使用环境变量存储 API Key
- 定期轮换 API Key
- 为不同的应用创建不同的 API Key
- 设置合适的用量限制
    `.trim(),
  },
  {
    id: 'chat',
    title: '对话 API',
    icon: MessageSquare,
    content: `
## 对话 completions

创建对话 completion 是最常用的 API。

### 请求示例

\`\`\`bash
curl https://api.aihub.com/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer your-api-key" \\
  -d '{
    "model": "gpt-4o",
    "messages": [
      {"role": "system", "content": "你是一个有帮助的助手。"},
      {"role": "user", "content": "你好！"}
    ],
    "temperature": 0.7,
    "max_tokens": 1000,
    "stream": false
  }'
\`\`\`

### 请求参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| model | string | 是 | 模型 ID |
| messages | array | 是 | 消息列表 |
| temperature | float | 否 | 随机性 (0-2) |
| max_tokens | int | 否 | 最大 token 数 |
| stream | boolean | 否 | 是否流式输出 |
| top_p | float | 否 | 核采样概率 |

### 流式输出

设置 \`stream: true\` 可以获取流式响应：

\`\`\`python
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "讲个故事"}],
    stream=True
)

for chunk in response:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="")
\`\`\`
    `.trim(),
  },
  {
    id: 'streaming',
    title: '流式输出',
    icon: Terminal,
    content: `
## 流式输出 (Streaming)

流式输出允许你在生成内容的同时接收响应，提供更好的用户体验。

### JavaScript 示例

\`\`\`javascript
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
      if (data === '[DONE]') return;
      
      const json = JSON.parse(data);
      const content = json.choices[0]?.delta?.content;
      if (content) {
        process.stdout.write(content);
      }
    }
  }
}
\`\`\`
    `.trim(),
  },
  {
    id: 'errors',
    title: '错误处理',
    icon: Shield,
    content: `
## 错误处理

AI Hub 使用标准的 HTTP 状态码和 JSON 错误响应。

### HTTP 状态码

| 状态码 | 说明 |
|--------|------|
| 200 | 请求成功 |
| 400 | 请求参数错误 |
| 401 | 认证失败 |
| 403 | 权限不足 |
| 429 | 请求过于频繁 |
| 500 | 服务器错误 |
| 503 | 服务暂时不可用 |

### 错误响应格式

\`\`\`json
{
  "error": {
    "message": "Invalid API key",
    "type": "authentication_error",
    "code": "invalid_api_key"
  }
}
\`\`\`

### 重试策略

建议实现指数退避重试策略：

\`\`\`python
import time
from openai import OpenAI

client = OpenAI(base_url="https://api.aihub.com/v1", api_key="your-key")

def chat_with_retry(messages, max_retries=3):
    for attempt in range(max_retries):
        try:
            return client.chat.completions.create(
                model="gpt-4o",
                messages=messages
            )
        except Exception as e:
            if attempt == max_retries - 1:
                raise
            time.sleep(2 ** attempt)
\`\`\`
    `.trim(),
  },
];

export default function Docs() {
  const [activeSection, setActiveSection] = useState('quickstart');
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
        // Table handling - simplified
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
            {line.replace(/\`(.+?)\`/g, (_, code) => `
              <code class="px-1.5 py-0.5 bg-dark-800 rounded text-primary-300 text-sm">${code}</code>
            `)}
          </p>
        );
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
              {/* Mobile horizontal scroll nav */}
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
