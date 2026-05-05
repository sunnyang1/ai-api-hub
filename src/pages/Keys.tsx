import { useState } from 'react';
import {
  Key,
  Plus,
  Copy,
  Check,
  Eye,
  EyeOff,
  Trash2,
  AlertTriangle,
  Shield,
  Clock,
  BarChart3,
} from 'lucide-react';
import type { APIKey } from '../types';
import { useToast } from '../components/ToastContext';

const demoKeys: APIKey[] = [
  {
    id: '1',
    name: '生产环境',
    key: 'sk-ah-prod-xk9m2n8v7b5c4a1j3h6g',
    prefix: 'sk-ah-prod',
    createdAt: new Date('2026-04-15'),
    lastUsedAt: new Date('2026-05-05'),
    usage: 2847000,
    limit: 5000000,
    status: 'active',
  },
  {
    id: '2',
    name: '测试环境',
    key: 'sk-ah-test-pq7w3e4r5t6y2u8i9o0p',
    prefix: 'sk-ah-test',
    createdAt: new Date('2026-04-20'),
    lastUsedAt: new Date('2026-05-04'),
    usage: 156000,
    limit: 1000000,
    status: 'active',
  },
  {
    id: '3',
    name: '旧项目',
    key: 'sk-ah-old-lk1j2h3g4f5d6s7a8q9w',
    prefix: 'sk-ah-old',
    createdAt: new Date('2026-03-01'),
    lastUsedAt: new Date('2026-04-10'),
    usage: 890000,
    limit: 1000000,
    status: 'revoked',
  },
];

