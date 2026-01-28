import { useState, useEffect, useRef } from 'react';
import { Play, Square, Sunrise, Package, Flower2, Loader2 } from 'lucide-react';
import { useDemoContext } from '../../contexts/DemoContext';
import { SeasonId, DemoScenario } from '../../types';

interface ScenarioState {
  isPlaying: boolean;
  currentScenario: DemoScenario | null;
  progress: number;
  step: number;
  totalSteps: number;
}

const scenarios: { id: DemoScenario; name: string; icon: React.ReactNode; description: string }[] = [
  {
    id: 'dayFlow',
    name: '1日の流れ',
    icon: <Sunrise className="w-5 h-5" />,
    description: '9時〜19時を自動で進行',
  },
  {
    id: 'stockOut',
    name: '在庫切れ対応',
    icon: <Package className="w-5 h-5" />,
    description: 'ジャンボドーナツの在庫を減少',
  },
  {
    id: 'seasonCompare',
    name: '季節比較',
    icon: <Flower2 className="w-5 h-5" />,
    description: '春→夏→秋→冬を切替',
  },
];

export default function ScenarioPlayer() {
  const { setSimulatedHour, setSimulatedSeason, setInventoryQuantity, resetInventory } =
    useDemoContext();

  const [state, setState] = useState<ScenarioState>({
    isPlaying: false,
    currentScenario: null,
    progress: 0,
    step: 0,
    totalSteps: 0,
  });

  const intervalRef = useRef<number | null>(null);

  const stopScenario = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setState({
      isPlaying: false,
      currentScenario: null,
      progress: 0,
      step: 0,
      totalSteps: 0,
    });
  };

  const playScenario = (scenarioId: DemoScenario) => {
    stopScenario();

    switch (scenarioId) {
      case 'dayFlow':
        playDayFlowScenario();
        break;
      case 'stockOut':
        playStockOutScenario();
        break;
      case 'seasonCompare':
        playSeasonCompareScenario();
        break;
    }
  };

  const playDayFlowScenario = () => {
    const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
    const totalSteps = hours.length;
    let step = 0;

    setState({
      isPlaying: true,
      currentScenario: 'dayFlow',
      progress: 0,
      step: 0,
      totalSteps,
    });

    setSimulatedHour(hours[0]);

    intervalRef.current = window.setInterval(() => {
      step++;
      if (step >= totalSteps) {
        stopScenario();
        return;
      }

      setSimulatedHour(hours[step]);
      setState((s) => ({
        ...s,
        step,
        progress: (step / (totalSteps - 1)) * 100,
      }));
    }, 2000);
  };

  const playStockOutScenario = () => {
    const productCode = 102020;
    const quantities = [10, 8, 6, 4, 3, 2, 1, 0];
    const totalSteps = quantities.length;
    let step = 0;

    resetInventory();
    setInventoryQuantity(productCode, quantities[0]);

    setState({
      isPlaying: true,
      currentScenario: 'stockOut',
      progress: 0,
      step: 0,
      totalSteps,
    });

    intervalRef.current = window.setInterval(() => {
      step++;
      if (step >= totalSteps) {
        stopScenario();
        return;
      }

      setInventoryQuantity(productCode, quantities[step]);
      setState((s) => ({
        ...s,
        step,
        progress: (step / (totalSteps - 1)) * 100,
      }));
    }, 1500);
  };

  const playSeasonCompareScenario = () => {
    const seasons: SeasonId[] = ['spring', 'summer', 'autumn', 'winter'];
    const totalSteps = seasons.length;
    let step = 0;

    setState({
      isPlaying: true,
      currentScenario: 'seasonCompare',
      progress: 0,
      step: 0,
      totalSteps,
    });

    setSimulatedSeason(seasons[0]);

    intervalRef.current = window.setInterval(() => {
      step++;
      if (step >= totalSteps) {
        stopScenario();
        return;
      }

      setSimulatedSeason(seasons[step]);
      setState((s) => ({
        ...s,
        step,
        progress: (step / (totalSteps - 1)) * 100,
      }));
    }, 2500);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
      <h3 className="font-semibold text-gray-800 text-sm tracking-wide uppercase flex items-center gap-2 mb-3">
        <Play className="w-4 h-4 text-bakery-primary" />
        シナリオ再生
      </h3>

      {/* シナリオ選択ボタン */}
      <div className="space-y-2 mb-4">
        {scenarios.map((scenario) => {
          const isActive = state.currentScenario === scenario.id && state.isPlaying;
          return (
            <button
              key={scenario.id}
              onClick={() => playScenario(scenario.id)}
              disabled={state.isPlaying && state.currentScenario !== scenario.id}
              className={`w-full p-3 rounded-lg text-left transition-all flex items-center gap-3 ${
                isActive
                  ? 'bg-bakery-primary text-white'
                  : state.isPlaying
                  ? 'bg-gray-50 text-gray-300 cursor-not-allowed'
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
              }`}
            >
              <span className={isActive ? 'text-white' : 'text-gray-400'}>
                {scenario.icon}
              </span>
              <div className="flex-1">
                <div className="font-medium">{scenario.name}</div>
                <div className={`text-xs ${isActive ? 'text-white/70' : 'text-gray-400'}`}>
                  {scenario.description}
                </div>
              </div>
              {isActive && (
                <Loader2 className="w-4 h-4 animate-spin" />
              )}
            </button>
          );
        })}
      </div>

      {/* 再生中の進捗表示 */}
      {state.isPlaying && (
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              {scenarios.find((s) => s.id === state.currentScenario)?.name} 実行中
            </span>
            <span className="text-xs text-gray-500 tabular-nums">
              {state.step + 1} / {state.totalSteps}
            </span>
          </div>

          {/* プログレスバー */}
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-bakery-primary transition-all duration-300"
              style={{ width: `${state.progress}%` }}
            />
          </div>

          {/* 停止ボタン */}
          <button
            onClick={stopScenario}
            className="w-full py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Square className="w-4 h-4" />
            停止
          </button>
        </div>
      )}

      {/* 使い方の説明 */}
      {!state.isPlaying && (
        <div className="text-xs text-gray-500 p-2 bg-gray-50 rounded-lg border border-gray-100">
          <p>シナリオを選択すると、AIレコメンデーションの変化を自動でデモします。</p>
        </div>
      )}
    </div>
  );
}
