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
      <div className="bg-bakery-primary text-white px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold">在庫管理</h1>
            <p className="text-sm opacity-80">
              在庫状況とサイネージ連動
            </p>
          </div>
        </div>
      </div>

      {/* 在庫サマリー */}
      <div className="px-6 py-4">
        <InventorySummary />
      </div>

      {/* メインコンテンツ: 2カラムレイアウト */}
      <div className="flex h-[calc(100vh-14rem)] px-6 pb-6 gap-6">
        {/* 左カラム: 在庫一覧 (60%) */}
        <div className="w-[60%] overflow-hidden flex flex-col">
          <InventoryTable />
        </div>

        {/* 右カラム: 代替提案・シミュレーション・プレビュー (40%) */}
        <div className="w-[40%] flex flex-col gap-4 overflow-y-auto">
          <AlternativeProducts />
          <InventorySimulator />
          <MiniSignagePreview />
        </div>
      </div>
    </div>
  );
}
