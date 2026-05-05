import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Zap,
  Shield,
  Globe,
  BarChart3,
  Code2,
  ChevronRight,
  Star,
  Sparkles,
  TrendingUp,
  MessageSquare,
  Layers,
  Cpu,
  Check,
} from 'lucide-react';
import { models, providers } from '../data/models';
import ScrollReveal from '../components/ScrollReveal';
import CountUp from '../components/CountUp';


const features = [
  {
    icon: Code2,
    title: '统一 API',
    description: '一个接口访问所有主流模型，兼容 OpenAI SDK，零成本迁移。',
  },
  {
    icon: Shield,
    title: '高可用性',
    description: '智能路由和故障自动切换，确保 99.9% 的服务可用性。',
  },
  {
    icon: BarChart3,
    title: '极致性价比',
    description: '边缘计算部署，批量议价，为您提供市场最优价格。',
  },
  {
    icon: Shield,
    title: '数据可控',
    description: '精细的数据策略控制，指定可信提供商，保障数据安全。',
  },
];

const steps = [
  {
    number: '01',
    title: '注册账号',
    description: '使用邮箱或社交账号快速注册，无需信用卡。',
  },
  {
    number: '02',
    title: '充值余额',
    description: '按需充值，无最低消费，余额永久有效。',
  },
  {
    number: '03',
    title: '获取 API Key',
    description: '创建 API Key，复制示例代码，即刻开始开发。',
  },
];

