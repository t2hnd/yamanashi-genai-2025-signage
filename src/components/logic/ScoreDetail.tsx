import { TrendingUp, Clock, Thermometer, Package, MousePointer } from 'lucide-react';
import { Recommendation } from '../../types';
import { useDemoContext } from '../../contexts/DemoContext';

interface ScoreDetailProps {
  recommendation: Recommendation | null;
}

interface ScoreItem {
  key: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  lightBg: string;
}

const scoreItems: ScoreItem[] = [
  {
    key: 'profit',
    label: '利益率',
    icon: <TrendingUp className="w-4 h-4" />,
    color: 'bg-emerald-500',
    bgColor: 'text-emerald-600',
    lightBg: 'bg-emerald-50',
  },
  {
    key: 'timeSlot',
    label: '時間帯',
    icon: <Clock className="w-4 h-4" />,
    color: 'bg-amber-500',
    bgColor: 'text-amber-600',
    lightBg: 'bg-amber-50',
  },
  {
    key: 'season',
    label: '季節',
    icon: <Thermometer className="w-4 h-4" />,
    color: 'bg-blue-500',
    bgColor: 'text-blue-600',
    lightBg: 'bg-blue-50',
  },
  {
    key: 'inventory',
    label: '在庫',
    icon: <Package className="w-4 h-4" />,
    color: 'bg-violet-500',
    bgColor: 'text-violet-600',
    lightBg: 'bg-violet-50',
  },
];

export default function ScoreDetail({ recommendation }: ScoreDetailProps) {
  const { settings } = useDemoContext();
  const weights = settings.scoreWeights;

  if (!recommendation) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 flex-1 flex items-center justify-center">
        <div className="text-center text-gray-400">
          <MousePointer className="w-8 h-8 mx-auto mb-3 text-gray-300" />
          <p className="text-sm">ランキングから商品を選択すると</p>
          <p className="text-sm">スコア詳細が表示されます</p>
        </div>
      </div>
    );
  }

  const { product, score, scoreBreakdown, reason } = recommendation;

  const getScoreColor = (s: number) => {
    if (s >= 80) return 'bg-emerald-500';
    if (s >= 60) return 'bg-amber-500';
    return 'bg-rose-400';
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex-1">
      <h3 className="font-semibold text-gray-800 text-sm tracking-wide uppercase mb-4">
        スコア詳細
      </h3>

      {/* 商品情報 */}
      <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg mb-4">
        <div className="flex-1">
          <h4 className="font-bold text-lg text-gray-900">{product.name}</h4>
          <p className="text-sm text-gray-500">{product.department}</p>
          {product.description && (
            <p className="text-sm text-gray-600 mt-1">{product.description}</p>
          )}
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-gray-900">
            ¥{product.price.toLocaleString()}
          </div>
          <div className="text-xs text-gray-400 mt-0.5">
            利益率 {product.profitMargin.toFixed(1)}%
          </div>
        </div>
      </div>

      {/* 総合スコア */}
      <div className="text-center mb-4">
        <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">総合スコア</div>
        <span className={`inline-flex items-center justify-center px-5 py-2 rounded-lg text-white font-bold text-2xl ${getScoreColor(score)}`}>
          {score.toFixed(1)}
        </span>
      </div>

      {/* 推奨理由 */}
      <div className="bg-bakery-primary/5 border border-bakery-primary/20 rounded-lg p-3 mb-4">
        <div className="text-xs font-medium text-bakery-primary mb-1 uppercase tracking-wide">推奨理由</div>
        <div className="text-sm text-gray-700">{reason}</div>
      </div>

      {/* スコア内訳 */}
      <div className="space-y-3">
        <div className="text-xs text-gray-500 uppercase tracking-wide">スコア内訳</div>
        {scoreItems.map(({ key, label, icon, color, bgColor, lightBg }) => {
          const rawScore = scoreBreakdown[`${key}Score` as keyof typeof scoreBreakdown];
          const weight = weights[key as keyof typeof weights];
          const weightedScore = rawScore * weight;

          return (
            <div key={key} className={`p-3 rounded-lg ${lightBg}`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`font-medium flex items-center gap-2 text-sm ${bgColor}`}>
                  {icon}
                  <span className="text-gray-700">{label}</span>
                </span>
                <div className="text-right text-sm">
                  <span className="font-bold text-gray-900">{rawScore.toFixed(0)}</span>
                  <span className="text-gray-400 mx-1">×</span>
                  <span className="text-gray-500">{weight.toFixed(1)}</span>
                  <span className="text-gray-400 mx-1">=</span>
                  <span className="font-bold text-gray-900">{weightedScore.toFixed(1)}</span>
                </div>
              </div>
              <div className="h-2 bg-white/70 rounded-full overflow-hidden">
                <div
                  className={`h-full ${color} rounded-full transition-all duration-500`}
                  style={{ width: `${rawScore}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* 計算式 */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <div className="text-xs text-gray-500 font-mono">
          <span className="text-gray-400">計算式:</span>{' '}
          ({scoreBreakdown.profitScore.toFixed(0)} × {weights.profit.toFixed(1)}) +
          ({scoreBreakdown.timeSlotScore.toFixed(0)} × {weights.timeSlot.toFixed(1)}) +
          ({scoreBreakdown.seasonScore.toFixed(0)} × {weights.season.toFixed(1)}) +
          ({scoreBreakdown.inventoryScore.toFixed(0)} × {weights.inventory.toFixed(1)}) =
          <span className="font-bold text-gray-900 ml-1">{score.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
}
