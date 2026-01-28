import { useDemoContext } from '../../contexts/DemoContext';
import { seasonConfigs, getCurrentSeason, getSeasonById } from '../../data/seasonConfigs';
import { SeasonId } from '../../types';

export default function SeasonControl() {
  const { settings, setSimulatedSeason } = useDemoContext();
  const currentSeason = settings.simulatedSeason
    ? getSeasonById(settings.simulatedSeason)
    : getCurrentSeason();

  const handleSeasonChange = (seasonId: SeasonId) => {
    setSimulatedSeason(seasonId);
  };

  const handleReset = () => {
    setSimulatedSeason(null);
  };

  const isSimulated = settings.simulatedSeason !== null;

  return (
    <div className="bg-white rounded-xl p-4 shadow-lg">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-bakery-primary flex items-center gap-2">
          <span>🌸</span>
          <span>季節切替</span>
        </h3>
        {isSimulated && (
          <button
            onClick={handleReset}
            className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            現在の季節に戻す
          </button>
        )}
      </div>

      {/* 現在の季節表示 */}
      <div
        className="rounded-lg p-4 text-center mb-4"
        style={{ backgroundColor: currentSeason.backgroundColor }}
      >
        <div className="text-4xl mb-2">{currentSeason.icon}</div>
        <div className="text-2xl font-bold" style={{ color: currentSeason.accentColor }}>
          {currentSeason.name}
        </div>
        <p className="text-sm text-gray-600 mt-2">{currentSeason.specialMessage}</p>
        {isSimulated && (
          <div className="text-xs text-gray-500 mt-2">(シミュレーション中)</div>
        )}
      </div>

      {/* 季節選択ボタン */}
      <div className="grid grid-cols-4 gap-2">
        {seasonConfigs.map((season) => {
          const isActive = season.id === currentSeason.id;
          return (
            <button
              key={season.id}
              onClick={() => handleSeasonChange(season.id)}
              className={`p-3 rounded-lg transition-all flex flex-col items-center ${
                isActive
                  ? 'ring-2 shadow-md'
                  : 'hover:bg-gray-50'
              }`}
              style={{
                backgroundColor: isActive ? season.backgroundColor : undefined,
                borderColor: isActive ? season.accentColor : undefined,
                // @ts-expect-error: custom ring color via CSS variable
                '--tw-ring-color': isActive ? season.accentColor : undefined,
              }}
            >
              <span className="text-2xl mb-1">{season.icon}</span>
              <span
                className={`text-sm font-bold ${
                  isActive ? '' : 'text-gray-600'
                }`}
                style={{ color: isActive ? season.accentColor : undefined }}
              >
                {season.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* 季節による推奨変化の説明 */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
        <p className="font-semibold mb-1">季節による推奨変化:</p>
        <ul className="list-disc list-inside space-y-1 text-xs">
          <li><span className="font-semibold">春:</span> 軽食・フルーツ系が人気</li>
          <li><span className="font-semibold">夏:</span> さっぱり系・子供向けが好調</li>
          <li><span className="font-semibold">秋:</span> 甘いパン・和風が売れる</li>
          <li><span className="font-semibold">冬:</span> ガッツリ系・食パンが需要増</li>
        </ul>
      </div>
    </div>
  );
}
