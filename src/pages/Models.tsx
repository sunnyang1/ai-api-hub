import { useState, useMemo } from 'react';
import { Search, Filter, Star, ArrowUpDown, LayoutGrid, List, ChevronDown } from 'lucide-react';
import { models } from '../data/models';
import type { AIModel } from '../types';

type SortField = 'popularity' | 'price' | 'context';
type SortOrder = 'asc' | 'desc';
type ViewMode = 'grid' | 'list';

export default function Models() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('popularity');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const providers = ['all', ...new Set(models.map((m) => m.provider))];
  const tags = ['all', ...new Set(models.flatMap((m) => m.tags))];

  const filteredModels = useMemo(() => {
    let result = [...models];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(query) ||
          m.description.toLowerCase().includes(query) ||
          m.provider.toLowerCase().includes(query)
      );
    }

    if (selectedProvider !== 'all') {
      result = result.filter((m) => m.provider === selectedProvider);
    }

    if (selectedTag !== 'all') {
      result = result.filter((m) => m.tags.includes(selectedTag));
    }

    result.sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case 'popularity':
          comparison = a.popularity - b.popularity;
          break;
        case 'price':
          comparison = a.inputPrice - b.inputPrice;
          break;
        case 'context':
          comparison = a.contextWindow - b.contextWindow;
          break;
      }
      return sortOrder === 'desc' ? -comparison : comparison;
    });

    return result;
  }, [searchQuery, selectedProvider, selectedTag, sortField, sortOrder]);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container-wide section-padding">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">模型库</h1>
          <p className="text-dark-400">
            浏览和比较 {models.length}+ 个可用 AI 模型，找到最适合您需求的模型
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8">
          {/* Top row: Search + View Mode */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
              <input
                type="text"
                placeholder="搜索模型、提供商..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-dark-900 border border-dark-700 rounded-lg text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors text-sm sm:text-base"
              />
            </div>

            {/* View Mode */}
            <div className="flex items-center gap-1 p-1 bg-dark-900 border border-dark-700 rounded-lg self-start">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all ${
                  viewMode === 'grid' ? 'bg-dark-700 text-white' : 'text-dark-400 hover:text-white'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all ${
                  viewMode === 'list' ? 'bg-dark-700 text-white' : 'text-dark-400 hover:text-white'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Bottom row: Filters + Sort */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            {/* Provider Filter */}
            <div className="relative flex-1 sm:flex-initial">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
              <select
                value={selectedProvider}
                onChange={(e) => setSelectedProvider(e.target.value)}
                className="w-full sm:w-auto pl-10 pr-10 py-2.5 sm:py-3 bg-dark-900 border border-dark-700 rounded-lg text-white appearance-none focus:outline-none focus:border-primary-500 transition-colors min-w-0 sm:min-w-[160px] text-sm sm:text-base"
              >
                {providers.map((p) => (
                  <option key={p} value={p}>
                    {p === 'all' ? '所有提供商' : p}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500 pointer-events-none" />
            </div>

            {/* Tag Filter */}
            <div className="relative flex-1 sm:flex-initial">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="w-full sm:w-auto pl-10 pr-10 py-2.5 sm:py-3 bg-dark-900 border border-dark-700 rounded-lg text-white appearance-none focus:outline-none focus:border-primary-500 transition-colors min-w-0 sm:min-w-[140px] text-sm sm:text-base"
              >
                {tags.map((t) => (
                  <option key={t} value={t}>
                    {t === 'all' ? '所有标签' : t}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500 pointer-events-none" />
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleSort('popularity')}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border transition-all text-sm ${
                  sortField === 'popularity'
                    ? 'bg-primary-500/20 border-primary-500/50 text-primary-300'
                    : 'bg-dark-900 border-dark-700 text-dark-400 hover:text-white'
                }`}
              >
                <ArrowUpDown className="w-4 h-4" />
                热度
              </button>
              <button
                onClick={() => toggleSort('price')}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border transition-all text-sm ${
                  sortField === 'price'
                    ? 'bg-primary-500/20 border-primary-500/50 text-primary-300'
                    : 'bg-dark-900 border-dark-700 text-dark-400 hover:text-white'
                }`}
              >
                <ArrowUpDown className="w-4 h-4" />
                价格
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-dark-400 text-sm">
          共找到 <span className="text-white font-medium">{filteredModels.length}</span> 个模型
        </div>

        {/* Models Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModels.map((model) => (
              <ModelCard key={model.id} model={model} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredModels.map((model) => (
              <ModelRow key={model.id} model={model} />
            ))}
          </div>
        )}

        {filteredModels.length === 0 && (
          <div className="text-center py-20">
            <Search className="w-12 h-12 text-dark-600 mx-auto mb-4" />
            <p className="text-dark-400">没有找到匹配的模型</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ModelCard({ model }: { model: AIModel }) {
  return (
    <div className="p-6 rounded-xl bg-dark-900 border border-dark-700/50 card-hover gradient-border">
      <div className="flex items-center gap-3 mb-4">
        <img
          src={model.providerLogo}
          alt={model.provider}
          className="w-10 h-10 object-contain"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-white truncate">{model.name}</h3>
            {model.isRecommended && (
              <span className="px-2 py-0.5 rounded-full bg-primary-500/20 text-primary-300 text-xs font-medium flex-shrink-0">
                推荐
              </span>
            )}
            {model.isNew && (
              <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-300 text-xs font-medium flex-shrink-0">
                新
              </span>
            )}
          </div>
          <p className="text-dark-400 text-sm">{model.provider}</p>
        </div>
      </div>

      <p className="text-dark-300 text-sm mb-4 line-clamp-2">{model.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {model.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 rounded-md text-xs font-medium bg-dark-800 text-dark-300"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-dark-400">上下文窗口</span>
          <span className="text-white">
            {model.contextWindow >= 1000000
              ? `${(model.contextWindow / 1000000).toFixed(1)}M`
              : `${(model.contextWindow / 1000).toFixed(0)}K`}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-dark-400">输入价格</span>
          <span className="text-white">${model.inputPrice}/M tokens</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-dark-400">输出价格</span>
          <span className="text-white">${model.outputPrice}/M tokens</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-dark-700/50">
        <div className="flex items-center gap-1 text-yellow-400">
          <Star className="w-4 h-4 fill-current" />
          <span className="text-sm">{model.popularity}</span>
        </div>
        <div className="flex gap-2">
          {model.features.slice(0, 2).map((f) => (
            <span key={f} className="text-xs text-dark-400 bg-dark-800 px-2 py-1 rounded">
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ModelRow({ model }: { model: AIModel }) {
  return (
    <div className="flex items-center gap-3 sm:gap-6 p-3 sm:p-4 rounded-xl bg-dark-900 border border-dark-700/50 hover:border-primary-500/30 transition-all">
      <img
        src={model.providerLogo}
        alt={model.provider}
        className="w-8 h-8 sm:w-10 sm:h-10 object-contain flex-shrink-0"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold text-white text-sm sm:text-base">{model.name}</h3>
          {model.isRecommended && (
            <span className="px-2 py-0.5 rounded-full bg-primary-500/20 text-primary-300 text-xs flex-shrink-0">
              推荐
            </span>
          )}
        </div>
        <p className="text-dark-400 text-xs sm:text-sm truncate">{model.description}</p>
        <div className="flex sm:hidden items-center gap-3 mt-1.5 text-xs text-dark-400">
          <span>{(model.contextWindow / 1000).toFixed(0)}K 上下文</span>
          <span>${model.inputPrice}/M</span>
        </div>
      </div>
      <div className="hidden sm:flex items-center gap-4 text-sm">
        <span className="text-dark-300 w-20 lg:w-24">
          {(model.contextWindow / 1000).toFixed(0)}K
        </span>
        <span className="text-dark-300 w-24 lg:w-32">
          ${model.inputPrice}/M
        </span>
      </div>
      <div className="flex items-center gap-1 text-yellow-400 flex-shrink-0">
        <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
        <span className="text-xs sm:text-sm">{model.popularity}</span>
      </div>
    </div>
  );
}
