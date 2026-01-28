import { InventoryItem, StockStatus } from '../types';
import { products } from './products';

// 在庫状態の閾値
export const STOCK_THRESHOLDS = {
  LOW: 5,    // これ以下で「在庫少」
  OUT: 0     // これ以下で「在庫切れ」
};

// 在庫状態を判定
export function getStockStatus(quantity: number): StockStatus {
  if (quantity <= STOCK_THRESHOLDS.OUT) return 'out';
  if (quantity <= STOCK_THRESHOLDS.LOW) return 'low';
  return 'available';
}

// 初期在庫データを生成
export function generateInitialInventory(): Map<number, InventoryItem> {
  const inventory = new Map<number, InventoryItem>();
  
  products.forEach(product => {
    // 人気商品は在庫多め、それ以外は標準
    const maxQuantity = product.profitMargin >= 70 ? 20 : 15;
    const quantity = Math.floor(Math.random() * (maxQuantity - 5)) + 8;
    
    inventory.set(product.code, {
      productCode: product.code,
      quantity,
      maxQuantity,
      status: getStockStatus(quantity),
      lastUpdated: new Date()
    });
  });
  
  return inventory;
}

// デモ用：特定の在庫状況を設定
export function generateDemoInventory(): Map<number, InventoryItem> {
  const inventory = new Map<number, InventoryItem>();
  
  // デモ用に在庫状況を設定
  const demoStocks: Record<number, { qty: number, max: number }> = {
    // 主力商品（在庫十分）
    106020: { qty: 15, max: 20 },  // 絹生食パン１斤
    103010: { qty: 18, max: 25 },  // カットピザ
    106060: { qty: 12, max: 15 },  // ホテルブレッド１斤
    105040: { qty: 10, max: 15 },  // ジャムバターサンド
    
    // 在庫少（デモ用）
    101070: { qty: 3, max: 15 },   // コロネ
    107110: { qty: 2, max: 10 },   // バタール
    108090: { qty: 4, max: 15 },   // ミルフィーユ
    
    // 在庫切れ（デモ用）
    102020: { qty: 0, max: 20 },   // ジャンボドーナツ
    
    // その他
    102010: { qty: 12, max: 20 },  // あんドーナツ
    101020: { qty: 8, max: 15 },   // 幻のクリームパン
    104010: { qty: 14, max: 20 },  // プチ３点
    102100: { qty: 7, max: 15 },   // ジューシー辛口カレー
    106010: { qty: 6, max: 10 },   // 絹生食パン２斤
    105050: { qty: 9, max: 15 },   // セサミバーガー
    107021: { qty: 5, max: 12 },   // ベーコンエピ
    101031: { qty: 11, max: 15 },  // 北海小倉あんぱん
    108017: { qty: 13, max: 18 },  // ミートドーナツ
    101080: { qty: 16, max: 20 },  // メロンパン
  };
  
  products.forEach(product => {
    const stock = demoStocks[product.code] || { 
      qty: Math.floor(Math.random() * 10) + 5, 
      max: 15 
    };
    
    inventory.set(product.code, {
      productCode: product.code,
      quantity: stock.qty,
      maxQuantity: stock.max,
      status: getStockStatus(stock.qty),
      lastUpdated: new Date()
    });
  });
  
  return inventory;
}

// 在庫を更新
export function updateInventoryItem(
  inventory: Map<number, InventoryItem>,
  productCode: number,
  newQuantity: number
): Map<number, InventoryItem> {
  const newInventory = new Map(inventory);
  const item = newInventory.get(productCode);
  
  if (item) {
    const quantity = Math.max(0, Math.min(newQuantity, item.maxQuantity));
    newInventory.set(productCode, {
      ...item,
      quantity,
      status: getStockStatus(quantity),
      lastUpdated: new Date()
    });
  }
  
  return newInventory;
}

// 在庫を1つ減らす（販売シミュレーション）
export function sellItem(
  inventory: Map<number, InventoryItem>,
  productCode: number
): Map<number, InventoryItem> {
  const item = inventory.get(productCode);
  if (!item || item.quantity <= 0) return inventory;
  
  return updateInventoryItem(inventory, productCode, item.quantity - 1);
}

// 在庫を補充
export function restockItem(
  inventory: Map<number, InventoryItem>,
  productCode: number,
  amount: number
): Map<number, InventoryItem> {
  const item = inventory.get(productCode);
  if (!item) return inventory;
  
  return updateInventoryItem(inventory, productCode, item.quantity + amount);
}

// 在庫少の商品を取得
export function getLowStockItems(inventory: Map<number, InventoryItem>): InventoryItem[] {
  return Array.from(inventory.values())
    .filter(item => item.status === 'low')
    .sort((a, b) => a.quantity - b.quantity);
}

// 在庫切れの商品を取得
export function getOutOfStockItems(inventory: Map<number, InventoryItem>): InventoryItem[] {
  return Array.from(inventory.values())
    .filter(item => item.status === 'out');
}

// 在庫過多の商品を取得（在庫率80%以上）
export function getOverstockedItems(inventory: Map<number, InventoryItem>): InventoryItem[] {
  return Array.from(inventory.values())
    .filter(item => item.quantity / item.maxQuantity >= 0.8)
    .sort((a, b) => (b.quantity / b.maxQuantity) - (a.quantity / a.maxQuantity));
}

// 在庫サマリーを取得
export interface InventorySummary {
  total: number;
  available: number;
  low: number;
  out: number;
}

export function getInventorySummary(inventory: Map<number, InventoryItem>): InventorySummary {
  const items = Array.from(inventory.values());
  return {
    total: items.length,
    available: items.filter(i => i.status === 'available').length,
    low: items.filter(i => i.status === 'low').length,
    out: items.filter(i => i.status === 'out').length
  };
}
