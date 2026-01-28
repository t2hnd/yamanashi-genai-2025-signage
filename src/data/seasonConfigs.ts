import { SeasonConfig, SeasonId } from '../types';

export const seasonConfigs: SeasonConfig[] = [
  {
    id: 'spring',
    name: '春',
    months: [3, 4, 5],
    themeColor: '#FFB7C5',
    accentColor: '#FF69B4',
    backgroundColor: '#FFF0F5',
    specialMessage: '🌸 春のドライブのお供に',
    icon: '🌸'
  },
  {
    id: 'summer',
    name: '夏',
    months: [6, 7, 8],
    themeColor: '#87CEEB',
    accentColor: '#4169E1',
    backgroundColor: '#F0F8FF',
    specialMessage: '🏔️ 避暑地・八ヶ岳へようこそ',
    icon: '☀️'
  },
  {
    id: 'autumn',
    name: '秋',
    months: [9, 10, 11],
    themeColor: '#FF8C00',
    accentColor: '#D2691E',
    backgroundColor: '#FFF8DC',
    specialMessage: '🍂 紅葉シーズン到来',
    icon: '🍁'
  },
  {
    id: 'winter',
    name: '冬',
    months: [12, 1, 2],
    themeColor: '#8B7355',
    accentColor: '#A0522D',
    backgroundColor: '#FAF0E6',
    specialMessage: '❄️ 温かいパンで心もほっこり',
    icon: '⛄'
  }
];

// 現在月から季節を取得
export function getCurrentSeason(month?: number): SeasonConfig {
  const currentMonth = month ?? (new Date().getMonth() + 1);
  
  const season = seasonConfigs.find(
    sc => sc.months.includes(currentMonth)
  );
  
  return season || seasonConfigs[0];
}

// 季節IDから取得
export function getSeasonById(id: SeasonId): SeasonConfig {
  return seasonConfigs.find(sc => sc.id === id) || seasonConfigs[0];
}

// 観光シーズンかどうか
export function isTouristSeason(seasonId?: SeasonId): boolean {
  const id = seasonId ?? getCurrentSeason().id;
  return id === 'summer' || id === 'autumn';
}

// 週末かどうか
export function isWeekend(): boolean {
  const day = new Date().getDay();
  return day === 0 || day === 6;
}

// 観光客モードかどうか
export function isTouristMode(seasonId?: SeasonId): boolean {
  return isTouristSeason(seasonId) || isWeekend();
}

// 季節に応じた推奨タグ
export const seasonRecommendedTags: Record<SeasonId, string[]> = {
  spring: ['軽食向け', 'フルーツ系', '朝食向け'],
  summer: ['軽食向け', '子供向け', 'フルーツ系'],
  autumn: ['甘いパン', 'フルーツ系', '和風・あん系'],
  winter: ['ガッツリ系', '惣菜パン', '朝食向け', '食パン系']
};
