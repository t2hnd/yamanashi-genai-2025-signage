import { TimeSlot, TimeSlotId } from '../types';

export const timeSlots: TimeSlot[] = [
  {
    id: 'morning',
    startHour: 9,
    endHour: 12,
    theme: '八ヶ岳の朝食に',
    catchphrase: '爽やかな高原の朝にふさわしいパンをどうぞ',
    recommendedTags: ['朝食向け', '食パン系', 'クロワッサン系', '軽食向け'],
    backgroundColor: '#FFF8DC',
    gradientClass: 'from-amber-50 to-orange-100',
    icon: '🌅'
  },
  {
    id: 'lunch',
    startHour: 12,
    endHour: 15,
    theme: 'ランチにぴったり',
    catchphrase: 'ボリューム満点！お昼のエネルギーチャージに',
    recommendedTags: ['ガッツリ系', '惣菜パン', 'ドーナツ系'],
    backgroundColor: '#F0FFF0',
    gradientClass: 'from-green-50 to-emerald-100',
    icon: '🍽️'
  },
  {
    id: 'afternoon',
    startHour: 15,
    endHour: 18,
    theme: 'おやつタイム',
    catchphrase: '午後のひとときに甘いパンはいかが？',
    recommendedTags: ['甘いパン', '軽食向け', 'フルーツ系', '子供向け'],
    backgroundColor: '#FFF0F5',
    gradientClass: 'from-pink-50 to-rose-100',
    icon: '☕'
  },
  {
    id: 'evening',
    startHour: 18,
    endHour: 20,
    theme: 'お得なタイムセール',
    catchphrase: '明日の朝食用にお得にお買い求めください',
    recommendedTags: ['食パン系', '朝食向け'],
    backgroundColor: '#FDF5E6',
    gradientClass: 'from-orange-50 to-amber-100',
    icon: '🌆'
  }
];

// 現在時刻から時間帯を取得
export function getCurrentTimeSlot(hour?: number): TimeSlot {
  const currentHour = hour ?? new Date().getHours();
  
  const slot = timeSlots.find(
    ts => currentHour >= ts.startHour && currentHour < ts.endHour
  );
  
  return slot || timeSlots[0];
}

// 時間帯IDから取得
export function getTimeSlotById(id: TimeSlotId): TimeSlot {
  return timeSlots.find(ts => ts.id === id) || timeSlots[0];
}

// 次の時間帯を取得
export function getNextTimeSlot(currentId: TimeSlotId): TimeSlot {
  const currentIndex = timeSlots.findIndex(ts => ts.id === currentId);
  const nextIndex = (currentIndex + 1) % timeSlots.length;
  return timeSlots[nextIndex];
}

// 時間帯終了までの残り分を取得
export function getMinutesUntilNextSlot(currentSlot: TimeSlot): number {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const slotEndMinutes = currentSlot.endHour * 60;
  
  if (currentMinutes >= slotEndMinutes) {
    return (24 * 60 - currentMinutes) + (timeSlots[0].startHour * 60);
  }
  
  return slotEndMinutes - currentMinutes;
}

// 営業時間内かどうか
export function isBusinessHours(hour?: number): boolean {
  const currentHour = hour ?? new Date().getHours();
  return currentHour >= 9 && currentHour < 20;
}
