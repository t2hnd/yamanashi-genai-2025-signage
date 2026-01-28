import { useDemoContext } from '../../contexts/DemoContext';
import { timeSlots, getCurrentTimeSlot } from '../../data/timeSlots';

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
    <div className="bg-white rounded-xl p-4 shadow-lg">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-bakery-primary flex items-center gap-2">
          <span>🕐</span>
          <span>時間操作</span>
        </h3>
        {isSimulated && (
          <button
            onClick={handleReset}
            className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            リアルタイムに戻す
          </button>
        )}
      </div>

      {/* 現在時刻表示 */}
      <div className="text-center mb-4">
        <div className="text-4xl font-bold text-bakery-primary font-price">
          {currentHour.toString().padStart(2, '0')}:00
        </div>
        <div className="text-sm text-gray-500 mt-1">
          {isSimulated ? '(シミュレーション中)' : '(リアルタイム)'}
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
          className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-bakery-primary"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>9:00</span>
          <span>12:00</span>
          <span>15:00</span>
          <span>18:00</span>
          <span>20:00</span>
        </div>
      </div>

      {/* 現在の時間帯表示 */}
      <div
        className="rounded-lg p-3 text-center"
        style={{ backgroundColor: timeSlot.backgroundColor }}
      >
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="text-2xl">{timeSlot.icon}</span>
          <span className="font-bold text-bakery-primary">{timeSlot.theme}</span>
        </div>
        <p className="text-sm text-gray-600">{timeSlot.catchphrase}</p>
      </div>

      {/* 時間帯一覧 */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        {timeSlots.map((slot) => {
          const isActive = slot.id === timeSlot.id;
          return (
            <button
              key={slot.id}
              onClick={() => setSimulatedHour(slot.startHour)}
              className={`p-2 rounded-lg text-sm transition-all ${
                isActive
                  ? 'bg-bakery-primary text-white shadow-md'
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
              }`}
            >
              <span className="mr-1">{slot.icon}</span>
              {slot.theme}
              <span className="block text-xs opacity-75">
                {slot.startHour}:00-{slot.endHour}:00
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
