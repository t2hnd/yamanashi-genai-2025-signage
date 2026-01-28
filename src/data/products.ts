import { Product } from '../types';

// 実際のPOSデータに基づく商品マスタ
export const products: Product[] = [
  // === 超高利益率商品（85%以上）===
  {
    code: 105040,
    name: "ジャムバターサンド",
    department: "二次加工",
    price: 160,
    cost: 16,
    profitMargin: 90.0,
    tags: ["軽食向け", "朝食向け"],
    description: "自家製ジャムとバターの絶妙なハーモニー",
    emoji: "🍓"
  },
  {
    code: 105080,
    name: "ガーリックラスク",
    department: "二次加工",
    price: 180,
    cost: 22,
    profitMargin: 87.8,
    tags: ["惣菜パン"],
    description: "カリッと香ばしいガーリック風味",
    emoji: "🧄"
  },
  {
    code: 105010,
    name: "フレンチサンド",
    department: "二次加工",
    price: 160,
    cost: 22,
    profitMargin: 86.3,
    tags: ["軽食向け", "朝食向け"],
    description: "しっとりフレンチトースト風サンド",
    emoji: "🥪"
  },
  {
    code: 106040,
    name: "パンドミー１斤",
    department: "ブレッド",
    price: 300,
    cost: 45,
    profitMargin: 85.0,
    tags: ["朝食向け", "食パン系"],
    description: "もっちり食感の本格食パン",
    emoji: "🍞"
  },
  {
    code: 107110,
    name: "バタール",
    department: "フランス",
    price: 260,
    cost: 39,
    profitMargin: 85.0,
    tags: ["朝食向け"],
    description: "外はパリッ、中はもっちり",
    emoji: "🥖"
  },
  {
    code: 107040,
    name: "ベイクドポテト",
    department: "フランス",
    price: 160,
    cost: 24,
    profitMargin: 85.0,
    tags: ["惣菜パン", "ガッツリ系"],
    description: "ホクホクポテトのフランスパン",
    emoji: "🥔"
  },
  
  // === 高利益率商品（75-85%）===
  {
    code: 105070,
    name: "黒パン",
    department: "二次加工",
    price: 180,
    cost: 32,
    profitMargin: 82.2,
    tags: ["朝食向け"],
    description: "ライ麦の香り豊かな黒パン",
    emoji: "🍞"
  },
  {
    code: 105050,
    name: "セサミバーガー",
    department: "二次加工",
    price: 190,
    cost: 38,
    profitMargin: 80.0,
    tags: ["軽食向け", "ガッツリ系"],
    description: "香ばしいゴマたっぷり",
    emoji: "🍔"
  },
  {
    code: 106150,
    name: "オレンジブレッド",
    department: "ブレッド",
    price: 220,
    cost: 44,
    profitMargin: 80.0,
    tags: ["朝食向け", "食パン系", "フルーツ系"],
    description: "爽やかなオレンジの香り",
    emoji: "🍊"
  },
  {
    code: 106060,
    name: "ホテルブレッド１斤",
    department: "ブレッド",
    price: 270,
    cost: 57,
    profitMargin: 78.9,
    tags: ["朝食向け", "食パン系"],
    description: "ホテルの朝食のような贅沢な味わい",
    emoji: "🏨"
  },
  {
    code: 107081,
    name: "たっぷりクルミパン",
    department: "フランス",
    price: 170,
    cost: 36,
    profitMargin: 78.8,
    tags: ["朝食向け", "軽食向け"],
    description: "クルミがぎっしり詰まった人気商品",
    emoji: "🌰"
  },
  {
    code: 106020,
    name: "絹生食パン１斤",
    department: "ブレッド",
    price: 240,
    cost: 53,
    profitMargin: 77.9,
    tags: ["朝食向け", "食パン系"],
    description: "絹のようになめらかな口どけ",
    emoji: "✨"
  },
  {
    code: 107070,
    name: "もちもち明太フランス",
    department: "フランス",
    price: 190,
    cost: 44,
    profitMargin: 76.8,
    tags: ["惣菜パン", "ガッツリ系"],
    description: "明太子とバターの絶妙コンビ",
    emoji: "🐟"
  },
  {
    code: 107010,
    name: "ガーリックフランス",
    department: "フランス",
    price: 130,
    cost: 31,
    profitMargin: 76.2,
    tags: ["惣菜パン"],
    description: "香り豊かなガーリックバター",
    emoji: "🧄"
  },
  {
    code: 107021,
    name: "ベーコンエピ",
    department: "フランス",
    price: 190,
    cost: 46,
    profitMargin: 75.8,
    tags: ["ガッツリ系", "惣菜パン"],
    description: "カリカリベーコンの麦の穂パン",
    emoji: "🥓"
  },
  
  // === 中高利益率商品（65-75%）===
  {
    code: 106010,
    name: "絹生食パン２斤",
    department: "ブレッド",
    price: 480,
    cost: 134,
    profitMargin: 72.1,
    tags: ["朝食向け", "食パン系"],
    description: "大家族やお土産に最適な2斤サイズ",
    emoji: "🎁"
  },
  {
    code: 103050,
    name: "フランクロール",
    department: "調理パン",
    price: 170,
    cost: 49,
    profitMargin: 71.2,
    tags: ["軽食向け", "朝食向け", "ガッツリ系"],
    description: "ジューシーなフランクをふわふわパンで",
    emoji: "🌭"
  },
  {
    code: 108017,
    name: "ミートドーナツ",
    department: "新製品",
    price: 160,
    cost: 48,
    profitMargin: 70.0,
    tags: ["ドーナツ系", "ガッツリ系"],
    description: "ミートソースたっぷりの惣菜ドーナツ",
    emoji: "🍩"
  },
  {
    code: 108011,
    name: "蜂蜜シナモンロール",
    department: "新製品",
    price: 180,
    cost: 54,
    profitMargin: 70.0,
    tags: ["軽食向け", "朝食向け", "甘いパン"],
    description: "八ヶ岳産蜂蜜使用",
    emoji: "🍯"
  },
  {
    code: 101031,
    name: "北海小倉あんぱん",
    department: "菓子パン",
    price: 130,
    cost: 40,
    profitMargin: 69.2,
    tags: ["和風・あん系", "甘いパン"],
    description: "北海道産小豆使用の上品な甘さ",
    emoji: "🫘"
  },
  {
    code: 108090,
    name: "ミルフィーユ",
    department: "新製品",
    price: 150,
    cost: 47,
    profitMargin: 68.7,
    tags: ["甘いパン", "フルーツ系"],
    description: "サクサク生地とクリームの層",
    emoji: "🍰"
  },
  {
    code: 102020,
    name: "ジャンボドーナツ",
    department: "ドーナッツ類",
    price: 150,
    cost: 50,
    profitMargin: 66.7,
    tags: ["ドーナツ系", "甘いパン", "子供向け"],
    description: "ビッグサイズで大満足",
    emoji: "🍩"
  },
  {
    code: 101080,
    name: "メロンパン",
    department: "菓子パン",
    price: 130,
    cost: 45,
    profitMargin: 65.4,
    tags: ["甘いパン", "子供向け"],
    description: "外はサクサク、中はふんわり",
    emoji: "🍈"
  },
  {
    code: 102100,
    name: "ジューシー辛口カレー",
    department: "ドーナッツ類",
    price: 170,
    cost: 60,
    profitMargin: 64.7,
    tags: ["ガッツリ系", "惣菜パン"],
    description: "スパイシーな大人のカレーパン",
    emoji: "🍛"
  },
  {
    code: 101070,
    name: "コロネ",
    department: "菓子パン",
    price: 130,
    cost: 47,
    profitMargin: 63.8,
    tags: ["甘いパン", "子供向け"],
    description: "クリームたっぷりの定番コロネ",
    emoji: "🥐"
  },
  {
    code: 101020,
    name: "幻のクリームパンA",
    department: "菓子パン",
    price: 170,
    cost: 65,
    profitMargin: 61.8,
    tags: ["甘いパン"],
    description: "自家製カスタードが絶品",
    emoji: "🥮"
  },
  
  // === 中利益率商品（50-65%）===
  {
    code: 103010,
    name: "カットピザ",
    department: "調理パン",
    price: 210,
    cost: 86,
    profitMargin: 59.0,
    tags: ["ガッツリ系", "惣菜パン"],
    description: "当店人気No.1！熱々ピザパン",
    emoji: "🍕"
  },
  {
    code: 104010,
    name: "プチ３点",
    department: "パイ・デニッシュ",
    price: 110,
    cost: 46,
    profitMargin: 58.2,
    tags: ["軽食向け", "子供向け"],
    description: "3種類の味が楽しめるお得セット",
    emoji: "🎀"
  },
  {
    code: 102070,
    name: "とろ～りカレーパン",
    department: "ドーナッツ類",
    price: 200,
    cost: 94,
    profitMargin: 53.0,
    tags: ["ガッツリ系", "惣菜パン"],
    description: "とろけるチーズ入りカレーパン",
    emoji: "🧀"
  },
  {
    code: 104153,
    name: "アップルパイホール",
    department: "パイ・デニッシュ",
    price: 540,
    cost: 265,
    profitMargin: 50.9,
    tags: ["軽食向け", "フルーツ系", "甘いパン"],
    description: "お土産に最適なホールサイズ",
    emoji: "🍎"
  },
  {
    code: 102010,
    name: "あんドーナツ",
    department: "ドーナッツ類",
    price: 140,
    cost: 69,
    profitMargin: 50.7,
    tags: ["和風・あん系", "ドーナツ系", "甘いパン"],
    description: "こしあんたっぷりの定番ドーナツ",
    emoji: "🍩"
  },
  {
    code: 103020,
    name: "スペシャルフランク",
    department: "調理パン",
    price: 180,
    cost: 47,
    profitMargin: 73.9,
    tags: ["ガッツリ系", "惣菜パン"],
    description: "特製ソーセージの贅沢パン",
    emoji: "🌭"
  },
  {
    code: 106050,
    name: "ホテルブレッド２斤",
    department: "ブレッド",
    price: 540,
    cost: 146,
    profitMargin: 73.0,
    tags: ["朝食向け", "食パン系"],
    description: "大容量でお得な2斤サイズ",
    emoji: "🏨"
  },
  {
    code: 108520,
    name: "オニオンチーズブレッド",
    department: "新製品",
    price: 170,
    cost: 83,
    profitMargin: 51.2,
    tags: ["食パン系", "朝食向け", "惣菜パン"],
    description: "玉ねぎとチーズの香ばしさ",
    emoji: "🧅"
  }
];

// ユーティリティ関数
export function getProductByCode(code: number): Product | undefined {
  return products.find(p => p.code === code);
}

export function getProductsByTags(tags: string[]): Product[] {
  return products.filter(p => 
    p.tags.some(tag => tags.includes(tag))
  );
}

export function getProductsByProfitMargin(minMargin: number = 0): Product[] {
  return products
    .filter(p => p.profitMargin >= minMargin)
    .sort((a, b) => b.profitMargin - a.profitMargin);
}

export function getProductsByDepartment(department: string): Product[] {
  return products.filter(p => p.department === department);
}

// 高利益率商品（70%以上）
export const highProfitProducts = products.filter(p => p.profitMargin >= 70);

// 部門リスト
export const departments = [...new Set(products.map(p => p.department))];

// タグリスト
export const allTags = [...new Set(products.flatMap(p => p.tags))];
