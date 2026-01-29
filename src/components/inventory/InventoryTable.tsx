import { useState, useMemo } from 'react';
import { Plus, Minus, CheckCircle2, AlertTriangle, XCircle, Eye, EyeOff } from 'lucide-react';
import { useDemoContext } from '../../contexts/DemoContext';
import { getProductByCode } from '../../data/products';
import { InventoryItem, StockStatus } from '../../types';

function StatusBadge({ status }: { status: StockStatus }) {
  const config = {
    available: {
      icon: CheckCircle2,
      label: '充足',
      bgColor: 'bg-emerald-100',
      textColor: 'text-emerald-700',
    },
    low: {
      icon: AlertTriangle,
      label: '在庫少',
      bgColor: 'bg-amber-100',
      textColor: 'text-amber-700',
    },
    out: {
      icon: XCircle,
      label: '在庫切れ',
      bgColor: 'bg-red-100',
      textColor: 'text-red-700',
    },
  };

  const { icon: Icon, label, bgColor, textColor } = config[status];

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
      <Icon className="w-3 h-3" />
      {label}
    </span>
  );
}

function SignageStatusBadge({ isDisplayed }: { isDisplayed: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
        isDisplayed
          ? 'bg-blue-100 text-blue-700'
          : 'bg-gray-100 text-gray-500'
      }`}
    >
      {isDisplayed ? (
        <>
          <Eye className="w-3 h-3" />
          表示中
        </>
      ) : (
        <>
          <EyeOff className="w-3 h-3" />
          非表示
        </>
      )}
    </span>
  );
}

export default function InventoryTable() {
  const { inventory, setInventoryQuantity } = useDemoContext();
  const [filter, setFilter] = useState<StockStatus | 'all'>('all');

  const sortedItems = useMemo(() => {
    const items = Array.from(inventory.values());

    // フィルタリング
    const filtered = filter === 'all'
      ? items
      : items.filter((item) => item.status === filter);

    // ステータス順（切れ→少→充足）でソート
    const statusOrder: Record<StockStatus, number> = {
      out: 0,
      low: 1,
      available: 2,
    };

    return filtered.sort((a, b) => {
      if (statusOrder[a.status] !== statusOrder[b.status]) {
        return statusOrder[a.status] - statusOrder[b.status];
      }
      // 同じステータスなら在庫数順
      return a.quantity - b.quantity;
    });
  }, [inventory, filter]);

  const handleIncrement = (item: InventoryItem) => {
    if (item.quantity < item.maxQuantity) {
      setInventoryQuantity(item.productCode, item.quantity + 1);
    }
  };

  const handleDecrement = (item: InventoryItem) => {
    if (item.quantity > 0) {
      setInventoryQuantity(item.productCode, item.quantity - 1);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col h-full overflow-hidden">
      {/* ヘッダー */}
      <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
        <h3 className="font-semibold text-gray-800">在庫一覧</h3>
        <div className="flex gap-1">
          {(['all', 'out', 'low', 'available'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 text-xs rounded-full font-medium transition-colors ${
                filter === f
                  ? 'bg-bakery-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f === 'all' ? '全て' : f === 'out' ? '切れ' : f === 'low' ? '少' : '充足'}
            </button>
          ))}
        </div>
      </div>

      {/* テーブル */}
      <div className="flex-1 overflow-y-auto">
        <table className="w-full">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                商品名
              </th>
              <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                在庫数
              </th>
              <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                状態
              </th>
              <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                サイネージ
              </th>
              <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sortedItems.map((item) => {
              const product = getProductByCode(item.productCode);
              if (!product) return null;

              const isDisplayed = item.status !== 'out';

              return (
                <tr
                  key={item.productCode}
                  className={`hover:bg-gray-50 ${
                    item.status === 'out' ? 'bg-red-50/50' : ''
                  }`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{product.emoji}</span>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">
                          {product.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          利益率 {product.profitMargin.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`font-bold tabular-nums ${
                      item.status === 'out' ? 'text-red-600' :
                      item.status === 'low' ? 'text-amber-600' :
                      'text-gray-900'
                    }`}>
                      {item.quantity}
                    </span>
                    <span className="text-gray-400 text-sm">/{item.maxQuantity}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <SignageStatusBadge isDisplayed={isDisplayed} />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-1">
                      <button
                        onClick={() => handleDecrement(item)}
                        disabled={item.quantity <= 0}
                        className="w-7 h-7 flex items-center justify-center rounded bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleIncrement(item)}
                        disabled={item.quantity >= item.maxQuantity}
                        className="w-7 h-7 flex items-center justify-center rounded bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* フッター */}
      <div className="px-4 py-2 border-t border-gray-200 bg-gray-50 text-xs text-gray-500">
        {sortedItems.length}件表示中
      </div>
    </div>
  );
}
