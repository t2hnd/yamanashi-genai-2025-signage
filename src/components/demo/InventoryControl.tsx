import { Package, RotateCcw, Minus, Plus } from 'lucide-react';
import { useDemoContext } from '../../contexts/DemoContext';
import { products } from '../../data/products';
import { getInventorySummary } from '../../data/inventory';
import { getProductImagePath, DEFAULT_PRODUCT_IMAGE } from '../../utils/productImage';

export default function InventoryControl() {
  const { inventory, setInventoryQuantity, simulateSale, resetInventory } = useDemoContext();
  const summary = getInventorySummary(inventory);

  const sortedProducts = [...products].sort((a, b) => {
    const itemA = inventory.get(a.code);
    const itemB = inventory.get(b.code);
    const statusOrder = { out: 0, low: 1, available: 2 };
    const orderA = statusOrder[itemA?.status || 'available'];
    const orderB = statusOrder[itemB?.status || 'available'];
    if (orderA !== orderB) return orderA - orderB;
    return a.code - b.code;
  });

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-emerald-100 text-emerald-700';
      case 'low':
        return 'bg-amber-100 text-amber-700';
      case 'out':
        return 'bg-rose-100 text-rose-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'available':
        return '充足';
      case 'low':
        return '少';
      case 'out':
        return '切れ';
      default:
        return '不明';
    }
  };

  const getRowBg = (status: string) => {
    switch (status) {
      case 'out':
        return 'bg-rose-50';
      case 'low':
        return 'bg-amber-50';
      default:
        return 'bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-gray-800 text-sm tracking-wide uppercase flex items-center gap-2">
          <Package className="w-4 h-4 text-bakery-primary" />
          在庫調整
        </h3>
        <button
          onClick={resetInventory}
          className="flex items-center gap-1.5 text-xs px-2.5 py-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          リセット
        </button>
      </div>

      {/* 在庫サマリー */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-emerald-50 rounded-lg p-2 text-center border border-emerald-100">
          <div className="text-2xl font-bold text-emerald-600 tabular-nums">{summary.available}</div>
          <div className="text-xs text-emerald-600">充足</div>
        </div>
        <div className="bg-amber-50 rounded-lg p-2 text-center border border-amber-100">
          <div className="text-2xl font-bold text-amber-600 tabular-nums">{summary.low}</div>
          <div className="text-xs text-amber-600">在庫少</div>
        </div>
        <div className="bg-rose-50 rounded-lg p-2 text-center border border-rose-100">
          <div className="text-2xl font-bold text-rose-600 tabular-nums">{summary.out}</div>
          <div className="text-xs text-rose-600">在庫切れ</div>
        </div>
      </div>

      {/* 商品リスト */}
      <div className="max-h-64 overflow-y-auto space-y-1.5 pr-1">
        {sortedProducts.map((product) => {
          const item = inventory.get(product.code);
          if (!item) return null;

          return (
            <div
              key={product.code}
              className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${getRowBg(item.status)}`}
            >
              {/* 商品画像 */}
              <img
                src={getProductImagePath(product.code)}
                onError={(e) => {
                  e.currentTarget.src = DEFAULT_PRODUCT_IMAGE;
                }}
                alt={product.name}
                className="w-10 h-10 object-cover rounded-lg flex-shrink-0"
              />

              {/* 商品名・状態 */}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate text-gray-900">{product.name}</div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${getStatusStyle(item.status)}`}>
                    {getStatusLabel(item.status)}
                  </span>
                  <span className="text-xs text-gray-400 tabular-nums">
                    {item.quantity}/{item.maxQuantity}
                  </span>
                </div>
              </div>

              {/* 操作ボタン */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => simulateSale(product.code)}
                  disabled={item.quantity <= 0}
                  className="w-7 h-7 rounded-lg bg-white border border-gray-200 hover:bg-rose-50 hover:border-rose-200 text-gray-600 hover:text-rose-600 font-bold disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center font-bold text-sm tabular-nums text-gray-900">
                  {item.quantity}
                </span>
                <button
                  onClick={() => setInventoryQuantity(product.code, item.quantity + 1)}
                  disabled={item.quantity >= item.maxQuantity}
                  className="w-7 h-7 rounded-lg bg-white border border-gray-200 hover:bg-emerald-50 hover:border-emerald-200 text-gray-600 hover:text-emerald-600 font-bold disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 使い方の説明 */}
      <div className="text-xs text-gray-500 mt-3 p-2 bg-gray-50 rounded-lg border border-gray-100">
        <p>
          在庫を減らすと、その商品の推奨スコアが下がり、代替商品が推奨されます。
        </p>
      </div>
    </div>
  );
}
