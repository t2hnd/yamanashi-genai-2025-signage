import { useState, useMemo } from 'react';
import { Search, Grid, List, Filter } from 'lucide-react';
import { items, departmentNames, hasImage } from '../data/items';

export default function ItemsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showOnlyWithImage, setShowOnlyWithImage] = useState(false);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // 検索クエリでフィルタ
      if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      // 部門でフィルタ
      if (selectedDepartment !== null && item.departmentId !== selectedDepartment) {
        return false;
      }
      // 画像ありのみ
      if (showOnlyWithImage && !hasImage(item.pluCode)) {
        return false;
      }
      return true;
    });
  }, [searchQuery, selectedDepartment, showOnlyWithImage]);

  const stats = useMemo(() => {
    const total = items.length;
    const withImage = items.filter((item) => hasImage(item.pluCode)).length;
    return { total, withImage };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* ヘッダー */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-bakery-primary mb-2">商品マスタ一覧</h1>
          <p className="text-gray-600">
            全{stats.total}商品 / 画像あり{stats.withImage}商品
          </p>
        </div>

        {/* フィルター・検索 */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* 検索 */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="商品名で検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bakery-primary/50"
              />
            </div>

            {/* 部門フィルター */}
            <div className="flex items-center gap-2">
              <Filter className="text-gray-400 w-5 h-5" />
              <select
                value={selectedDepartment ?? ''}
                onChange={(e) =>
                  setSelectedDepartment(e.target.value ? Number(e.target.value) : null)
                }
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bakery-primary/50"
              >
                <option value="">全部門</option>
                {Object.entries(departmentNames).map(([id, name]) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            {/* 画像ありフィルター */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showOnlyWithImage}
                onChange={(e) => setShowOnlyWithImage(e.target.checked)}
                className="w-4 h-4 text-bakery-primary rounded focus:ring-bakery-primary"
              />
              <span className="text-sm text-gray-700">画像ありのみ</span>
            </label>

            {/* 表示切替 */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${
                  viewMode === 'grid'
                    ? 'bg-white shadow-sm text-bakery-primary'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${
                  viewMode === 'list'
                    ? 'bg-white shadow-sm text-bakery-primary'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* 結果件数 */}
          <div className="mt-3 text-sm text-gray-500">
            {filteredItems.length}件表示
          </div>
        </div>

        {/* 商品一覧 */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.pluCode}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="aspect-square bg-gray-100 relative">
                  {hasImage(item.pluCode) ? (
                    <img
                      src={`/images/products/${item.pluCode}.jpg`}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <span className="text-4xl">🍞</span>
                    </div>
                  )}
                  <span className="absolute top-2 right-2 bg-white/90 text-xs px-2 py-1 rounded shadow-sm">
                    {departmentNames[item.departmentId]}
                  </span>
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm text-gray-800 line-clamp-2 mb-1">
                    {item.name}
                  </h3>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-bakery-primary font-bold">
                      ¥{item.price.toLocaleString()}
                    </span>
                    <span className="text-gray-500 text-xs">
                      原価率{item.costRate}%
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    PLU: {item.pluCode}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">画像</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">PLUコード</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">商品名</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">部門</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">定価</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">原価</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">原価率</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredItems.map((item) => (
                  <tr key={item.pluCode} className="hover:bg-gray-50">
                    <td className="px-4 py-2">
                      <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">
                        {hasImage(item.pluCode) ? (
                          <img
                            src={`/images/products/${item.pluCode}.jpg`}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <span className="text-xl">🍞</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600">{item.pluCode}</td>
                    <td className="px-4 py-2 text-sm font-medium text-gray-800">{item.name}</td>
                    <td className="px-4 py-2 text-sm text-gray-600">
                      {departmentNames[item.departmentId]}
                    </td>
                    <td className="px-4 py-2 text-sm text-right font-medium text-bakery-primary">
                      ¥{item.price.toLocaleString()}
                    </td>
                    <td className="px-4 py-2 text-sm text-right text-gray-600">
                      ¥{item.cost.toLocaleString()}
                    </td>
                    <td className="px-4 py-2 text-sm text-right text-gray-600">{item.costRate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filteredItems.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            該当する商品がありません
          </div>
        )}
      </div>
    </div>
  );
}
