import { useMemo } from 'react';
import { ArrowRight, Lightbulb, TrendingUp } from 'lucide-react';
import { useDemoContext } from '../../contexts/DemoContext';
import { getOutOfStockItems } from '../../data/inventory';
import { products, getProductByCode } from '../../data/products';
import { Product, InventoryItem } from '../../types';

interface AlternativeSuggestion {
  outOfStockProduct: Product;
  alternatives: {
    product: Product;
    matchedTags: string[];
    inventoryItem: InventoryItem;
  }[];
}

export default function AlternativeProducts() {
  const { inventory } = useDemoContext();

  const suggestions = useMemo<AlternativeSuggestion[]>(() => {
    const outOfStockItems = getOutOfStockItems(inventory);

    return outOfStockItems.map((item) => {
      const outOfStockProduct = getProductByCode(item.productCode);
      if (!outOfStockProduct) return null;

      // 同じタグを持つ高利益率商品を探す
      const alternatives = products
        .filter((p) => {
          // 自分自身は除外
          if (p.code === item.productCode) return false;
          // 利益率70%以上
          if (p.profitMargin < 70) return false;
          // 在庫が充足している商品のみ
          const inv = inventory.get(p.code);
          if (!inv || inv.status !== 'available') return false;
          // タグが重複している
          const matchedTags = p.tags.filter((t) => outOfStockProduct.tags.includes(t));
          return matchedTags.length > 0;
        })
        .map((p) => ({
          product: p,
          matchedTags: p.tags.filter((t) => outOfStockProduct.tags.includes(t)),
          inventoryItem: inventory.get(p.code)!,
        }))
        .sort((a, b) => b.product.profitMargin - a.product.profitMargin)
        .slice(0, 3);

      return {
        outOfStockProduct,
        alternatives,
      };
    }).filter((s): s is AlternativeSuggestion => s !== null && s.alternatives.length > 0);
  }, [inventory]);

  if (suggestions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          <h3 className="font-semibold text-gray-800">代替商品提案</h3>
        </div>
        <div className="text-center py-6 text-gray-400">
          <p className="text-sm">在庫切れ商品がないため、</p>
          <p className="text-sm">代替提案はありません</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="w-5 h-5 text-amber-500" />
        <h3 className="font-semibold text-gray-800">代替商品提案</h3>
      </div>

      <div className="space-y-4">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.outOfStockProduct.code}
            className="bg-gray-50 rounded-lg p-3"
          >
            {/* 在庫切れ商品 */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{suggestion.outOfStockProduct.emoji}</span>
              <span className="font-medium text-gray-900 text-sm">
                {suggestion.outOfStockProduct.name}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                在庫切れ
              </span>
            </div>

            {/* 代替商品リスト */}
            <div className="space-y-2 ml-2">
              {suggestion.alternatives.map((alt) => (
                <div
                  key={alt.product.code}
                  className="flex items-center gap-2 bg-white rounded px-2 py-1.5"
                >
                  <ArrowRight className="w-4 h-4 text-bakery-primary flex-shrink-0" />
                  <span className="text-lg">{alt.product.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 text-sm truncate">
                      {alt.product.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {alt.matchedTags.join(', ')}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-600 flex-shrink-0">
                    <TrendingUp className="w-3 h-3" />
                    <span className="text-xs font-bold">
                      {alt.product.profitMargin.toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 text-xs text-gray-500 text-center">
        在庫切れ商品と同じタグを持つ高利益率（70%以上）商品を提案
      </div>
    </div>
  );
}
