import { 
  Product, TimeSlot, SeasonConfig, InventoryItem,
  Recommendation, ScoreBreakdown, ScoreWeights 
} from '../types';
import { products } from '../data/products';
import { seasonRecommendedTags } from '../data/seasonConfigs';

export const DEFAULT_WEIGHTS: ScoreWeights = {
  profit: 0.4, timeSlot: 0.3, season: 0.2, inventory: 0.1
};

function calculateProfitScore(product: Product): number {
  return product.profitMargin;
}

function calculateTimeSlotScore(product: Product, timeSlot: TimeSlot): number {
  if (product.tags.length === 0) return 30;
  const matchingTags = product.tags.filter(tag => timeSlot.recommendedTags.includes(tag));
  return Math.min(100, (matchingTags.length / Math.max(timeSlot.recommendedTags.length, 1)) * 100 + 20);
}

function calculateSeasonScore(product: Product, season: SeasonConfig): number {
  if (product.tags.length === 0) return 30;
  const recommendedTags = seasonRecommendedTags[season.id] || [];
  const matchingTags = product.tags.filter(tag => recommendedTags.includes(tag));
  return Math.min(100, (matchingTags.length / Math.max(recommendedTags.length, 1)) * 100 + 20);
}

function calculateInventoryScore(inventory?: InventoryItem): number {
  if (!inventory) return 50;
  if (inventory.status === 'out') return 0;
  if (inventory.status === 'low') return 40;
  const ratio = inventory.quantity / inventory.maxQuantity;
  if (ratio > 0.8) return 90;
  if (ratio > 0.5) return 100;
  return 70;
}

export function calculateScoreBreakdown(
  product: Product, timeSlot: TimeSlot, season: SeasonConfig, inventory?: InventoryItem
): ScoreBreakdown {
  return {
    profitScore: calculateProfitScore(product),
    timeSlotScore: calculateTimeSlotScore(product, timeSlot),
    seasonScore: calculateSeasonScore(product, season),
    inventoryScore: calculateInventoryScore(inventory)
  };
}

export function calculateTotalScore(breakdown: ScoreBreakdown, weights: ScoreWeights = DEFAULT_WEIGHTS): number {
  return Math.round((
    breakdown.profitScore * weights.profit +
    breakdown.timeSlotScore * weights.timeSlot +
    breakdown.seasonScore * weights.season +
    breakdown.inventoryScore * weights.inventory
  ) * 10) / 10;
}

function generateReason(_product: Product, breakdown: ScoreBreakdown, timeSlot: TimeSlot): string {
  const reasons: string[] = [];
  if (breakdown.profitScore >= 75) reasons.push('高収益');
  if (breakdown.timeSlotScore >= 70) reasons.push(timeSlot.theme);
  if (breakdown.inventoryScore >= 90) reasons.push('在庫豊富');
  return reasons.length > 0 ? reasons.join(' / ') : 'スタッフおすすめ';
}

export function getRecommendations(
  timeSlot: TimeSlot, season: SeasonConfig, 
  inventory: Map<number, InventoryItem>,
  weights: ScoreWeights = DEFAULT_WEIGHTS,
  count: number = 10, excludeCodes: number[] = []
): Recommendation[] {
  const availableProducts = products.filter(p => {
    if (excludeCodes.includes(p.code)) return false;
    const inv = inventory.get(p.code);
    return !inv || inv.status !== 'out';
  });

  const recommendations = availableProducts.map(product => {
    const inv = inventory.get(product.code);
    const breakdown = calculateScoreBreakdown(product, timeSlot, season, inv);
    const score = calculateTotalScore(breakdown, weights);
    return {
      product, score, scoreBreakdown: breakdown,
      reason: generateReason(product, breakdown, timeSlot)
    };
  });

  recommendations.sort((a, b) => b.score - a.score);
  return recommendations.slice(0, count).map((r, i) => ({ ...r, rank: i + 1 }));
}

export function getMainRecommendation(
  timeSlot: TimeSlot, season: SeasonConfig,
  inventory: Map<number, InventoryItem>,
  weights?: ScoreWeights
): Recommendation | null {
  const recs = getRecommendations(timeSlot, season, inventory, weights, 1);
  return recs[0] || null;
}

export function getSubRecommendations(
  timeSlot: TimeSlot, season: SeasonConfig,
  inventory: Map<number, InventoryItem>,
  mainProductCode: number, weights?: ScoreWeights, count: number = 3
): Recommendation[] {
  return getRecommendations(timeSlot, season, inventory, weights, count, [mainProductCode]);
}
