export interface DailyUsage {
  date: string;
  tokens: number;
  cost: number;
  requests: number;
}

export interface ModelUsage {
  modelId: string;
  modelName: string;
  provider: string;
  tokens: number;
  cost: number;
  requests: number;
  percentage: number;
}

export const dailyUsageData: DailyUsage[] = [
  { date: '04-26', tokens: 2450000, cost: 12.5, requests: 15200 },
  { date: '04-27', tokens: 3120000, cost: 15.8, requests: 18900 },
  { date: '04-28', tokens: 2890000, cost: 14.2, requests: 17100 },
  { date: '04-29', tokens: 3560000, cost: 18.3, requests: 21500 },
  { date: '04-30', tokens: 4210000, cost: 21.7, requests: 24800 },
  { date: '05-01', tokens: 2890000, cost: 14.8, requests: 18200 },
  { date: '05-02', tokens: 3340000, cost: 17.1, requests: 20100 },
  { date: '05-03', tokens: 3890000, cost: 19.9, requests: 23200 },
  { date: '05-04', tokens: 4120000, cost: 21.2, requests: 24500 },
  { date: '05-05', tokens: 1560000, cost: 8.1, requests: 9800 },
];

export const modelUsageData: ModelUsage[] = [
  { modelId: 'gpt-4o', modelName: 'GPT-4o', provider: 'OpenAI', tokens: 8420000, cost: 42.1, requests: 45200, percentage: 32.5 },
  { modelId: 'claude-3-5-sonnet', modelName: 'Claude 3.5 Sonnet', provider: 'Anthropic', tokens: 5230000, cost: 31.4, requests: 28900, percentage: 20.2 },
  { modelId: 'gemini-1-5-pro', modelName: 'Gemini 1.5 Pro', provider: 'Google', tokens: 4120000, cost: 18.8, requests: 21500, percentage: 15.9 },
  { modelId: 'deepseek-chat', modelName: 'DeepSeek-V3', provider: 'DeepSeek', tokens: 3560000, cost: 5.3, requests: 19800, percentage: 13.7 },
  { modelId: 'llama-3-1-70b', modelName: 'Llama 3.1 70B', provider: 'Meta', tokens: 1890000, cost: 2.1, requests: 11200, percentage: 7.3 },
  { modelId: 'qwen-2-72b', modelName: 'Qwen2-72B', provider: 'Alibaba', tokens: 1450000, cost: 2.0, requests: 8900, percentage: 5.6 },
  { modelId: 'mistral-large', modelName: 'Mistral Large', provider: 'Mistral', tokens: 980000, cost: 3.1, requests: 5600, percentage: 3.8 },
  { modelId: 'ernie-4', modelName: 'ERNIE 4.0', provider: 'Baidu', tokens: 320000, cost: 1.2, requests: 2100, percentage: 1.0 },
];

export const hourlyUsageData = [
  { hour: '00:00', requests: 1200 },
  { hour: '02:00', requests: 800 },
  { hour: '04:00', requests: 600 },
  { hour: '06:00', requests: 900 },
  { hour: '08:00', requests: 2100 },
  { hour: '10:00', requests: 3200 },
  { hour: '12:00', requests: 3800 },
  { hour: '14:00', requests: 3500 },
  { hour: '16:00', requests: 3100 },
  { hour: '18:00', requests: 2800 },
  { hour: '20:00', requests: 2400 },
  { hour: '22:00', requests: 1800 },
];

export const weeklyStats = {
  totalTokens: 32040000,
  totalCost: 163.7,
  totalRequests: 188300,
  avgLatency: 245,
  successRate: 99.7,
  activeModels: 8,
};
