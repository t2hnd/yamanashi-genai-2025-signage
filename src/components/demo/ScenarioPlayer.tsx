import { useState, useEffect, useRef } from 'react';
import { useDemoContext } from '../../contexts/DemoContext';
import { SeasonId, DemoScenario } from '../../types';

interface ScenarioState {
  isPlaying: boolean;
  currentScenario: DemoScenario | null;
  progress: number;
  step: number;
  totalSteps: number;
}

const scenarios: { id: DemoScenario; name: string; icon: string; description: string }[] = [
  {
    id: 'dayFlow',
    name: '1日の流れ',
    icon: '🌅',
    description: '9時〜19時を自動で進行',
  },
  {
    id: 'stockOut',
    name: '在庫切れ対応',
    icon: '📦',
    description: 'ジャンボドーナツの在庫を減少',
  },
  {
    id: 'seasonCompare',
    name: '季節比較',
    icon: '🌸',
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

  // シナリオ停止処理
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

  // シナリオ再生処理
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

  // シナリオ1: 1日の流れ
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

  // シナリオ2: 在庫切れ対応
  const playStockOutScenario = () => {
    const productCode = 102020; // ジャンボドーナツ
    const quantities = [10, 8, 6, 4, 3, 2, 1, 0];
    const totalSteps = quantities.length;
    let step = 0;

    // まず在庫をリセットして10に設定
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

  // シナリオ3: 季節比較
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

  // コンポーネントのアンマウント時にインターバルをクリア
  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-white rounded-xl p-4 shadow-lg">
      <h3 className="font-bold text-bakery-primary flex items-center gap-2 mb-3">
        <span>🎬</span>
        <span>シナリオ再生</span>
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
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-50 hover:bg-bakery-accent/10 text-gray-700'
              }`}
            >
              <span className="text-xl">{scenario.icon}</span>
              <div className="flex-1">
                <div className="font-semibold">{scenario.name}</div>
                <div className="text-xs opacity-75">{scenario.description}</div>
              </div>
              {isActive && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
            </button>
          );
        })}
      </div>

      {/* 再生中の進捗表示 */}
      {state.isPlaying && (
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-700">
              {scenarios.find((s) => s.id === state.currentScenario)?.name} 実行中
            </span>
            <span className="text-xs text-gray-500">
              {state.step + 1} / {state.totalSteps}
            </span>
          </div>

          {/* プログレスバー */}
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-bakery-accent transition-all duration-300"
              style={{ width: `${state.progress}%` }}
            />
          </div>

          {/* 停止ボタン */}
          <button
            onClick={stopScenario}
            className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors"
          >
            停止
          </button>
        </div>
      )}

      {/* 使い方の説明 */}
      {!state.isPlaying && (
        <div className="text-xs text-gray-500 mt-2 p-2 bg-gray-50 rounded-lg">
          <p>シナリオを選択すると、AIレコメンデーションの変化を自動でデモします。</p>
        </div>
      )}
    </div>
  );
}
