import { useState, useRef, useEffect } from 'react';
import {
  Send,
  Bot,
  User,
  Loader2,
  ChevronDown,
  Plus,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { models } from '../data/models';
import type { ChatMessage } from '../types';

const demoResponses: Record<string, string> = {
  '你好': '你好！我是 AI Hub 的演示助手。在这个演示环境中，我可以模拟不同 AI 模型的回复风格。有什么我可以帮助你的吗？',
  'hello': 'Hello! I\'m the AI Hub demo assistant. In this demo environment, I can simulate responses from different AI models. How can I help you today?',
  '你是谁': '我是 AI Hub 聚合平台的演示助手。我可以模拟 GPT-4、Claude、Gemini 等不同模型的回复风格。实际上，真实环境中你会连接到对应的模型提供商。',
  '介绍一下AI Hub': 'AI Hub 是一个统一的 AI API 聚合平台，让你通过一个接口访问 GPT-4、Claude、Gemini、Llama 等全球顶尖大模型。主要特点包括：\n\n1. **统一 API**：兼容 OpenAI SDK，零成本迁移\n2. **高可用性**：智能路由和故障自动切换\n3. **极致性价比**：批量议价，最优价格\n4. **数据可控**：精细的数据策略控制\n\n你可以免费注册并获取 API Key 开始体验。',
  '推荐一个模型': '根据你的需求，我推荐以下几个模型：\n\n**通用任务**：GPT-4o、Claude 3.5 Sonnet\n**中文场景**：DeepSeek-V3、Qwen2-72B\n**代码任务**：Claude 3.5 Sonnet、DeepSeek-Coder\n**超长上下文**：Gemini 1.5 Pro（200万上下文）\n**高性价比**：GPT-4o Mini、Gemini 1.5 Flash\n\n你可以在模型库页面查看详细信息并进行比较。',
  'pricing': 'AI Hub 提供灵活的定价方案：\n\n- **免费版**：每月 100K tokens，适合个人学习\n- **专业版**：$29/月，5M tokens，适合专业开发\n- **企业版**：$199/月，无限额度，适合大型团队\n\n所有方案都按实际使用量计费，无最低消费，余额永久有效。',
};

const defaultModel = models.find((m) => m.id === 'gpt-4o') || models[0];

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `欢迎使用 AI Hub 在线对话！\n\n当前演示模式：${defaultModel.name}\n\n你可以问我任何问题，或者尝试以下话题：\n• 介绍一下 AI Hub\n• 推荐一个模型\n• pricing\n• 你是谁`,
      timestamp: new Date(),
      model: defaultModel.id,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModelId, setSelectedModelId] = useState(defaultModel.id);
  const [showModelSelect, setShowModelSelect] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const selectedModel = models.find((m) => m.id === selectedModelId) || defaultModel;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const query = input.trim().toLowerCase();
      let response = '';

      // Try to match demo responses
      for (const [key, value] of Object.entries(demoResponses)) {
        if (query.includes(key.toLowerCase())) {
          response = value;
          break;
        }
      }

      if (!response) {
        response = `这是一个演示回复。在实际环境中，你的消息会发送到 ${selectedModel.name} 模型。\n\n你问的是："${input.trim()}"\n\n你可以尝试问："介绍一下AI Hub"、"推荐一个模型"、"pricing" 等。`;
      }

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        model: selectedModelId,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome-new',
        role: 'assistant',
        content: `新的对话已开始！\n\n当前模型：${selectedModel.name}\n\n有什么我可以帮你的吗？`,
        timestamp: new Date(),
        model: selectedModelId,
      },
    ]);
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      {/* Sidebar */}
      <div className="hidden lg:flex w-72 flex-col border-r border-dark-700/50 bg-dark-900/50">
        <div className="p-4">
          <button
            onClick={clearChat}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-dark-800 hover:bg-dark-700 text-white rounded-lg transition-colors border border-dark-700"
          >
            <Plus className="w-4 h-4" />
            新建对话
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4">
          <div className="text-xs text-dark-500 font-medium uppercase tracking-wider mb-3 px-2">
            今天
          </div>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary-500/10 text-primary-300 text-left text-sm">
            <MessageSquare className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">新对话</span>
          </button>
        </div>

        <div className="p-4 border-t border-dark-700/50">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-sm text-white">开发者</div>
              <div className="text-xs text-dark-400">免费版</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-dark-950">
        {/* Chat Header */}
        <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 border-b border-dark-700/50">
          <div className="relative">
            <button
              onClick={() => setShowModelSelect(!showModelSelect)}
              className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-dark-800 hover:bg-dark-700 text-white text-sm transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-400" />
              <span className="text-xs sm:text-sm">{selectedModel.name}</span>
              <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-dark-400" />
            </button>

            {showModelSelect && (
              <div className="absolute top-full left-0 mt-1 w-64 sm:w-72 bg-dark-900 border border-dark-700 rounded-xl shadow-xl z-50 overflow-hidden">
                <div className="p-2 max-h-72 sm:max-h-80 overflow-y-auto">
                  {models.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => {
                        setSelectedModelId(model.id);
                        setShowModelSelect(false);
                      }}
                      className={`w-full flex items-center gap-2 sm:gap-3 px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-lg text-left transition-colors ${
                        model.id === selectedModelId
                          ? 'bg-primary-500/20 text-primary-300'
                          : 'hover:bg-dark-800 text-dark-300'
                      }`}
                    >
                      <img
                        src={model.providerLogo}
                        alt={model.provider}
                        className="w-5 h-5 sm:w-6 sm:h-6 object-contain flex-shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-medium truncate">{model.name}</div>
                        <div className="text-[10px] sm:text-xs text-dark-500">{model.provider}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={clearChat}
            className="lg:hidden p-2 text-dark-400 hover:text-white"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-4 sm:py-6">
          <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2.5 sm:gap-4 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary-600 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-4 sm:px-5 py-2.5 sm:py-3 ${
                    message.role === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-dark-900 border border-dark-700/50 text-dark-100'
                  }`}
                >
                  <div className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </div>
                  {message.model && message.role === 'assistant' && (
                    <div className="mt-2 text-[10px] sm:text-xs text-dark-500">
                      {models.find((m) => m.id === message.model)?.name || message.model}
                    </div>
                  )}
                </div>

                {message.role === 'user' && (
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-dark-700 flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-dark-300" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 sm:gap-4">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary-600 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                </div>
                <div className="bg-dark-900 border border-dark-700/50 rounded-2xl px-4 sm:px-5 py-2.5 sm:py-3">
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary-400 animate-spin" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-dark-700/50 px-3 sm:px-4 py-3 sm:py-4 safe-bottom">
          <div className="max-w-3xl mx-auto">
            <div className="relative flex items-end gap-2 bg-dark-900 border border-dark-700 rounded-xl p-2.5 sm:p-3">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="输入消息..."
                rows={1}
                className="flex-1 bg-transparent text-white placeholder-dark-500 resize-none focus:outline-none text-sm max-h-32"
                style={{ minHeight: '24px' }}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="p-2 rounded-lg bg-primary-600 hover:bg-primary-500 disabled:bg-dark-700 disabled:text-dark-500 text-white transition-colors flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-center text-dark-600 text-[10px] sm:text-xs mt-2">
              AI Hub 演示环境 - 实际调用请使用 API Key
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
