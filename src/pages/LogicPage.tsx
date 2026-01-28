import { useState } from 'react';
import { Brain } from 'lucide-react';
import { Recommendation } from '../types';
import CurrentConditions from '../components/logic/CurrentConditions';
import ScoreRanking from '../components/logic/ScoreRanking';
import WeightSliders from '../components/logic/WeightSliders';
import ScoreDetail from '../components/logic/ScoreDetail';

export default function LogicPage() {
  const [selectedProduct, setSelectedProduct] = useState<Recommendation | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ページヘッダー */}
      <div className="bg-bakery-primary text-white px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold">推奨ロジック可視化</h1>
            <p className="text-sm opacity-80">
              AIがどのように商品を推奨しているか、スコア計算の仕組みを確認
            </p>
          </div>
        </div>
      </div>

      {/* 現在の条件 */}
      <div className="px-4 py-3">
        <CurrentConditions />
      </div>

      {/* メインコンテンツ: 2カラムレイアウト */}
      <div className="flex h-[calc(100vh-14rem)] px-4 pb-4 gap-4">
        {/* 左カラム: スコアランキング */}
        <div className="w-[60%]">
          <ScoreRanking
            selectedProduct={selectedProduct}
            onSelectProduct={setSelectedProduct}
          />
        </div>

        {/* 右カラム: ウェイト調整 + スコア詳細 */}
        <div className="w-[40%] flex flex-col gap-4 overflow-y-auto">
          <WeightSliders />
          <ScoreDetail recommendation={selectedProduct} />
        </div>
      </div>
    </div>
  );
}
