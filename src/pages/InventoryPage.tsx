import { Package } from 'lucide-react';
import InventorySummary from '../components/inventory/InventorySummary';
import InventoryTable from '../components/inventory/InventoryTable';
import AlternativeProducts from '../components/inventory/AlternativeProducts';
import InventorySimulator from '../components/inventory/InventorySimulator';
import MiniSignagePreview from '../components/inventory/MiniSignagePreview';

export default function InventoryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ページヘッダー */}
      <div className="bg-bakery-primary text-white px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/10 flex items-center justify-center">
            <Package className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold">在庫管理</h1>
            <p className="text-xs sm:text-sm opacity-80">
              在庫状況とサイネージ連動
            </p>
          </div>
        </div>
      </div>

      {/* 在庫サマリー */}
      <div className="px-4 sm:px-6 py-3 sm:py-4">
        <InventorySummary />
      </div>

      {/* メインコンテンツ: レスポンシブ2カラムレイアウト */}
      <div className="flex flex-col lg:flex-row lg:h-[calc(100vh-14rem)] px-4 sm:px-6 pb-4 sm:pb-6 gap-4 sm:gap-6">
        {/* 左カラム: 在庫一覧 */}
        <div className="w-full lg:w-[60%] overflow-hidden flex flex-col min-h-[300px] lg:min-h-0">
          <InventoryTable />
        </div>

        {/* 右カラム: 代替提案・シミュレーション・プレビュー */}
        <div className="w-full lg:w-[40%] flex flex-col gap-3 sm:gap-4 overflow-y-auto">
          <AlternativeProducts />
          <InventorySimulator />
          <MiniSignagePreview />
        </div>
      </div>
    </div>
  );
}
