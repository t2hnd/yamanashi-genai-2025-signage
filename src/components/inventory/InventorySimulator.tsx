import { useState } from 'react';
import { ShoppingCart, PackagePlus, RefreshCw } from 'lucide-react';
import { useDemoContext } from '../../contexts/DemoContext';
import { products, getProductByCode } from '../../data/products';

export default function InventorySimulator() {
  const { inventory, simulateSale, setInventoryQuantity, resetInventory } = useDemoContext();
  const [selectedProductCode, setSelectedProductCode] = useState<number>(
    products[0]?.code || 0
  );

  const selectedItem = inventory.get(selectedProductCode);
  const selectedProduct = getProductByCode(selectedProductCode);

  const handleSale = () => {
    if (selectedItem && selectedItem.quantity > 0) {
      simulateSale(selectedProductCode);
    }
  };

  const handleRestock = () => {
    if (selectedItem) {
      const newQuantity = Math.min(
        selectedItem.quantity + 10,
        selectedItem.maxQuantity
      );
      setInventoryQuantity(selectedProductCode, newQuantity);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center gap-2 mb-4">
        <ShoppingCart className="w-5 h-5 text-blue-500" />
        <h3 className="font-semibold text-gray-800">在庫シミュレーション</h3>
      </div>

      {/* 商品選択 */}
      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-500 mb-1">
          対象商品
        </label>
        <select
          value={selectedProductCode}
          onChange={(e) => setSelectedProductCode(Number(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-bakery-primary focus:border-bakery-primary"
        >
          {products.map((product) => {
            const item = inventory.get(product.code);
            return (
              <option key={product.code} value={product.code}>
                {product.emoji} {product.name} (在庫: {item?.quantity ?? 0}/{item?.maxQuantity ?? 0})
              </option>
            );
          })}
        </select>
      </div>

      {/* 選択中の商品情報 */}
      {selectedProduct && selectedItem && (
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{selectedProduct.emoji}</span>
            <div>
              <div className="font-medium text-gray-900">{selectedProduct.name}</div>
              <div className="text-xs text-gray-500">
                利益率 {selectedProduct.profitMargin.toFixed(1)}%
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">現在の在庫:</span>
            <span className={`font-bold text-lg ${
              selectedItem.status === 'out' ? 'text-red-600' :
              selectedItem.status === 'low' ? 'text-amber-600' :
              'text-emerald-600'
            }`}>
              {selectedItem.quantity}
            </span>
            <span className="text-gray-400">/ {selectedItem.maxQuantity}</span>
          </div>
        </div>
      )}

      {/* アクションボタン */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <button
          onClick={handleSale}
          disabled={!selectedItem || selectedItem.quantity <= 0}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-bakery-accent text-white rounded-lg font-medium text-sm hover:bg-bakery-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ShoppingCart className="w-4 h-4" />
          1個販売
        </button>
        <button
          onClick={handleRestock}
          disabled={!selectedItem || selectedItem.quantity >= selectedItem.maxQuantity}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium text-sm hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <PackagePlus className="w-4 h-4" />
          10個入荷
        </button>
      </div>

      {/* リセットボタン */}
      <button
        onClick={resetInventory}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg font-medium text-sm hover:bg-gray-200 transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        在庫をリセット
      </button>

      <div className="mt-3 text-xs text-gray-500 text-center">
        在庫を変更するとサイネージ表示がリアルタイムで更新されます
      </div>
    </div>
  );
}
