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
      <div className="bg-bakery-primary text-white px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
            <SlidersHorizontal className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold">デモコントロールパネル</h1>
            <p className="text-sm opacity-80">
              時間・季節・在庫を操作して、AIレコメンデーションの変化を確認
            </p>
          </div>
        </div>
      </div>

      {/* メインコンテンツ: 2カラムレイアウト */}
      <div className="flex h-[calc(100vh-8rem)]">
        {/* 左カラム: コントロール */}
        <div className="w-[40%] p-4 overflow-y-auto space-y-4">
          <TimeControl />
          <SeasonControl />
          <ScenarioPlayer />
          <InventoryControl />
        </div>

        {/* 右カラム: サイネージプレビュー */}
        <div className="w-[60%] p-4 bg-gray-100">
          <SignagePreview />
        </div>
      </div>
    </div>
  );
}