export default function Home() {
  const featuredModels = models.filter((m) => m.isRecommended).slice(0, 4);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-dark-950">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-[128px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900/20 via-dark-950 to-dark-950" />
        </div>

        <div className="relative container-wide section-padding py-16 sm:py-20 lg:py-24 text-center">
          <div
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-300 text-xs sm:text-sm mb-6 sm:mb-8 animate-fade-in-down"
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>已集成 {models.length}+ 个顶尖模型</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 tracking-tight animate-fade-in-up">
            一个 API
            <br />
            <span className="gradient-text">访问所有 AI 模型</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-dark-300 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2 sm:px-0 animate-fade-in-up delay-200">
            无需订阅多个平台，通过统一的接口访问 GPT-4、Claude、Gemini、Llama 等全球顶尖大模型，
            让 AI 开发更简单、更经济、更可靠。
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-fade-in-up delay-400">
            <Link to="/keys" className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto justify-center">
              免费获取 API Key
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/models" className="btn-secondary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto justify-center">
              浏览模型
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto animate-fade-in-up delay-600">
            {[
              { label: '月处理 Tokens', value: 70, suffix: 'T+', icon: Zap },
              { label: '全球用户', value: 500, suffix: '万+', icon: Globe },
              { label: '活跃提供商', value: 60, suffix: '+', icon: Layers },
              { label: '可用模型', value: 300, suffix: '+', icon: Cpu },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center p-3 sm:p-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary-500/10 text-primary-400 mb-2 sm:mb-3">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-dark-400 text-xs sm:text-sm">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Providers Marquee */}
      <section className="py-8 sm:py-12 border-y border-dark-700/50 bg-dark-900/50">
        <div className="container-wide section-padding">
          <p className="text-center text-dark-400 text-xs sm:text-sm mb-6 sm:mb-8">
            支持全球 {providers.length}+ 家顶级 AI 提供商
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 opacity-60">
            {providers.map((provider) => (
              <div
                key={provider.id}
                className="flex items-center gap-1.5 sm:gap-2 text-dark-300 hover:text-white transition-colors"
              >
                <img
                  src={provider.logo}
                  alt={provider.name}
                  className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <span className="font-medium text-xs sm:text-sm">{provider.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container-wide section-padding">
          <ScrollReveal className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              为什么选择 AI Hub
            </h2>
            <p className="text-dark-400 max-w-2xl mx-auto text-sm sm:text-base px-2 sm:px-0">
              我们致力于提供最优质的 AI API 聚合服务，让开发者专注于创造，而非基础设施。
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <ScrollReveal key={feature.title} delay={index * 0.1}>
                  <div className="p-4 sm:p-6 rounded-xl bg-dark-900 border border-dark-700/50 card-hover">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary-500/10 flex items-center justify-center text-primary-400 mb-3 sm:mb-4">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-dark-400 text-xs sm:text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Models */}
      <section className="py-16 sm:py-20 lg:py-24 bg-dark-900/30">
        <div className="container-wide section-padding">
          <ScrollReveal className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 sm:mb-12 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">推荐模型</h2>
              <p className="text-dark-400 text-sm sm:text-base">精选性能卓越的热门大语言模型</p>
            </div>
            <Link
              to="/models"
              className="flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors text-sm sm:text-base"
            >
              查看全部
              <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredModels.map((model, index) => (
              <ScrollReveal key={model.id} delay={index * 0.1}>
                <div className="p-4 sm:p-6 rounded-xl bg-dark-900 border border-dark-700/50 card-hover gradient-border">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={model.providerLogo}
                    alt={model.provider}
                    className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <div className="min-w-0">
                    <h3 className="font-semibold text-white text-sm sm:text-base truncate">{model.name}</h3>
                    <p className="text-dark-400 text-xs">{model.provider}</p>
                  </div>
                </div>
                <p className="text-dark-300 text-xs sm:text-sm mb-4 line-clamp-2">{model.description}</p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                  {model.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className={`px-2 py-1 rounded-md text-xs font-medium ${
                        tag === '推荐'
                          ? 'bg-primary-500/20 text-primary-300'
                          : 'bg-dark-800 text-dark-300'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-dark-400">
                    {(model.contextWindow / 1000).toFixed(0)}K 上下文
                  </span>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                    <span>{model.popularity}</span>
                  </div>
                </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container-wide section-padding">
          <ScrollReveal className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">三步开始使用</h2>
            <p className="text-dark-400 max-w-2xl mx-auto text-sm sm:text-base px-2 sm:px-0">
              极简的接入流程，从注册到调用 API 只需几分钟
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <ScrollReveal key={step.number} delay={index * 0.2}>
                <div className="relative text-center">
                  {index < steps.length - 1 && (
                    <div className="hidden sm:block absolute top-10 sm:top-12 left-[60%] w-full h-px bg-gradient-to-r from-primary-500/50 to-transparent" />
                  )}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg shadow-primary-500/20">
                    <span className="text-2xl sm:text-3xl font-bold text-white">{step.number}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">{step.title}</h3>
                  <p className="text-dark-400 text-sm sm:text-base">{step.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-10 sm:mt-16 text-center">
            <Link to="/keys" className="btn-primary inline-flex">
              立即开始
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="py-16 sm:py-20 lg:py-24 bg-dark-900/30">
        <div className="container-wide section-padding">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <ScrollReveal direction="left">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                  一行代码，即刻调用
                </h2>
                <p className="text-dark-400 mb-6 sm:mb-8 text-sm sm:text-base">
                  兼容 OpenAI SDK，无需修改现有代码，只需更换 base URL 和 API Key。
                </p>
                <ul className="space-y-3 sm:space-y-4">
                  {[
                    '支持 Python、Node.js、Go、Rust 等主流语言',
                    '提供详细的 SDK 和示例代码',
                    'RESTful API 设计，简单易用',
                    '自动重试和错误处理',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-dark-300 text-sm sm:text-base">
                      <div className="w-5 h-5 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-primary-400" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 sm:mt-8">
                  <Link to="/docs" className="btn-primary">
                    查看文档
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="rounded-xl bg-dark-950 border border-dark-700/50 overflow-hidden">
                <div className="flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 border-b border-dark-700/50 bg-dark-900/50">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 text-dark-500 text-xs sm:text-sm">example.py</span>
                </div>
                <div className="p-4 sm:p-6 overflow-x-auto">
                  <pre className="text-xs sm:text-sm font-mono leading-relaxed">
                    <code
                      className="text-dark-300"
                      dangerouslySetInnerHTML={{
                        __html: `<span style="color:#c084fc">from</span> openai <span style="color:#c084fc">import</span> OpenAI\n\nclient = OpenAI(\n  base_url=<span style="color:#4ade80">"https://api.aihub.com/v1"</span>,\n  api_key=<span style="color:#4ade80">"your-api-key"</span>\n)\n\nresponse = client.chat.completions.create(\n  model=<span style="color:#4ade80">"gpt-4o"</span>,\n  messages=[\n    {<span style="color:#4ade80">"role"</span>: <span style="color:#4ade80">"user"</span>,\n     <span style="color:#4ade80">"content"</span>: <span style="color:#4ade80">"你好！"</span>}\n  ]\n)\n\n<span style="color:#c084fc">print</span>(response.choices[0].message.content)`,
                      }}
                    />
                  </pre>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container-wide section-padding">
          <ScrollReveal direction="scale">
            <div className="relative rounded-2xl bg-gradient-to-br from-primary-600/20 via-primary-900/20 to-dark-900 border border-primary-500/20 p-8 sm:p-12 lg:p-16 text-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-500/10 via-transparent to-transparent" />
              <div className="relative">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                  准备好开始了吗？
                </h2>
                <p className="text-dark-300 max-w-xl mx-auto mb-6 sm:mb-8 text-sm sm:text-base px-2 sm:px-0">
                  立即注册，获取免费 API 额度，体验全球顶尖 AI 模型的强大能力。
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                  <Link to="/keys" className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto justify-center">
                    <TrendingUp className="w-5 h-5" />
                    免费开始
                  </Link>
                  <Link to="/chat" className="btn-secondary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto justify-center">
                    <MessageSquare className="w-5 h-5" />
                    在线体验
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
