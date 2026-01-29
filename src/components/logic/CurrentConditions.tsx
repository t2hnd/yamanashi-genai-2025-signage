import { Clock, Sun, Calendar, Tag } from 'lucide-react';
import { useDemoContext } from '../../contexts/DemoContext';
import { getCurrentTimeSlot } from '../../data/timeSlots';
import { getCurrentSeason, getSeasonById, isWeekend, seasonRecommendedTags } from '../../data/seasonConfigs';

export default function CurrentConditions() {
  const { settings } = useDemoContext();

  const hour = settings.simulatedHour ?? new Date().getHours();
  const timeSlot = getCurrentTimeSlot(hour);
  const season = settings.simulatedSeason
    ? getSeasonById(settings.simulatedSeason)
    : getCurrentSeason();
  const weekend = isWeekend();
  const isSimulated = settings.simulatedHour !== null || settings.simulatedSeason !== null;

  // ブーストされるタグを取得
  const timeSlotTags = timeSlot.recommendedTags;
  const seasonTags = seasonRecommendedTags[season.id] || [];

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800 text-sm tracking-wide uppercase">
          現在の条件
        </h3>
        {isSimulated && (
          <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full font-medium">
            シミュレーション
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-4 mb-4">
        {/* 時間帯 */}
        <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-50 rounded-lg">
          <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <div className="font-medium text-gray-900">{timeSlot.theme}</div>
            <div className="text-xs text-gray-500">{hour}:00</div>
          </div>
        </div>

        {/* 季節 */}
        <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-50 rounded-lg">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <Sun className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <div className="font-medium text-gray-900">{season.name}</div>
            <div className="text-xs text-gray-500">{season.months.join(', ')}月</div>
          </div>
        </div>

        {/* 曜日 */}
        <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-50 rounded-lg">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            weekend ? 'bg-rose-100' : 'bg-gray-100'
          }`}>
            <Calendar className={`w-4 h-4 ${weekend ? 'text-rose-600' : 'text-gray-600'}`} />
          </div>
          <div>
            <div className="font-medium text-gray-900">
              {new Date().toLocaleDateString('ja-JP', { weekday: 'long' })}
            </div>
            {weekend && (
              <div className="text-xs text-rose-600 font-medium">週末</div>
            )}
          </div>
        </div>
      </div>

      {/* ブーストされるタグ */}
      <div className="border-t border-gray-100 pt-3">
        <div className="flex items-center gap-2 mb-2">
          <Tag className="w-4 h-4 text-gray-400" />
          <span className="text-xs font-medium text-gray-500 uppercase">ブーストされるタグ</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {/* 時間帯タグ */}
          {timeSlotTags.map((tag) => (
            <span
              key={`time-${tag}`}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700"
            >
              <Clock className="w-3 h-3" />
              {tag}
            </span>
          ))}
          {/* 季節タグ */}
          {seasonTags
            .filter((tag) => !timeSlotTags.includes(tag))
            .map((tag) => (
              <span
                key={`season-${tag}`}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700"
              >
                <Sun className="w-3 h-3" />
                {tag}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}
