import { useDemoContext } from '../../contexts/DemoContext';
import { products } from '../../data/products';
import { getInventorySummary } from '../../data/inventory';
import { getProductImagePath, DEFAULT_PRODUCT_IMAGE } from '../../utils/productImage';

export default function InventoryControl() {
  const { inventory, setInventoryQuantity, simulateSale, resetInventory } = useDemoContext();
  const summary = getInventorySummary(inventory);

  // 商品リストを在庫状態と商品コード順にソート
  const sortedProducts = [...products].sort((a, b) => {
    const itemA = inventory.get(a.code);
    const itemB = inventory.get(b.code);
    const statusOrder = { out: 0, low: 1, available: 2 };
    const orderA = statusOrder[itemA?.status || 'available'];
    const orderB = statusOrder[itemB?.status || 'available'];
    if (orderA !== orderB) return orderA - orderB;
    return a.code - b.code;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-stock-ok';
      case 'low':
        return 'bg-stock-low';
      case 'out':
        return 'bg-stock-out';
      default:
        return 'bg-gray-300';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'available':
        return '充足';
      case 'low':
        return '在庫少';
      case 'out':
        return '在庫切れ';
      default:
        return '不明';
    }
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-lg">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-bakery-primary flex items-center gap-2">
          <span>📦</span>
          <span>在庫調整</span>
        </h3>
        <button
          onClick={resetInventory}
          className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          リセット
        </button>
      </div>

      {/* 在庫サマリー */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-stock-ok/20 rounded-lg p-2 text-center">
          <div className="text-2xl font-bold text-stock-ok">{summary.available}</div>
          <div className="text-xs text-gray-600">充足</div>
        </div>
        <div className="bg-stock-low/20 rounded-lg p-2 text-center">
          <div className="text-2xl font-bold text-stock-low">{summary.low}</div>
          <div className="text-xs text-gray-600">在庫少</div>
        </div>
        <div className="bg-stock-out/20 rounded-lg p-2 text-center">
          <div className="text-2xl font-bold text-stock-out">{summary.out}</div>
          <div className="text-xs text-gray-600">在庫切れ</div>
        </div>
      </div>

      {/* 商品リスト */}
      <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
        {sortedProducts.map((product) => {
          const item = inventory.get(product.code);
          if (!item) return null;

          return (
            <div
              key={product.code}
              className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
                item.status === 'out'
                  ? 'bg-red-50'
                  : item.status === 'low'
                  ? 'bg-yellow-50'
                  : 'bg-gray-50'
              }`}
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
                <div className="text-sm font-semibold truncate">{product.name}</div>
                <div className="flex items-center gap-1">
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded text-white ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {getStatusLabel(item.status)}
                  </span>
                  <span className="text-xs text-gray-500">
                    {item.quantity}/{item.maxQuantity}
                  </span>
                </div>
              </div>

              {/* 操作ボタン */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => simulateSale(product.code)}
                  disabled={item.quantity <= 0}
                  className="w-7 h-7 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 font-bold disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  -
                </button>
                <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                <button
                  onClick={() => setInventoryQuantity(product.code, item.quantity + 1)}
                  disabled={item.quantity >= item.maxQuantity}
                  className="w-7 h-7 rounded-lg bg-green-100 hover:bg-green-200 text-green-600 font-bold disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 使い方の説明 */}
      <div className="text-xs text-gray-500 mt-3 p-2 bg-gray-50 rounded-lg">
        <p>
          在庫を減らすと、その商品の推奨スコアが下がり、代替商品が推奨されます。
        </p>
      </div>
    </div>
  );
}
