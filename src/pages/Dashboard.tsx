import { useState, useMemo } from 'react';
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Activity,
  Zap,
  Clock,
  CheckCircle,
  Cpu,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
} from 'lucide-react';
import { dailyUsageData, modelUsageData, hourlyUsageData, weeklyStats } from '../data/usage';
import ScrollReveal from '../components/ScrollReveal';

function SimpleBarChart({ data, color = '#a855f7' }: { data: { label: string; value: number }[]; color?: string }) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="flex items-end gap-2 h-48">
      {data.map((item, i) => {
        const height = (item.value / max) * 100;
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
            <div className="relative w-full">
              <div
                className="w-full rounded-t-md transition-all duration-500 group-hover:opacity-80"
                style={{ height: `${height}%`, backgroundColor: color, minHeight: '4px' }}
              />
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-dark-300 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-dark-800 px-2 py-0.5 rounded">
                {item.value.toLocaleString()}
              </div>
            </div>
            <span className="text-xs text-dark-500">{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function SimpleLineChart({ data, color = '#a855f7' }: { data: { label: string; value: number }[]; color?: string }) {
  const max = Math.max(...data.map((d) => d.value));
  const min = Math.min(...data.map((d) => d.value));
  const range = max - min || 1;
  const points = data
    .map((item, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - ((item.value - min) / range) * 80 - 10;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="relative h-48">
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((y) => (
          <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
        ))}
        {/* Area fill */}
        <polygon
          points={`0,100 ${points} 100,100`}
          fill={color}
          fillOpacity="0.1"
        />
        {/* Line */}
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Dots */}
        {data.map((item, i) => {
          const x = (i / (data.length - 1)) * 100;
          const y = 100 - ((item.value - min) / range) * 80 - 10;
          return (
            <circle key={i} cx={x} cy={y} r="1.5" fill={color} />
          );
        })}
      </svg>
      <div className="flex justify-between mt-2">
        {data.map((item, i) => (
          <span key={i} className="text-xs text-dark-500">
            {i % 2 === 0 ? item.label : ''}
          </span>
        ))}
      </div>
    </div>
  );
}

function DonutChart({ data }: { data: { label: string; value: number; color: string }[] }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  let currentAngle = 0;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
      <svg viewBox="0 0 100 100" className="w-32 h-32 sm:w-40 sm:h-40 -rotate-90 flex-shrink-0">
        {data.map((item, i) => {
          const angle = (item.value / total) * 360;
          const startAngle = currentAngle;
          currentAngle += angle;
          const endAngle = currentAngle;

          const startRad = (startAngle * Math.PI) / 180;
          const endRad = (endAngle * Math.PI) / 180;

          const x1 = 50 + 35 * Math.cos(startRad);
          const y1 = 50 + 35 * Math.sin(startRad);
          const x2 = 50 + 35 * Math.cos(endRad);
          const y2 = 50 + 35 * Math.sin(endRad);

          const largeArc = angle > 180 ? 1 : 0;

          return (
            <path
              key={i}
              d={`M 50 50 L ${x1} ${y1} A 35 35 0 ${largeArc} 1 ${x2} ${y2} Z`}
              fill={item.color}
              stroke="#0f0f12"
              strokeWidth="2"
            />
          );
        })}
        <circle cx="50" cy="50" r="20" fill="#0f0f12" />
      </svg>
      <div className="space-y-2 w-full sm:w-auto">
        {data.map((item, i) => (
          <div key={i} className="flex items-center justify-between sm:justify-start gap-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: item.color }} />
              <span className="text-xs sm:text-sm text-dark-300">{item.label}</span>
            </div>
            <span className="text-xs sm:text-sm text-white font-medium ml-auto sm:ml-2">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');

  const chartData = useMemo(
    () =>
      dailyUsageData.map((d) => ({
        label: d.date,
        value: d.tokens,
      })),
    []
  );

  const costData = useMemo(
    () =>
      dailyUsageData.map((d) => ({
        label: d.date,
        value: d.cost,
      })),
    []
  );

  const donutData = modelUsageData.slice(0, 5).map((m, i) => ({
    label: m.modelName,
    value: m.percentage,
    color: ['#a855f7', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'][i],
  }));

  const stats = [
    {
      label: '总 Token 用量',
      value: `${(weeklyStats.totalTokens / 1000000).toFixed(1)}M`,
      change: '+12.5%',
      icon: Zap,
      trend: 'up',
    },
    {
      label: '总消费',
      value: `$${weeklyStats.totalCost.toFixed(1)}`,
      change: '+8.3%',
      icon: DollarSign,
      trend: 'up',
    },
    {
      label: 'API 调用次数',
      value: `${(weeklyStats.totalRequests / 1000).toFixed(0)}K`,
      change: '-2.1%',
      icon: Activity,
      trend: 'down',
    },
    {
      label: '平均延迟',
      value: `${weeklyStats.avgLatency}ms`,
      change: '-15ms',
      icon: Clock,
      trend: 'up',
    },
    {
      label: '成功率',
      value: `${weeklyStats.successRate}%`,
      change: '+0.2%',
      icon: CheckCircle,
      trend: 'up',
    },
    {
      label: '活跃模型',
      value: `${weeklyStats.activeModels}`,
      change: '+1',
      icon: Cpu,
      trend: 'up',
    },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container-wide section-padding">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-primary-400" />
              用量仪表盘
            </h1>
            <p className="text-dark-400">实时监控你的 API 使用情况和消费数据</p>
          </div>
          <div className="flex items-center gap-2 bg-dark-900 border border-dark-700 rounded-lg p-1">
            {(['7d', '30d', '90d'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  timeRange === range
                    ? 'bg-primary-600 text-white'
                    : 'text-dark-400 hover:text-white'
                }`}
              >
                {range === '7d' ? '近7天' : range === '30d' ? '近30天' : '近90天'}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <ScrollReveal key={stat.label} delay={index * 0.05}>
                <div className="p-4 sm:p-5 rounded-xl bg-dark-900 border border-dark-700/50">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary-500/10 flex items-center justify-center">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary-400" />
                    </div>
                    <div
                      className={`flex items-center gap-1 text-[10px] sm:text-xs font-medium ${
                        stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                      }`}
                    >
                      {stat.trend === 'up' ? (
                        <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      )}
                      {stat.change}
                    </div>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-dark-400">{stat.label}</div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Charts Row 1 */}
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
          {/* Token Usage Chart */}
          <ScrollReveal>
            <div className="p-4 sm:p-6 rounded-xl bg-dark-900 border border-dark-700/50">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-white">Token 用量趋势</h3>
                  <p className="text-xs sm:text-sm text-dark-400">每日 token 消耗量</p>
                </div>
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-primary-400" />
              </div>
              <SimpleBarChart data={chartData} color="#a855f7" />
            </div>
          </ScrollReveal>

          {/* Cost Chart */}
          <ScrollReveal delay={0.1}>
            <div className="p-4 sm:p-6 rounded-xl bg-dark-900 border border-dark-700/50">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-white">消费趋势</h3>
                  <p className="text-xs sm:text-sm text-dark-400">每日 API 调用成本（USD）</p>
                </div>
                <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
              </div>
              <SimpleLineChart data={costData} color="#10b981" />
            </div>
          </ScrollReveal>
        </div>

        {/* Charts Row 2 */}
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
          {/* Model Distribution */}
          <ScrollReveal>
            <div className="p-4 sm:p-6 rounded-xl bg-dark-900 border border-dark-700/50">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-white">模型使用分布</h3>
                  <p className="text-xs sm:text-sm text-dark-400">各模型 token 用量占比</p>
                </div>
                <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
              </div>
              <DonutChart data={donutData} />
            </div>
          </ScrollReveal>

          {/* Hourly Usage */}
          <ScrollReveal delay={0.1}>
            <div className="p-4 sm:p-6 rounded-xl bg-dark-900 border border-dark-700/50">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-white">24小时调用分布</h3>
                  <p className="text-xs sm:text-sm text-dark-400">各时段 API 请求量</p>
                </div>
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
              </div>
              <SimpleBarChart
                data={hourlyUsageData.map((d) => ({ label: d.hour, value: d.requests }))}
                color="#f59e0b"
              />
            </div>
          </ScrollReveal>
        </div>

        {/* Model Usage Table */}
        <ScrollReveal>
          <div className="p-4 sm:p-6 rounded-xl bg-dark-900 border border-dark-700/50">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-white">模型使用详情</h3>
                <p className="text-xs sm:text-sm text-dark-400">各模型的详细用量统计</p>
              </div>
            </div>
            <div className="overflow-x-auto -mx-2 sm:-mx-0">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-dark-700">
                    <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-dark-400 font-medium text-xs sm:text-sm">模型</th>
                    <th className="text-right py-2 sm:py-3 px-2 sm:px-4 text-dark-400 font-medium text-xs sm:text-sm">Token</th>
                    <th className="text-right py-2 sm:py-3 px-2 sm:px-4 text-dark-400 font-medium text-xs sm:text-sm">消费</th>
                    <th className="text-right py-2 sm:py-3 px-2 sm:px-4 text-dark-400 font-medium text-xs sm:text-sm">请求</th>
                    <th className="text-right py-2 sm:py-3 px-2 sm:px-4 text-dark-400 font-medium text-xs sm:text-sm">占比</th>
                  </tr>
                </thead>
                <tbody>
                  {modelUsageData.map((model) => (
                    <tr key={model.modelId} className="border-b border-dark-800 hover:bg-dark-800/30 transition-colors">
                      <td className="py-2 sm:py-3 px-2 sm:px-4">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <span className="text-white font-medium text-xs sm:text-sm">{model.modelName}</span>
                          <span className="text-dark-500 text-[10px] sm:text-xs">{model.provider}</span>
                        </div>
                      </td>
                      <td className="text-right py-2 sm:py-3 px-2 sm:px-4 text-dark-300 text-xs sm:text-sm">
                        {(model.tokens / 1000000).toFixed(1)}M
                      </td>
                      <td className="text-right py-2 sm:py-3 px-2 sm:px-4 text-green-400 text-xs sm:text-sm">
                        ${model.cost.toFixed(1)}
                      </td>
                      <td className="text-right py-2 sm:py-3 px-2 sm:px-4 text-dark-300 text-xs sm:text-sm">
                        {model.requests.toLocaleString()}
                      </td>
                      <td className="text-right py-2 sm:py-3 px-2 sm:px-4">
                        <div className="flex items-center justify-end gap-1.5 sm:gap-2">
                          <div className="w-10 sm:w-16 h-1.5 sm:h-2 bg-dark-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary-500 rounded-full"
                              style={{ width: `${model.percentage}%` }}
                            />
                          </div>
                          <span className="text-white text-xs sm:text-sm w-8 sm:w-10">{model.percentage}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
