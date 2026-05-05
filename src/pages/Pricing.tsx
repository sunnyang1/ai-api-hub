import { Link } from 'react-router-dom';
import { Check, Zap, Crown, Building2, HelpCircle } from 'lucide-react';
import { pricingTiers } from '../data/pricing';

export default function Pricing() {
  return (
    <div className="min-h-screen py-8">
      <div className="container-wide section-padding">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">定价方案</h1>
          <p className="text-dark-400 max-w-2xl mx-auto">
            灵活的定价方案，满足不同规模的需求。按需付费，无隐藏费用，余额永久有效。
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto mb-12 sm:mb-20">
          {pricingTiers.map((tier) => (
            <div
              key={tier.id}
              className={`relative rounded-2xl p-5 sm:p-8 ${
                tier.highlighted
                  ? 'bg-gradient-to-b from-primary-600/20 to-dark-900 border-2 border-primary-500/50'
                  : 'bg-dark-900 border border-dark-700/50'
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2">
                  <div className="px-3 sm:px-4 py-1 bg-primary-600 rounded-full text-white text-xs sm:text-sm font-medium flex items-center gap-1.5">
                    <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    最受欢迎
                  </div>
                </div>
              )}

              <div className="mb-4 sm:mb-6">
                <div className="flex items-center gap-2 mb-2">
                  {tier.id === 'free' && <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-dark-400" />}
                  {tier.id === 'pro' && <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-primary-400" />}
                  {tier.id === 'enterprise' && <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />}
                  <h3 className="text-lg sm:text-xl font-bold text-white">{tier.name}</h3>
                </div>
                <p className="text-dark-400 text-xs sm:text-sm">{tier.description}</p>
              </div>

              <div className="mb-6 sm:mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-bold text-white">
                    {tier.price === 0 ? '免费' : `$${tier.price}`}
                  </span>
                  {tier.price > 0 && (
                    <span className="text-dark-400 text-sm">/{tier.priceUnit}</span>
                  )}
                </div>
              </div>

              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary-400" />
                    </div>
                    <span className="text-dark-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to={tier.id === 'enterprise' ? '/' : '/keys'}
                className={`w-full flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium transition-all text-sm ${
                  tier.highlighted
                    ? 'bg-primary-600 hover:bg-primary-500 text-white'
                    : 'bg-dark-800 hover:bg-dark-700 text-white border border-dark-700'
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-white text-center mb-6 sm:mb-8">常见问题</h2>
          <div className="space-y-3 sm:space-y-4">
            {[
              {
                q: '免费额度用完后怎么办？',
                a: '免费额度用完后，你可以随时升级到付费方案，或者按需充值。余额永久有效，没有过期时间。',
              },
              {
                q: '如何计算 Token 用量？',
                a: 'Token 用量按照输入和输出分别计算。1 个 token 约等于 0.75 个英文单词或 0.5 个汉字。你可以在控制台查看详细的用量统计。',
              },
              {
                q: '可以切换方案吗？',
                a: '当然可以！你可以随时升级或降级方案。升级后立即生效，降级在下一个计费周期生效。',
              },
              {
                q: '企业版有什么特殊服务？',
                a: '企业版提供专属客户经理、SLA 保障、自定义部署、SSO 单点登录、审计日志等企业级服务。请联系我们的销售团队了解详情。',
              },
              {
                q: '是否支持退款？',
                a: '未使用的充值余额可以申请退款。已消费的额度不予退款。如有特殊情况，请联系客服。',
              },
            ].map((faq) => (
              <div
                key={faq.q}
                className="p-4 sm:p-6 rounded-xl bg-dark-900 border border-dark-700/50"
              >
                <div className="flex items-start gap-2.5 sm:gap-3">
                  <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-white mb-1.5 sm:mb-2 text-sm sm:text-base">{faq.q}</h3>
                    <p className="text-dark-400 text-xs sm:text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
