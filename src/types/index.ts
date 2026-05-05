export interface AIModel {
  id: string;
  name: string;
  provider: string;
  providerLogo: string;
  description: string;
  tags: string[];
  contextWindow: number;
  inputPrice: number;
  outputPrice: number;
  features: string[];
  popularity: number;
  isNew?: boolean;
  isRecommended?: boolean;
}

export interface Provider {
  id: string;
  name: string;
  logo: string;
  description: string;
  modelsCount: number;
  status: 'active' | 'beta' | 'coming_soon';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  model?: string;
}

export interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: number;
  priceUnit: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
}

export interface APIKey {
  id: string;
  name: string;
  key: string;
  prefix: string;
  createdAt: Date;
  lastUsedAt?: Date;
  usage: number;
  limit: number;
  status: 'active' | 'revoked';
}

export interface UsageStats {
  date: string;
  tokens: number;
  cost: number;
  requests: number;
}
