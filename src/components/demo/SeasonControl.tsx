import { Flower2, Sun, Leaf, Snowflake, RotateCcw } from 'lucide-react';
import { useDemoContext } from '../../contexts/DemoContext';
import { seasonConfigs, getCurrentSeason, getSeasonById } from '../../data/seasonConfigs';
import { SeasonId } from '../../types';

const seasonIcons: Record<SeasonId, React.ReactNode> = {
  spring: <Flower2 className="w-5 h-5" />,
  summer: <Sun className="w-5 h-5" />,
  autumn: <Leaf className="w-5 h-5" />,
  winter: <Snowflake className="w-5 h-5" />,
};

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
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-gray-800 text-sm tracking-wide uppercase flex items-center gap-2">
          {seasonIcons[currentSeason.id]}
          季節切替
        </h3>
        {isSimulated && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs px-2.5 py-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            現在の季節に戻す
          </button>
        )}
      </div>

      {/* 現在の季節表示 */}
      <div className="rounded-lg p-4 text-center mb-4 bg-gray-50 border border-gray-100">
        <div className="text-bakery-primary mb-2">
          {seasonIcons[currentSeason.id]}
        </div>
        <div className="text-2xl font-bold text-gray-900">
          {currentSeason.name}
        </div>
        <p className="text-sm text-gray-500 mt-2">{currentSeason.specialMessage.replace(/^[^\s]+\s/, '')}</p>
        {isSimulated && (
          <span className="inline-block mt-2 text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full font-medium">
            シミュレーション中
          </span>
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
                  ? 'bg-bakery-primary text-white shadow-sm'
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
              }`}
            >
              <span className={isActive ? 'text-white' : 'text-gray-400'}>
                {seasonIcons[season.id]}
              </span>
              <span className="text-sm font-medium mt-1">
                {season.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* 季節による推奨変化の説明 */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600 border border-gray-100">
        <p className="font-medium mb-1 text-gray-700">季節による推奨変化:</p>
        <ul className="space-y-1 text-xs text-gray-500">
          <li className="flex items-center gap-2">
            <Flower2 className="w-3 h-3 text-pink-400" />
            <span><strong>春:</strong> 軽食・フルーツ系が人気</span>
          </li>
          <li className="flex items-center gap-2">
            <Sun className="w-3 h-3 text-amber-400" />
            <span><strong>夏:</strong> さっぱり系・子供向けが好調</span>
          </li>
          <li className="flex items-center gap-2">
            <Leaf className="w-3 h-3 text-orange-400" />
            <span><strong>秋:</strong> 甘いパン・和風が売れる</span>
          </li>
          <li className="flex items-center gap-2">
            <Snowflake className="w-3 h-3 text-blue-400" />
            <span><strong>冬:</strong> ガッツリ系・食パンが需要増</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
