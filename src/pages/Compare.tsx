import { useState } from 'react';
import { Search, X, Check, GitCompare, ArrowRightLeft } from 'lucide-react';
import { models } from '../data/models';

export default function Compare() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredModels = models.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.provider.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedModels = models.filter((m) => selectedIds.includes(m.id));

  const toggleModel = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((x) => x !== id);
      }
      if (prev.length >= 4) {
        return prev;
      }
      return [...prev, id];
    });
  };

  const removeModel = (id: string) => {
    setSelectedIds((prev) => prev.filter((x) => x !== id));
  };

  const comparisonRows = [
    { label: '提供商', key: 'provider' as const },
    { label: '上下文窗口', key: 'contextWindow' as const, format: (v: number) => `${(v / 1000).toFixed(0)}K` },
    { label: '输入价格', key: 'inputPrice' as const, format: (v: number) => `$${v}/M tokens` },
    { label: '输出价格', key: 'outputPrice' as const, format: (v: number) => `$${v}/M tokens` },
    { label: ' popularity', key: 'popularity' as const, format: (v: number) => `${v}/100` },
    { label: '特性', key: 'features' as const, isList: true },
    { label: '标签', key: 'tags' as const, isTags: true },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container-wide section-padding">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <GitCompare className="w-8 h-8 text-primary-400" />
            模型对比
          </h1>
          <p className="text-dark-400">
            选择最多 4 个模型进行并排对比，找到最适合你需求的 AI 模型
          </p>
        </div>

        {/* Selected Models Bar */}
        {selectedModels.length > 0 && (
          <div className="mb-6 p-4 rounded-xl bg-dark-900 border border-dark-700/50">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm text-dark-400">已选择 {selectedModels.length}/4：</span>
              {selectedModels.map((model) => (
                <div
                  key={model.id}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary-500/10 border border-primary-500/30 text-primary-300 text-sm"
                >
                  <img
                    src={model.providerLogo}
                    alt={model.provider}
                    className="w-4 h-4 object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  {model.name}
                  <button
                    onClick={() => removeModel(model.id)}
                    className="hover:text-white transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              {selectedModels.length >= 2 && (
                <div className="ml-auto flex items-center gap-2 text-sm text-primary-400">
                  <ArrowRightLeft className="w-4 h-4" />
                  已就绪
                </div>
              )}
            </div>
          </div>
        )}

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
          <input
            type="text"
            placeholder="搜索模型..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-dark-900 border border-dark-700 rounded-lg text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors"
          />
        </div>

        {/* Model Selector Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
          {filteredModels.map((model) => {
            const isSelected = selectedIds.includes(model.id);
            const isFull = selectedIds.length >= 4 && !isSelected;
            return (
              <button
                key={model.id}
                onClick={() => !isFull && toggleModel(model.id)}
                disabled={isFull}
                className={`p-4 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-primary-500/10 border-primary-500/50'
                    : isFull
                    ? 'bg-dark-900/50 border-dark-800 opacity-50 cursor-not-allowed'
                    : 'bg-dark-900 border-dark-700/50 hover:border-dark-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-primary-500 border-primary-500'
                        : 'border-dark-600'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <img
                    src={model.providerLogo}
                    alt={model.provider}
                    className="w-6 h-6 object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white truncate">{model.name}</div>
                    <div className="text-xs text-dark-400">{model.provider}</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Comparison Table - Desktop */}
        {selectedModels.length >= 2 ? (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto -mx-2 sm:-mx-4">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-dark-700">
                    <th className="text-left py-4 px-4 text-dark-400 font-medium text-sm sticky left-0 bg-dark-950 z-10">
                      对比项
                    </th>
                    {selectedModels.map((model) => (
                      <th key={model.id} className="text-center py-4 px-4 min-w-[180px]">
                        <div className="flex items-center justify-center gap-2">
                          <img
                            src={model.providerLogo}
                            alt={model.provider}
                            className="w-5 h-5 object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                          <span className="text-white font-semibold">{model.name}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Description row */}
                  <tr className="border-b border-dark-800">
                    <td className="py-4 px-4 text-dark-400 text-sm sticky left-0 bg-dark-950 z-10">描述</td>
                    {selectedModels.map((model) => (
                      <td key={model.id} className="py-4 px-4 text-dark-300 text-sm text-center">
                        {model.description}
                      </td>
                    ))}
                  </tr>

                  {comparisonRows.map((row) => (
                    <tr key={row.label} className="border-b border-dark-800">
                      <td className="py-4 px-4 text-dark-400 text-sm sticky left-0 bg-dark-950 z-10">
                        {row.label}
                      </td>
                      {selectedModels.map((model) => {
                        const value = model[row.key];
                        return (
                          <td key={model.id} className="py-4 px-4 text-center">
                            {row.isList ? (
                              <div className="flex flex-wrap justify-center gap-1">
                                {(value as string[]).map((item) => (
                                  <span
                                    key={item}
                                    className="px-2 py-0.5 rounded-md text-xs bg-dark-800 text-dark-300"
                                  >
                                    {item}
                                  </span>
                                ))}
                              </div>
                            ) : row.isTags ? (
                              <div className="flex flex-wrap justify-center gap-1">
                                {(value as string[]).map((tag) => (
                                  <span
                                    key={tag}
                                    className={`px-2 py-0.5 rounded-md text-xs font-medium ${
                                      tag === '推荐'
                                        ? 'bg-primary-500/20 text-primary-300'
                                        : 'bg-dark-800 text-dark-300'
                                    }`}
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <span className="text-white text-sm">
                                {row.format ? row.format(value as number) : String(value)}
                              </span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}

                  {/* Best value highlighting */}
                  <tr className="border-b border-dark-800">
                    <td className="py-4 px-4 text-dark-400 text-sm sticky left-0 bg-dark-950 z-10">
                      性价比
                    </td>
                    {selectedModels.map((model) => {
                      const score = model.popularity / (model.inputPrice + model.outputPrice);
                      const isBest = selectedModels.reduce(
                        (best, m) =>
                          m.popularity / (m.inputPrice + m.outputPrice) >
                          best.popularity / (best.inputPrice + best.outputPrice)
                            ? m
                            : best,
                        selectedModels[0]
                      );
                      const isWinner = model.id === isBest.id;
                      return (
                        <td key={model.id} className="py-4 px-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <span className="text-white text-sm">{score.toFixed(1)}</span>
                            {isWinner && (
                              <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">
                                最佳
                              </span>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>

                  {/* Action */}
                  <tr>
                    <td className="py-4 px-4 sticky left-0 bg-dark-950 z-10"></td>
                    {selectedModels.map((model) => (
                      <td key={model.id} className="py-4 px-4 text-center">
                        <button className="px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium transition-colors">
                          使用此模型
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {comparisonRows.map((row) => (
                <div key={row.label} className="p-4 rounded-xl bg-dark-900 border border-dark-700/50">
                  <h4 className="text-dark-400 text-sm font-medium mb-3">{row.label}</h4>
                  <div className={`grid gap-3 ${selectedModels.length === 2 ? 'grid-cols-2' : selectedModels.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                    {selectedModels.map((model) => {
                      const value = model[row.key];
                      return (
                        <div key={model.id} className="text-center">
                          <div className="flex items-center justify-center gap-1.5 mb-1.5">
                            <img
                              src={model.providerLogo}
                              alt={model.provider}
                              className="w-4 h-4 object-contain"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                            <span className="text-xs text-dark-500 truncate">{model.name}</span>
                          </div>
                          {row.isList ? (
                            <div className="flex flex-wrap justify-center gap-1">
                              {(value as string[]).slice(0, 2).map((item) => (
                                <span key={item} className="px-1.5 py-0.5 rounded text-[10px] bg-dark-800 text-dark-300">
                                  {item}
                                </span>
                              ))}
                            </div>
                          ) : row.isTags ? (
                            <div className="flex flex-wrap justify-center gap-1">
                              {(value as string[]).slice(0, 2).map((tag) => (
                                <span
                                  key={tag}
                                  className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                                    tag === '推荐'
                                      ? 'bg-primary-500/20 text-primary-300'
                                      : 'bg-dark-800 text-dark-300'
                                  }`}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-white text-sm">
                              {row.format ? row.format(value as number) : String(value)}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Mobile Score Cards */}
              <div className="p-4 rounded-xl bg-dark-900 border border-dark-700/50">
                <h4 className="text-dark-400 text-sm font-medium mb-3">性价比</h4>
                <div className={`grid gap-3 ${selectedModels.length === 2 ? 'grid-cols-2' : selectedModels.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                  {selectedModels.map((model) => {
                    const score = model.popularity / (model.inputPrice + model.outputPrice);
                    const isBest = selectedModels.reduce(
                      (best, m) =>
                        m.popularity / (m.inputPrice + m.outputPrice) >
                        best.popularity / (best.inputPrice + best.outputPrice)
                          ? m
                          : best,
                      selectedModels[0]
                    );
                    const isWinner = model.id === isBest.id;
                    return (
                      <div key={model.id} className="text-center">
                        <div className="flex items-center justify-center gap-1.5 mb-1.5">
                          <img
                            src={model.providerLogo}
                            alt={model.provider}
                            className="w-4 h-4 object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                          <span className="text-xs text-dark-500 truncate">{model.name}</span>
                        </div>
                        <div className="flex items-center justify-center gap-1">
                          <span className="text-white text-sm">{score.toFixed(1)}</span>
                          {isWinner && (
                            <span className="px-1.5 py-0.5 rounded-full bg-green-500/20 text-green-400 text-[10px] font-medium">
                              最佳
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Actions */}
              <div className="grid grid-cols-2 gap-3">
                {selectedModels.map((model) => (
                  <button
                    key={model.id}
                    className="px-4 py-2.5 rounded-lg bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium transition-colors"
                  >
                    使用 {model.name}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-16 sm:py-20 bg-dark-900/50 rounded-xl border border-dark-700/50 border-dashed">
            <GitCompare className="w-10 h-10 sm:w-12 sm:h-12 text-dark-600 mx-auto mb-4" />
            <p className="text-dark-400 mb-2 text-sm sm:text-base">请选择至少 2 个模型进行对比</p>
            <p className="text-dark-500 text-xs sm:text-sm">点击上方模型卡片进行选择</p>
          </div>
        )}
      </div>
    </div>
  );
}
