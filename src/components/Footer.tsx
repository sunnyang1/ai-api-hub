import { Link } from 'react-router-dom';
import { Cpu, Globe, MessageCircle, Mail, ExternalLink } from 'lucide-react';

const footerLinks = {
  产品: [
    { label: '模型库', path: '/models' },
    { label: '在线对话', path: '/chat' },
    { label: '定价方案', path: '/pricing' },
    { label: 'API 文档', path: '/docs' },
  ],
  开发者: [
    { label: '快速开始', path: '/docs' },
    { label: 'API 参考', path: '/docs' },
    { label: 'SDK 下载', path: '/docs' },
    { label: '状态监控', path: '/' },
  ],
  公司: [
    { label: '关于我们', path: '/' },
    { label: '博客', path: '/' },
    { label: '加入我们', path: '/' },
    { label: '联系方式', path: '/' },
  ],
  法律: [
    { label: '服务条款', path: '/' },
    { label: '隐私政策', path: '/' },
    { label: '可接受使用政策', path: '/' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-dark-700/50 bg-dark-950">
      <div className="container-wide section-padding py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">AI Hub</span>
            </Link>
            <p className="text-dark-400 text-sm mb-6 max-w-xs">
              统一的 AI API 聚合平台，一个接口访问全球顶尖大模型，让 AI 开发更简单高效。
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-dark-800 hover:bg-dark-700 flex items-center justify-center text-dark-400 hover:text-white transition-all">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-dark-800 hover:bg-dark-700 flex items-center justify-center text-dark-400 hover:text-white transition-all">
                <ExternalLink className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-dark-800 hover:bg-dark-700 flex items-center justify-center text-dark-400 hover:text-white transition-all">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-dark-800 hover:bg-dark-700 flex items-center justify-center text-dark-400 hover:text-white transition-all">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold mb-4 text-sm">{category}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-dark-400 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-dark-700/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-dark-500 text-sm">
            &copy; 2026 AI Hub. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-dark-500 text-sm">Made with</span>
            <span className="text-primary-400">&#10084;</span>
            <span className="text-dark-500 text-sm">for developers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
