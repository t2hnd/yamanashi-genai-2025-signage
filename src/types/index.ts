// ============================================
// 商品関連
// ============================================

export interface Product {
  code: number;
  name: string;
  department: string;
  price: number;
  cost: number;
  profitMargin: number;
  tags: string[];
  imageUrl?: string;
  description?: string;
  emoji?: string;  // プレースホルダー表示用
}

// ============================================
// 在庫関連
// ============================================

export type StockStatus = 'available' | 'low' | 'out';

export interface InventoryItem {
  productCode: number;
  quantity: number;
  maxQuantity: number;
  status: StockStatus;
  lastUpdated: Date;
}

export interface InventoryState {
  items: Map<number, InventoryItem>;
  lastSync: Date;
}

// ============================================
// 時間帯関連
// ============================================

export type TimeSlotId = 'morning' | 'lunch' | 'afternoon' | 'evening';

export interface TimeSlot {
  id: TimeSlotId;
  startHour: number;
  endHour: number;
  theme: string;
  catchphrase: string;
  recommendedTags: string[];
  backgroundColor: string;
  gradientClass: string;
  icon: string;
}

// ============================================
// 季節関連
// ============================================

export type SeasonId = 'spring' | 'summer' | 'autumn' | 'winter';

export interface SeasonConfig {
  id: SeasonId;
  name: string;
  months: number[];
  themeColor: string;
  accentColor: string;
  backgroundColor: string;
  specialMessage: string;
  icon: string;
}

// ============================================
// 併売関連
// ============================================

export interface CrossSellPair {
  productCodeA: number;
  productCodeB: number;
  coPurchaseCount: number;
  suggestionText: string;
}

// ネットワーク可視化用
export interface NetworkNode {
  id: number;
  name: string;
  revenue: number;
  profitMargin: number;
  x?: number;
  y?: number;
}

export interface NetworkEdge {
  source: number;
  target: number;
  weight: number;
}

// ============================================
// 推奨関連
// ============================================

export interface ScoreBreakdown {
  profitScore: number;
  timeSlotScore: number;
  seasonScore: number;
  inventoryScore: number;
}

export interface Recommendation {
  product: Product;
  score: number;
  scoreBreakdown: ScoreBreakdown;
  reason: string;
  rank?: number;
}

export interface ScoreWeights {
  profit: number;
  timeSlot: number;
  season: number;
  inventory: number;
}

// ============================================
// デモ関連
// ============================================

export interface DemoSettings {
  // 時間シミュレーション
  simulatedHour: number | null;
  
  // 季節シミュレーション
  simulatedSeason: SeasonId | null;
  
  // スコアウェイト
  scoreWeights: ScoreWeights;
  
  // デモモード
  isAutoPlayEnabled: boolean;
  autoPlaySpeed: number;  // ミリ秒
  currentScenario: DemoScenario | null;
}

export type DemoScenario = 'dayFlow' | 'stockOut' | 'seasonCompare';

export interface ScenarioConfig {
  id: DemoScenario;
  name: string;
  description: string;
  duration: number;  // 秒
}

// ============================================
// シミュレーター関連
// ============================================

export interface Measure {
  id: string;
  name: string;
  description: string;
  effect: {
    type: 'profitRate' | 'avgPrice' | 'salesVolume' | 'costReduction';
    value: number;
  };
  enabled: boolean;
}

export interface SimulationResult {
  currentProfit: number;
  projectedProfit: number;
  improvement: number;
  improvementRate: number;
  measures: Measure[];
}

// ============================================
// 表示設定関連
// ============================================

export interface DisplayConfig {
  currentTimeSlot: TimeSlot;
  currentSeason: SeasonConfig;
  mainProduct: Recommendation | null;
  subProducts: Recommendation[];
  crossSellSuggestion: CrossSellPair | null;
  lowStockProducts: InventoryItem[];
  announcement: string;
}

// ============================================
// ページルーティング
// ============================================

export type PageId =
  | 'signage'
  | 'demo'
  | 'logic'
  | 'inventory'
  | 'items';

export interface PageConfig {
  id: PageId;
  path: string;
  name: string;
  icon: string;
  description: string;
}
