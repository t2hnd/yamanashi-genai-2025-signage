import { SlidersHorizontal } from 'lucide-react';
import TimeControl from '../components/demo/TimeControl';
import SeasonControl from '../components/demo/SeasonControl';
import ScenarioPlayer from '../components/demo/ScenarioPlayer';
import InventoryControl from '../components/demo/InventoryControl';
import SignagePreview from '../components/demo/SignagePreview';

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ページヘッダー */}
      <div className="bg-bakery-primary text-white px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/10 flex items-center justify-center">
            <SlidersHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold">デモコントロールパネル</h1>
            <p className="text-xs sm:text-sm opacity-80">
              時間・季節・在庫を操作して、AIレコメンデーションの変化を確認
            </p>
          </div>
        </div>
      </div>

      {/* メインコンテンツ: レスポンシブ2カラムレイアウト */}
      <div className="flex flex-col lg:flex-row lg:h-[calc(100vh-8rem)]">
        {/* 左カラム: コントロール */}
        <div className="w-full lg:w-[40%] p-3 sm:p-4 overflow-y-auto space-y-3 sm:space-y-4">
          <TimeControl />
          <SeasonControl />
          <ScenarioPlayer />
          <InventoryControl />
        </div>

        {/* 右カラム: サイネージプレビュー */}
        <div className="w-full lg:w-[60%] p-3 sm:p-4 bg-gray-100 min-h-[400px] lg:min-h-0">
          <SignagePreview />
        </div>
      </div>
    </div>
  );
}
