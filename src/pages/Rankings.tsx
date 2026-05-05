import { useState, useMemo } from 'react';
import {
  Trophy,
  Star,
  Flame,
  DollarSign,
  Cpu,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from 'lucide-react';
import { models } from '../data/models';

type RankingType = 'popularity' | 'price' | 'performance' | 'context';

interface RankingItem {
  rank: number;
  change: number;
  model: (typeof models)[0];
}

export default function Rankings() {
  const [activeTab, setActiveTab] = useState<RankingType>('popularity');

  const tabs = [
    { id: 'popularity' as RankingType, label: '热度排行', icon: Flame },
    { id: 'price' as RankingType, label: '价格排行', icon: DollarSign },
    { id: 'performance' as RankingType, label: '性能排行', icon: Award },
    { id: 'context' as RankingType, label: '上下文排行', icon: Cpu },
  ];

  const rankings = useMemo(() => {
    let sorted: RankingItem[] = [];

    switch (activeTab) {
      case 'popularity':
        sorted = [...models]
          .sort((a, b) => b.popularity - a.popularity)
          .map((model, index) => ({
            rank: index + 1,
            change: Math.floor(Math.random() * 7) - 3,
            model,
          }));
        break;
      case 'price':
        sorted = [...models]
          .sort((a, b) => a.inputPrice - b.inputPrice)
          .map((model, index) => ({
            rank: index + 1,
            change: Math.floor(Math.random() * 5) - 2,
            model,
          }));
        break;
      case 'performance':
        sorted = [...models]
          .sort((a, b) => b.popularity * 0.6 + b.contextWindow / 100000 * 0.4 - (a.popularity * 0.6 + a.contextWindow / 100000 * 0.4))
          .map((model, index) => ({
            rank: index + 1,
            change: Math.floor(Math.random() * 5) - 2,
            model,
          }));
        break;
      case 'context':
        sorted = [...models]
          .sort((a, b) => b.contextWindow - a.contextWindow)
          .map((model, index) => ({
            rank: index + 1,
            change: Math.floor(Math.random() * 5) - 2,
            model,
          }));
        break;
    }

    return sorted;
  }, [activeTab]);

  const getRankStyle = (rank: number) => {
    if (rank === 1) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    if (rank === 2) return 'bg-gray-400/20 text-gray-300 border-gray-400/30';
    if (rank === 3) return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
    return 'bg-dark-800 text-dark-400 border-dark-700';
  };

  const getTrendIcon = (change: number) => {
    if (change > 0) return <ArrowUpRight className="w-4 h-4 text-green-400" />;
    if (change < 0) return <ArrowDownRight className="w-4 h-4 text-red-400" />;
    return <Minus className="w-4 h-4 text-dark-500" />;
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container-wide section-padding">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-400" />
            排行榜
          </h1>
          <p className="text-dark-400">
            从多个维度了解当前最受欢迎、最具性价比的 AI 模型
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-3 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20'
                    : 'bg-dark-900 border border-dark-700/50 text-dark-400 hover:text-white hover:border-dark-600'
                }`}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-8 sm:mb-10 max-w-3xl mx-auto">
          {rankings.slice(0, 3).map((item) => (
            <div
              key={item.model.id}
              className={`relative text-center p-3 sm:p-6 rounded-lg sm:rounded-xl border ${
                item.rank === 1
                  ? 'bg-yellow-500/5 border-yellow-500/20'
                  : item.rank === 2
                  ? 'bg-gray-400/5 border-gray-400/20 mt-2 sm:mt-4'
                  : 'bg-orange-500/5 border-orange-500/20 mt-4 sm:mt-8'
              }`}
            >
              <div
                className={`w-7 h-7 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center mx-auto mb-2 sm:mb-3 font-bold text-sm sm:text-lg ${getRankStyle(
                  item.rank
                )}`}
              >
                {item.rank}
              </div>
              <img
                src={item.model.providerLogo}
                alt={item.model.provider}
                className="w-6 h-6 sm:w-8 sm:h-8 object-contain mx-auto mb-1.5 sm:mb-2"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <h3 className="font-semibold text-white text-xs sm:text-sm mb-0.5 sm:mb-1 truncate px-1">{item.model.name}</h3>
              <p className="text-dark-400 text-[10px] sm:text-xs mb-2 sm:mb-3 truncate px-1">{item.model.provider}</p>
              <div className="flex items-center justify-center gap-1">
                {getTrendIcon(item.change)}
                <span
                  className={`text-[10px] sm:text-xs font-medium ${
                    item.change > 0
                      ? 'text-green-400'
                      : item.change < 0
                      ? 'text-red-400'
                      : 'text-dark-500'
                  }`}
                >
                  {item.change > 0 ? '+' : ''}
                  {item.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Full Ranking List */}
        <div className="space-y-2 sm:space-y-3">
          {rankings.map((item) => (
            <div
              key={item.model.id}
              className={`flex items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-xl border transition-all hover:border-primary-500/30 ${
                item.rank <= 3
                  ? 'bg-dark-900/80 border-dark-700/50'
                  : 'bg-dark-900 border-dark-700/30'
              }`}
            >
              {/* Rank */}
              <div
                className={`w-7 h-7 sm:w-10 sm:h-10 rounded-lg border flex items-center justify-center font-bold text-xs sm:text-sm flex-shrink-0 ${getRankStyle(
                  item.rank
                )}`}
              >
                {item.rank}
              </div>

              {/* Model Info */}
              <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                <img
                  src={item.model.providerLogo}
                  alt={item.model.provider}
                  className="w-6 h-6 sm:w-8 sm:h-8 object-contain flex-shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <h3 className="font-semibold text-white text-xs sm:text-sm">{item.model.name}</h3>
                    {item.model.isRecommended && (
                      <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-yellow-400 fill-current flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-dark-400 text-[10px] sm:text-xs">{item.model.provider}</p>
                </div>
              </div>

              {/* Metrics */}
              <div className="hidden sm:flex items-center gap-6 text-sm">
                {activeTab === 'popularity' && (
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-orange-400" />
                    <span className="text-white font-medium">{item.model.popularity}</span>
                    <span className="text-dark-500 text-xs">热度</span>
                  </div>
                )}
                {activeTab === 'price' && (
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-400" />
                    <span className="text-white font-medium">${item.model.inputPrice}</span>
                    <span className="text-dark-500 text-xs">/M tokens</span>
                  </div>
                )}
                {activeTab === 'performance' && (
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-primary-400" />
                    <span className="text-white font-medium">{item.model.popularity}</span>
                    <span className="text-dark-500 text-xs">综合分</span>
                  </div>
                )}
                {activeTab === 'context' && (
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-blue-400" />
                    <span className="text-white font-medium">
                      {item.model.contextWindow >= 1000000
                        ? `${(item.model.contextWindow / 1000000).toFixed(0)}M`
                        : `${(item.model.contextWindow / 1000).toFixed(0)}K`}
                    </span>
                    <span className="text-dark-500 text-xs">上下文</span>
                  </div>
                )}
              </div>

              {/* Mobile Metric */}
              <div className="sm:hidden flex items-center gap-1 text-xs">
                {activeTab === 'popularity' && (
                  <span className="text-white font-medium">{item.model.popularity}</span>
                )}
                {activeTab === 'price' && (
                  <span className="text-white font-medium">${item.model.inputPrice}</span>
                )}
                {activeTab === 'performance' && (
                  <span className="text-white font-medium">{item.model.popularity}</span>
                )}
                {activeTab === 'context' && (
                  <span className="text-white font-medium">
                    {item.model.contextWindow >= 1000000
                      ? `${(item.model.contextWindow / 1000000).toFixed(0)}M`
                      : `${(item.model.contextWindow / 1000).toFixed(0)}K`}
                  </span>
                )}
              </div>

              {/* Trend */}
              <div className="flex items-center gap-1 w-12 sm:w-16 justify-end">
                {getTrendIcon(item.change)}
                <span
                  className={`text-xs sm:text-sm font-medium ${
                    item.change > 0
                      ? 'text-green-400'
                      : item.change < 0
                      ? 'text-red-400'
                      : 'text-dark-500'
                  }`}
                >
                  {item.change > 0 ? '+' : ''}
                  {item.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Last Updated */}
        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-dark-500 text-xs sm:text-sm">
            数据每小时更新一次 · 上次更新：{new Date().toLocaleString('zh-CN')}
          </p>
        </div>
      </div>
    </div>
  );
}
