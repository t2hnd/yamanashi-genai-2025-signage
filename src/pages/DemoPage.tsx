import TimeControl from '../components/demo/TimeControl';
import SeasonControl from '../components/demo/SeasonControl';
import ScenarioPlayer from '../components/demo/ScenarioPlayer';
import InventoryControl from '../components/demo/InventoryControl';
import SignagePreview from '../components/demo/SignagePreview';

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-bakery-background">
      {/* ページヘッダー */}
      <div className="bg-bakery-primary text-white px-6 py-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <span>🎮</span>
          <span>デモコントロールパネル</span>
        </h1>
        <p className="text-sm opacity-80 mt-1">
          時間・季節・在庫を操作して、AIレコメンデーションの変化を確認
        </p>
      </div>

      {/* メインコンテンツ: 2カラムレイアウト */}
      <div className="flex h-[calc(100vh-8rem)]">
        {/* 左カラム: コントロール */}
        <div className="w-[40%] p-4 overflow-y-auto space-y-4">
          {/* 時間操作 */}
          <TimeControl />

          {/* 季節切替 */}
          <SeasonControl />

          {/* シナリオ再生 */}
          <ScenarioPlayer />

          {/* 在庫調整 */}
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