export default function Keys() {
  const { showToast } = useToast();
  const [keys, setKeys] = useState<APIKey[]>(demoKeys);
  const [showNewKeyModal, setShowNewKeyModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyLimit, setNewKeyLimit] = useState('1000000');
  const [newlyCreatedKey, setNewlyCreatedKey] = useState<string | null>(null);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const generateKey = () => {
    if (!newKeyName.trim()) return;

    const prefix = 'sk-ah-' + newKeyName.toLowerCase().replace(/\s+/g, '-');
    const random = Array.from({ length: 24 }, () =>
      'abcdefghijklmnopqrstuvwxyz0123456789'[Math.floor(Math.random() * 36)]
    ).join('');

    const newKey: APIKey = {
      id: Date.now().toString(),
      name: newKeyName.trim(),
      key: `${prefix}-${random}`,
      prefix,
      createdAt: new Date(),
      usage: 0,
      limit: parseInt(newKeyLimit),
      status: 'active',
    };

    setKeys([newKey, ...keys]);
    setNewlyCreatedKey(newKey.key);
    setNewKeyName('');
    setShowNewKeyModal(false);
    showToast('API Key 创建成功', 'success');
  };

  const copyKey = async (key: string, id: string) => {
    await navigator.clipboard.writeText(key);
    setCopiedKey(id);
    showToast('API Key 已复制到剪贴板', 'success');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const toggleVisibility = (id: string) => {
    setVisibleKeys((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const revokeKey = (id: string) => {
    setKeys(keys.map((k) => (k.id === id ? { ...k, status: 'revoked' as const } : k)));
    setDeleteConfirm(null);
    showToast('API Key 已撤销', 'warning');
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const totalUsage = keys.filter((k) => k.status === 'active').reduce((sum, k) => sum + k.usage, 0);
  const totalLimit = keys.filter((k) => k.status === 'active').reduce((sum, k) => sum + k.limit, 0);

  return (
    <div className="min-h-screen py-8">
      <div className="container-wide section-padding">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">API 密钥</h1>
            <p className="text-dark-400">管理你的 API Key，控制访问权限和用量限制</p>
          </div>
          <button
            onClick={() => setShowNewKeyModal(true)}
            className="btn-primary"
          >
            <Plus className="w-5 h-5" />
            创建新密钥
          </button>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="p-6 rounded-xl bg-dark-900 border border-dark-700/50">
            <div className="flex items-center gap-3 mb-2">
              <Key className="w-5 h-5 text-primary-400" />
              <span className="text-dark-400 text-sm">活跃密钥</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {keys.filter((k) => k.status === 'active').length}
            </div>
          </div>
          <div className="p-6 rounded-xl bg-dark-900 border border-dark-700/50">
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 className="w-5 h-5 text-primary-400" />
              <span className="text-dark-400 text-sm">本月用量</span>
            </div>
            <div className="text-2xl font-bold text-white">{formatNumber(totalUsage)}</div>
            <div className="text-xs text-dark-500 mt-1">/ {formatNumber(totalLimit)} tokens</div>
          </div>
          <div className="p-6 rounded-xl bg-dark-900 border border-dark-700/50">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-5 h-5 text-primary-400" />
              <span className="text-dark-400 text-sm">安全状态</span>
            </div>
            <div className="text-2xl font-bold text-green-400">正常</div>
            <div className="text-xs text-dark-500 mt-1">未检测到异常</div>
          </div>
        </div>

        {/* Keys List */}
        <div className="space-y-3 sm:space-y-4">
          {keys.map((key) => (
            <div
              key={key.id}
              className={`p-4 sm:p-6 rounded-xl border ${
                key.status === 'revoked'
                  ? 'bg-dark-900/50 border-dark-800 opacity-60'
                  : 'bg-dark-900 border-dark-700/50'
              }`}
            >
              <div className="flex flex-col gap-3 sm:gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <h3 className="font-semibold text-white text-sm sm:text-base">{key.name}</h3>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium ${
                        key.status === 'active'
                          ? 'bg-green-500/20 text-green-300'
                          : 'bg-dark-700 text-dark-400'
                      }`}
                    >
                      {key.status === 'active' ? '活跃' : '已撤销'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 overflow-hidden">
                    <code className="text-xs sm:text-sm text-dark-300 font-mono truncate">
                      {visibleKeys.has(key.id)
                        ? key.key
                        : key.key.slice(0, 10) + '...' + key.key.slice(-4)}
                    </code>
                    <button
                      onClick={() => toggleVisibility(key.id)}
                      className="p-1 text-dark-500 hover:text-white transition-colors flex-shrink-0"
                    >
                      {visibleKeys.has(key.id) ? (
                        <EyeOff className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      ) : (
                        <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => copyKey(key.key, key.id)}
                      className="p-1 text-dark-500 hover:text-white transition-colors flex-shrink-0"
                    >
                      {copiedKey === key.id ? (
                        <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-6 text-xs sm:text-sm">
                  <div className="flex items-center gap-2 text-dark-400">
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    创建于 {formatDate(key.createdAt)}
                  </div>
                  {key.lastUsedAt && (
                    <div className="flex items-center gap-2 text-dark-400">
                      <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      最后使用 {formatDate(key.lastUsedAt)}
                    </div>
                  )}
                  <div className="w-full sm:w-32">
                    <div className="flex items-center justify-between text-[10px] sm:text-xs mb-1">
                      <span className="text-dark-400">用量</span>
                      <span className="text-dark-300">
                        {formatNumber(key.usage)} / {formatNumber(key.limit)}
                      </span>
                    </div>
                    <div className="h-1.5 sm:h-2 bg-dark-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary-500 rounded-full transition-all"
                        style={{ width: `${Math.min((key.usage / key.limit) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>

                {key.status === 'active' && (
                  <div className="flex items-center gap-2">
                    {deleteConfirm === key.id ? (
                      <>
                        <span className="text-xs sm:text-sm text-dark-400">确认撤销？</span>
                        <button
                          onClick={() => revokeKey(key.id)}
                          className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-red-500/20 text-red-400 rounded-lg text-xs sm:text-sm hover:bg-red-500/30 transition-colors"
                        >
                          确认
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-dark-400 rounded-lg text-xs sm:text-sm hover:text-white transition-colors"
                        >
                          取消
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(key.id)}
                        className="p-1.5 sm:p-2 text-dark-500 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Security Tips */}
        <div className="mt-6 sm:mt-8 p-4 sm:p-6 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
          <div className="flex items-start gap-2.5 sm:gap-3">
            <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-300 mb-2 text-sm sm:text-base">安全提示</h3>
              <ul className="space-y-1 text-xs sm:text-sm text-yellow-200/70">
                <li>• 不要将 API Key 硬编码在前端代码或公开仓库中</li>
                <li>• 为不同的应用和环境使用不同的 API Key</li>
                <li>• 定期轮换 API Key，及时撤销不再使用的密钥</li>
                <li>• 设置合理的用量限制，防止意外超额消费</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* New Key Modal */}
      {showNewKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-sm sm:max-w-md bg-dark-900 border border-dark-700 rounded-2xl p-5 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-4">创建新 API 密钥</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs sm:text-sm text-dark-400 mb-2">密钥名称</label>
                <input
                  type="text"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  placeholder="例如：生产环境、测试环境"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm text-dark-400 mb-2">用量限制 (tokens)</label>
                <select
                  value={newKeyLimit}
                  onChange={(e) => setNewKeyLimit(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-dark-800 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-primary-500 text-sm"
                >
                  <option value="100000">100K</option>
                  <option value="500000">500K</option>
                  <option value="1000000">1M</option>
                  <option value="5000000">5M</option>
                  <option value="10000000">10M</option>
                  <option value="0">无限制</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowNewKeyModal(false)}
                className="flex-1 px-4 py-2.5 sm:py-3 bg-dark-800 hover:bg-dark-700 text-white rounded-lg transition-colors border border-dark-700 text-sm"
              >
                取消
              </button>
              <button
                onClick={generateKey}
                disabled={!newKeyName.trim()}
                className="flex-1 px-4 py-2.5 sm:py-3 bg-primary-600 hover:bg-primary-500 disabled:bg-dark-700 disabled:text-dark-500 text-white rounded-lg transition-colors text-sm"
              >
                创建
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Show Newly Created Key */}
      {newlyCreatedKey && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-sm sm:max-w-lg bg-dark-900 border border-primary-500/30 rounded-2xl p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <Key className="w-5 h-5 sm:w-6 sm:h-6 text-primary-400" />
              <h2 className="text-lg sm:text-xl font-bold text-white">API 密钥已创建</h2>
            </div>
            <p className="text-dark-400 text-xs sm:text-sm mb-4">
              请立即复制并保存你的 API Key。这是唯一一次查看完整密钥的机会。
            </p>
            <div className="flex items-center gap-2 p-3 sm:p-4 bg-dark-950 border border-dark-700 rounded-lg mb-5 sm:mb-6">
              <code className="flex-1 text-xs sm:text-sm text-primary-300 font-mono break-all">
                {newlyCreatedKey}
              </code>
              <button
                onClick={() => copyKey(newlyCreatedKey, 'new')}
                className="p-2 text-dark-400 hover:text-white transition-colors flex-shrink-0"
              >
                {copiedKey === 'new' ? (
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </button>
            </div>
            <button
              onClick={() => setNewlyCreatedKey(null)}
              className="w-full px-4 py-2.5 sm:py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-lg transition-colors text-sm"
            >
              我已保存密钥
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
