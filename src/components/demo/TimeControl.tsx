import { Clock, RotateCcw, Sunrise, Sun, Coffee, Sunset } from 'lucide-react';
import { useDemoContext } from '../../contexts/DemoContext';
import { timeSlots, getCurrentTimeSlot } from '../../data/timeSlots';

const timeSlotIcons: Record<string, React.ReactNode> = {
  morning: <Sunrise className="w-5 h-5" />,
  lunch: <Sun className="w-5 h-5" />,
  afternoon: <Coffee className="w-5 h-5" />,
  evening: <Sunset className="w-5 h-5" />,
};

export default function TimeControl() {
  const { settings, setSimulatedHour } = useDemoContext();
  const currentHour = settings.simulatedHour ?? new Date().getHours();
  const timeSlot = getCurrentTimeSlot(currentHour);

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hour = parseInt(e.target.value, 10);
    setSimulatedHour(hour);
  };

  const handleReset = () => {
    setSimulatedHour(null);
  };

  const isSimulated = settings.simulatedHour !== null;

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-gray-800 text-sm tracking-wide uppercase flex items-center gap-2">
          <Clock className="w-4 h-4 text-bakery-primary" />
          時間操作
        </h3>
        {isSimulated && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs px-2.5 py-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            リアルタイムに戻す
          </button>
        )}
      </div>

      {/* 現在時刻表示 */}
      <div className="text-center mb-4">
        <div className="text-4xl font-bold text-bakery-primary tabular-nums">
          {currentHour.toString().padStart(2, '0')}:00
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {isSimulated ? 'シミュレーション中' : 'リアルタイム'}
        </div>
      </div>

      {/* 時間スライダー */}
      <div className="mb-4">
        <input
          type="range"
          min={9}
          max={19}
          step={1}
          value={currentHour < 9 ? 9 : currentHour > 19 ? 19 : currentHour}
          onChange={handleTimeChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-bakery-primary"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1 tabular-nums">
          <span>9:00</span>
          <span>12:00</span>
          <span>15:00</span>
          <span>18:00</span>
          <span>20:00</span>
        </div>
      </div>

      {/* 現在の時間帯表示 */}
      <div className="rounded-lg p-3 bg-gray-50 border border-gray-100">
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="text-bakery-primary">{timeSlotIcons[timeSlot.id]}</span>
          <span className="font-semibold text-gray-900">{timeSlot.theme}</span>
        </div>
        <p className="text-sm text-gray-500 text-center">{timeSlot.catchphrase}</p>
      </div>

      {/* 時間帯一覧 */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        {timeSlots.map((slot) => {
          const isActive = slot.id === timeSlot.id;
          return (
            <button
              key={slot.id}
              onClick={() => setSimulatedHour(slot.startHour)}
              className={`p-2 rounded-lg text-sm transition-all flex items-center gap-2 ${
                isActive
                  ? 'bg-bakery-primary text-white shadow-sm'
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
              }`}
            >
              <span className={isActive ? 'text-white' : 'text-gray-400'}>
                {timeSlotIcons[slot.id]}
              </span>
              <div className="text-left">
                <div className="font-medium">{slot.theme}</div>
                <div className={`text-xs ${isActive ? 'text-white/70' : 'text-gray-400'}`}>
                  {slot.startHour}:00-{slot.endHour}:00
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
