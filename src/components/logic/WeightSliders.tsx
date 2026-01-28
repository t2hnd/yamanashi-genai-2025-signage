import { RotateCcw, TrendingUp, Clock, Thermometer, Package } from 'lucide-react';
import { useDemoContext } from '../../contexts/DemoContext';
import { DEFAULT_WEIGHTS } from '../../utils/recommendationEngine';

interface WeightConfig {
  key: keyof typeof DEFAULT_WEIGHTS;
  label: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

const weightConfigs: WeightConfig[] = [
  {
    key: 'profit',
    label: '利益率',
    icon: <TrendingUp className="w-4 h-4" />,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-500'
  },
  {
    key: 'timeSlot',
    label: '時間帯',
    icon: <Clock className="w-4 h-4" />,
    color: 'text-amber-600',
    bgColor: 'bg-amber-500'
  },
  {
    key: 'season',
    label: '季節',
    icon: <Thermometer className="w-4 h-4" />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-500'
  },
  {
    key: 'inventory',
    label: '在庫',
    icon: <Package className="w-4 h-4" />,
    color: 'text-violet-600',
    bgColor: 'bg-violet-500'
  },
];

export default function WeightSliders() {
  const { settings, setScoreWeights, resetWeights } = useDemoContext();
  const weights = settings.scoreWeights;

  const handleWeightChange = (key: keyof typeof DEFAULT_WEIGHTS, value: number) => {
    setScoreWeights({ ...weights, [key]: value });
  };

  const isDefault = Object.keys(DEFAULT_WEIGHTS).every(
    key => weights[key as keyof typeof DEFAULT_WEIGHTS] === DEFAULT_WEIGHTS[key as keyof typeof DEFAULT_WEIGHTS]
  );

  const totalWeight = Object.values(weights).reduce((sum, w) => sum + w, 0);

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800 text-sm tracking-wide uppercase">
          ウェイト調整
        </h3>
        {!isDefault && (
          <button
            onClick={resetWeights}
            className="flex items-center gap-1.5 text-xs px-2.5 py-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            リセット
          </button>
        )}
      </div>

      <div className="space-y-4">
        {weightConfigs.map(({ key, label, icon, color, bgColor }) => (
          <div key={key}>
            <div className="flex items-center justify-between mb-1.5">
              <span className={`text-sm font-medium flex items-center gap-2 ${color}`}>
                {icon}
                <span className="text-gray-700">{label}</span>
              </span>
              <span className="text-sm font-bold text-gray-900 tabular-nums w-8 text-right">
                {weights[key].toFixed(1)}
              </span>
            </div>
            <div className="relative">
              <div className="absolute inset-0 h-2 bg-gray-100 rounded-full" />
              <div
                className={`absolute h-2 ${bgColor} rounded-full transition-all`}
                style={{ width: `${weights[key] * 100}%` }}
              />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={weights[key]}
                onChange={(e) => handleWeightChange(key, parseFloat(e.target.value))}
                className="relative w-full h-2 appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-gray-300 [&::-webkit-slider-thumb]:cursor-pointer"
              />
            </div>
          </div>
        ))}
      </div>

      {/* 合計表示 */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">ウェイト合計</span>
          <span className={`font-semibold tabular-nums ${
            Math.abs(totalWeight - 1.0) < 0.01 ? 'text-emerald-600' : 'text-amber-600'
          }`}>
            {totalWeight.toFixed(1)}
            {Math.abs(totalWeight - 1.0) >= 0.01 && (
              <span className="text-xs font-normal ml-1 text-gray-400">(推奨: 1.0)</span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
