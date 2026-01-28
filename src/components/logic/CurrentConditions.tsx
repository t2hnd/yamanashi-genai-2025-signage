import { Clock, Sun, Calendar } from 'lucide-react';
import { useDemoContext } from '../../contexts/DemoContext';
import { getCurrentTimeSlot } from '../../data/timeSlots';
import { getCurrentSeason, getSeasonById, isWeekend } from '../../data/seasonConfigs';

export default function CurrentConditions() {
  const { settings } = useDemoContext();

  const hour = settings.simulatedHour ?? new Date().getHours();
  const timeSlot = getCurrentTimeSlot(hour);
  const season = settings.simulatedSeason
    ? getSeasonById(settings.simulatedSeason)
    : getCurrentSeason();
  const weekend = isWeekend();
  const isSimulated = settings.simulatedHour !== null || settings.simulatedSeason !== null;

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

      <div className="flex flex-wrap gap-4">
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
    </div>
  );
}
