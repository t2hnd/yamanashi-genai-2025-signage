import { TrendingUp, Clock, Thermometer, Package } from 'lucide-react';
import { useDemoContext } from '../../contexts/DemoContext';
import { getCurrentTimeSlot } from '../../data/timeSlots';
import { getCurrentSeason, getSeasonById, seasonRecommendedTags } from '../../data/seasonConfigs';
import { getRecommendations } from '../../utils/recommendationEngine';
import { Recommendation } from '../../types';

interface ScoreRankingProps {
  selectedProduct: Recommendation | null;
  onSelectProduct: (rec: Recommendation) => void;
}

export default function ScoreRanking({ selectedProduct, onSelectProduct }: ScoreRankingProps) {
  const { settings, inventory } = useDemoContext();

  const hour = settings.simulatedHour ?? new Date().getHours();
  const timeSlot = getCurrentTimeSlot(hour);
  const season = settings.simulatedSeason
    ? getSeasonById(settings.simulatedSeason)
    : getCurrentSeason();

  const recommendations = getRecommendations(
    timeSlot,
    season,
    inventory,
    settings.scoreWeights,
    10
  );

  // ブーストされるタグを取得
  const boostedTags = new Set([
    ...timeSlot.recommendedTags,
    ...(seasonRecommendedTags[season.id] || [])
  ]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-emerald-500';
    if (score >= 60) return 'bg-amber-500';
    return 'bg-rose-400';
  };

  const getRankStyle = (rank: number) => {
    if (rank === 1) return 'bg-amber-400 text-white';
    if (rank === 2) return 'bg-gray-400 text-white';
    if (rank === 3) return 'bg-amber-600 text-white';
    return 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 h-full overflow-hidden flex flex-col">
      <div className="p-4 border-b border-gray-100">
        <h3 className="font-semibold text-gray-800 text-sm tracking-wide uppercase">
          スコアランキング TOP10
        </h3>
      </div>

      {/* ヘッダー */}
      <div className="flex items-center text-xs text-gray-500 px-4 py-2 border-b border-gray-50 bg-gray-50/50">
        <div className="w-10">#</div>
        <div className="flex-1">商品</div>
        <div className="w-16 text-center">スコア</div>
        <div className="w-36 text-center">
          <div className="flex justify-around">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <Thermometer className="w-3.5 h-3.5 text-blue-500" />
            <Package className="w-3.5 h-3.5 text-violet-500" />
          </div>
        </div>
      </div>

      {/* ランキングリスト */}
      <div className="flex-1 overflow-y-auto">
        {recommendations.map((rec) => {
          const isSelected = selectedProduct?.product.code === rec.product.code;
          const breakdown = rec.scoreBreakdown;
          const productTags = rec.product.tags;

          return (
            <button
              key={rec.product.code}
              onClick={() => onSelectProduct(rec)}
              className={`w-full flex items-center px-4 py-3 border-b border-gray-50 transition-all text-left ${
                isSelected
                  ? 'bg-bakery-primary/5 border-l-2 border-l-bakery-primary'
                  : 'hover:bg-gray-50 border-l-2 border-l-transparent'
              }`}
            >
              {/* 順位 */}
              <div className="w-10">
                <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${getRankStyle(rec.rank!)}`}>
                  {rec.rank}
                </span>
              </div>

              {/* 商品情報 */}
              <div className="flex-1 min-w-0 pr-3">
                <div className="font-medium text-sm text-gray-900 truncate">
                  {rec.product.name}
                </div>
                {/* タグ表示 */}
                <div className="flex flex-wrap gap-1 mt-1">
                  {productTags.map((tag) => {
                    const isBoosted = boostedTags.has(tag);
                    return (
                      <span
                        key={tag}
                        className={`text-[10px] px-1.5 py-0.5 rounded ${
                          isBoosted
                            ? 'bg-orange-100 text-orange-700 font-medium'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* 総合スコア */}
              <div className="w-16 text-center">
                <span className={`inline-flex items-center justify-center px-2 py-1 rounded text-white font-bold text-sm ${getScoreColor(rec.score)}`}>
                  {rec.score.toFixed(0)}
                </span>
              </div>

              {/* スコア内訳バー */}
              <div className="w-36 flex gap-1.5 px-2">
                {[
                  { key: 'profit', score: breakdown.profitScore, color: 'bg-emerald-500' },
                  { key: 'timeSlot', score: breakdown.timeSlotScore, color: 'bg-amber-500' },
                  { key: 'season', score: breakdown.seasonScore, color: 'bg-blue-500' },
                  { key: 'inventory', score: breakdown.inventoryScore, color: 'bg-violet-500' },
                ].map(({ key, score, color }) => (
                  <div key={key} className="flex-1">
                    <div className="h-7 bg-gray-100 rounded relative overflow-hidden">
                      <div
                        className={`absolute bottom-0 left-0 right-0 ${color} transition-all duration-300 rounded-b`}
                        style={{ height: `${score}%` }}
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-medium text-gray-600">
                        {score.toFixed(0)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </button>
          );
        })}
      </div>

      {/* 凡例 */}
      <div className="p-3 border-t border-gray-100 bg-gray-50/50">
        <div className="flex flex-wrap gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded" /> 利益率
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-amber-500 rounded" /> 時間帯
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-blue-500 rounded" /> 季節
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-violet-500 rounded" /> 在庫
          </span>
          <span className="flex items-center gap-1.5 ml-auto">
            <span className="px-1.5 py-0.5 bg-orange-100 text-orange-700 rounded text-[10px]">タグ</span> ブースト中
          </span>
        </div>
      </div>
    </div>
  );
}
