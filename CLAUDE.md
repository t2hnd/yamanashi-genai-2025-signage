# 北杜市パン屋デジタルサイネージ（デモ版）

## 概要

山梨県北杜市のパン屋向けデジタルサイネージシステム。
**デモ発表用**に、AIレコメンデーションの仕組みを可視化する機能を重視。

## クイックスタート

```bash
npm install
npm run dev
```

## ディレクトリ構造

```
bakery-signage-demo/
├── SPECIFICATION.md       # 詳細仕様書（必読）
├── CLAUDE.md              # このファイル
├── src/
│   ├── types/index.ts     # ✅ 型定義
│   ├── data/
│   │   ├── products.ts    # ✅ 商品マスタ（利益率含む）
│   │   ├── timeSlots.ts   # ✅ 時間帯設定
│   │   ├── seasonConfigs.ts # ✅ 季節設定
│   │   ├── crossSellPairs.ts # ✅ 併売データ
│   │   ├── inventory.ts   # ✅ 在庫管理
│   │   └── pages.ts       # ✅ ページ設定
│   ├── utils/
│   │   └── recommendationEngine.ts # ✅ 推奨ロジック
│   ├── contexts/
│   │   └── DemoContext.tsx # ✅ デモ状態管理
│   ├── pages/
│   │   └── SignagePage.tsx # ✅ メインサイネージ
│   ├── App.tsx            # ✅ ルーティング
│   └── main.tsx           # ✅ エントリーポイント
└── 設定ファイル群          # ✅
```

## 実装状況

### ✅ 完了
- 全型定義
- 全データファイル（商品、時間帯、季節、併売、在庫）
- 推奨エンジン（スコア計算ロジック）
- デモコンテキスト（状態管理）
- メインサイネージ画面（スコア表示付き）
- ルーティング設定

### 🔨 TODO: 優先度高（デモのメイン機能）

#### 1. デモコントロールパネル (`/demo`)
```
必要な機能:
- 時間スライダー（9:00-20:00）
- 季節切替ボタン（春夏秋冬）
- 在庫調整（商品ごとに +/- ボタン）
- シナリオ再生ボタン
  - 「1日の流れ」: 時間を自動で進める
  - 「在庫切れ対応」: 人気商品の在庫を減らす
  - 「季節比較」: 夏→冬を切り替え
```

#### 2. 推奨ロジック可視化 (`/logic`)
```
必要な機能:
- 現在の条件表示（時間帯、季節、曜日）
- スコアランキング表（TOP10）
  - 商品名、総合スコア、各スコア詳細
- ウェイト調整スライダー
  - 利益率: 0-1
  - 時間帯: 0-1
  - 季節: 0-1
  - 在庫: 0-1
- 商品選択時のスコア詳細グラフ
```

#### 3. 在庫管理画面 (`/inventory`)
```
必要な機能:
- 在庫サマリー（充足/少/切れの件数）
- 在庫一覧テーブル
  - 商品名、在庫数、状態バッジ、サイネージ表示状況
- 在庫変動シミュレーション
  - 「1個販売」「10個入荷」ボタン
- 代替商品提案の表示
  - 在庫切れ商品→高利益率代替品
- 小型サイネージプレビュー（在庫連動）
```

### 🔨 TODO: 優先度中

#### 4. 併売ネットワーク (`/network`)
```
必要な機能:
- ノードグラフ表示
  - ノード = 商品（サイズ = 売上、色 = 利益率）
  - エッジ = 併売関係（太さ = 併売回数）
- 商品クリックで詳細表示
- 利益改善提案の表示
```

#### 5. 利益シミュレーター (`/simulator`)
```
必要な機能:
- 現状数値表示（年間売上、利益）
- 施策チェックボックス
  - 高利益率商品強化: +340万
  - 併売提案: +560万
  - 在庫最適化: +226万
- 結果グラフ（ビフォーアフター）
```

## デモシナリオ実装

### シナリオ1: 1日の流れ
```typescript
// DemoContext に追加
async function playDayScenario() {
  for (let hour = 9; hour <= 19; hour++) {
    setSimulatedHour(hour);
    await new Promise(r => setTimeout(r, 2000));
  }
}
```

### シナリオ2: 在庫切れ対応
```typescript
async function playStockOutScenario() {
  // ジャンボドーナツ(102020)の在庫を減らす
  for (let qty = 10; qty >= 0; qty--) {
    setInventoryQuantity(102020, qty);
    await new Promise(r => setTimeout(r, 1000));
  }
  // 在庫0になると代替商品が推奨される
}
```

## コンポーネント実装ガイド

### スコアバー
```tsx
<div className="score-bar">
  <div 
    className="score-bar-fill bg-score-high" 
    style={{ width: `${score}%` }} 
  />
</div>
```

### 在庫状態バッジ
```tsx
const statusColors = {
  available: 'bg-stock-ok',
  low: 'bg-stock-low',
  out: 'bg-stock-out'
};
<span className={`px-2 py-1 rounded ${statusColors[status]}`}>
  {status === 'available' ? '🟢' : status === 'low' ? '🟡' : '🔴'}
</span>
```

### ウェイトスライダー
```tsx
<input 
  type="range" 
  min="0" max="1" step="0.1"
  value={weights.profit}
  onChange={e => setScoreWeights({ ...weights, profit: +e.target.value })}
/>
```

## カラーパレット

```
bakery-primary: #8B4513 (茶)
bakery-accent: #FF6B35 (オレンジ)
score-high: #22C55E (緑)
score-mid: #F59E0B (黄)
score-low: #EF4444 (赤)
stock-ok/low/out: 同上
```

## テスト確認項目

```bash
npm run dev

# 確認すること
1. / : サイネージ画面が表示され、スコアが見える
2. 時間によって推奨商品が変わる
3. 在庫状況が反映される
4. 併売提案が表示される
```

## 重要なファイル

1. `src/utils/recommendationEngine.ts` - スコア計算の核心
2. `src/contexts/DemoContext.tsx` - デモ操作の状態管理
3. `src/data/inventory.ts` - 在庫シミュレーション
4. `src/data/crossSellPairs.ts` - 併売データと改善提案

## デモ発表のポイント

1. **AIの判断が見える**: スコア内訳をリアルタイム表示
2. **操作で変化する**: 時間・季節・在庫を変えると推奨が変わる
3. **ビジネス効果が分かる**: 施策による利益改善を数値化
4. **データドリブン**: 実際のPOSデータに基づく併売関係
