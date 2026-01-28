import { CrossSellPair, NetworkNode, NetworkEdge } from '../types';
import { products, getProductByCode } from './products';

// 実際の購買データに基づく併売ペア
export const crossSellPairs: CrossSellPair[] = [
  // カットピザとの併売（売上No.1）
  {
    productCodeA: 103010,
    productCodeB: 102020,
    coPurchaseCount: 8766,
    suggestionText: 'カットピザと一緒に、デザートにジャンボドーナツはいかが？'
  },
  {
    productCodeA: 103010,
    productCodeB: 102010,
    coPurchaseCount: 8210,
    suggestionText: 'カットピザのお供に、甘いあんドーナツもどうぞ'
  },
  {
    productCodeA: 103010,
    productCodeB: 101070,
    coPurchaseCount: 8004,
    suggestionText: 'ピザと相性抜群！クリームたっぷりコロネ'
  },
  {
    productCodeA: 103010,
    productCodeB: 104010,
    coPurchaseCount: 6987,
    suggestionText: 'お子様にはプチ３点セットがおすすめ'
  },
  {
    productCodeA: 103010,
    productCodeB: 106020,
    coPurchaseCount: 6763,
    suggestionText: '明日の朝食に絹生食パンもいかがですか？'
  },
  
  // ジャンボドーナツとの併売
  {
    productCodeA: 102020,
    productCodeB: 101070,
    coPurchaseCount: 6582,
    suggestionText: 'ドーナツと一緒に、人気のコロネもどうぞ'
  },
  {
    productCodeA: 102020,
    productCodeB: 102010,
    coPurchaseCount: 6412,
    suggestionText: '甘党のあなたに、あんドーナツも人気です'
  },
  {
    productCodeA: 102020,
    productCodeB: 106020,
    coPurchaseCount: 5113,
    suggestionText: 'ご家族で召し上がれる絹生食パンもおすすめ'
  },
  
  // 幻のクリームパンとの併売
  {
    productCodeA: 101020,
    productCodeB: 103010,
    coPurchaseCount: 6286,
    suggestionText: '甘いパンと一緒に、お食事系のカットピザも'
  },
  {
    productCodeA: 101020,
    productCodeB: 102020,
    coPurchaseCount: 4828,
    suggestionText: 'クリームパンがお好きなら、ジャンボドーナツも'
  },
  
  // 絹生食パンとの併売
  {
    productCodeA: 106020,
    productCodeB: 105040,
    coPurchaseCount: 3500,
    suggestionText: '食パンと一緒に、ジャムバターサンドもいかが？'
  },
  {
    productCodeA: 106020,
    productCodeB: 106060,
    coPurchaseCount: 2800,
    suggestionText: '食べ比べにホテルブレッドもおすすめ'
  },
  
  // 利益最適化のための戦略的併売提案
  {
    productCodeA: 102010, // あんドーナツ（利益率50.7%）
    productCodeB: 101031, // 北海小倉あんぱん（利益率69.2%）
    coPurchaseCount: 3000,
    suggestionText: 'あんこ好きのあなたに！北海道産小豆の北海小倉あんぱんもどうぞ'
  },
  {
    productCodeA: 102070, // とろ～りカレーパン（利益率53.0%）
    productCodeB: 102100, // ジューシー辛口カレー（利益率64.7%）
    coPurchaseCount: 2500,
    suggestionText: 'カレー好きなら、大人の辛口カレーパンも試してみて'
  },
  {
    productCodeA: 101080, // メロンパン
    productCodeB: 106150, // オレンジブレッド（利益率80%）
    coPurchaseCount: 2000,
    suggestionText: '爽やかなオレンジブレッドもおすすめです'
  },
  {
    productCodeA: 102010, // あんドーナツ
    productCodeB: 108017, // ミートドーナツ（利益率70%）
    coPurchaseCount: 1800,
    suggestionText: '甘いドーナツの後は、惣菜系のミートドーナツも！'
  }
];

// 商品コードから併売提案を取得
export function getCrossSellSuggestions(productCode: number): CrossSellPair[] {
  return crossSellPairs
    .filter(pair => 
      pair.productCodeA === productCode || pair.productCodeB === productCode
    )
    .sort((a, b) => b.coPurchaseCount - a.coPurchaseCount);
}

// 最適な併売提案を取得（利益率考慮）
export function getBestCrossSellSuggestion(
  mainProductCode: number,
  productProfitMargins: Map<number, number>
): CrossSellPair | null {
  const suggestions = getCrossSellSuggestions(mainProductCode);
  
  if (suggestions.length === 0) return null;
  
  const scoredSuggestions = suggestions.map(pair => {
    const suggestedCode = pair.productCodeA === mainProductCode 
      ? pair.productCodeB 
      : pair.productCodeA;
    const profitMargin = productProfitMargins.get(suggestedCode) || 50;
    
    // スコア = 併売回数 × (1 + 利益率/100)
    const score = pair.coPurchaseCount * (1 + profitMargin / 100);
    
    return { pair, score, suggestedCode };
  });
  
  scoredSuggestions.sort((a, b) => b.score - a.score);
  
  return scoredSuggestions[0]?.pair || null;
}

// ネットワーク可視化用データ生成
export function generateNetworkData(): { nodes: NetworkNode[], edges: NetworkEdge[] } {
  // 併売データに含まれる商品コードを抽出
  const productCodes = new Set<number>();
  crossSellPairs.forEach(pair => {
    productCodes.add(pair.productCodeA);
    productCodes.add(pair.productCodeB);
  });
  
  // ノード生成
  const nodes: NetworkNode[] = [];
  productCodes.forEach(code => {
    const product = getProductByCode(code);
    if (product) {
      nodes.push({
        id: code,
        name: product.name,
        revenue: product.price * 1000, // ダミー売上
        profitMargin: product.profitMargin
      });
    }
  });
  
  // エッジ生成
  const edges: NetworkEdge[] = crossSellPairs.map(pair => ({
    source: pair.productCodeA,
    target: pair.productCodeB,
    weight: pair.coPurchaseCount
  }));
  
  return { nodes, edges };
}

// 併売による利益改善提案
export interface CrossSellImprovement {
  currentPair: CrossSellPair;
  currentProfitMargin: number;
  suggestedProduct: number;
  suggestedProfitMargin: number;
  potentialImprovement: number;
}

export function getCrossSellImprovements(): CrossSellImprovement[] {
  const improvements: CrossSellImprovement[] = [];
  
  // 低利益率商品が含まれる併売ペアを検出
  crossSellPairs.forEach(pair => {
    const productA = getProductByCode(pair.productCodeA);
    const productB = getProductByCode(pair.productCodeB);
    
    if (!productA || !productB) return;
    
    // 利益率60%未満の商品を含むペアを検出
    [productA, productB].forEach(lowProduct => {
      if (lowProduct.profitMargin < 60) {
        // 同じタグを持つ高利益率商品を探す
        const highProfitAlternative = products.find(p => 
          p.profitMargin >= 70 &&
          p.code !== lowProduct.code &&
          p.tags.some(tag => lowProduct.tags.includes(tag))
        );
        
        if (highProfitAlternative) {
          improvements.push({
            currentPair: pair,
            currentProfitMargin: lowProduct.profitMargin,
            suggestedProduct: highProfitAlternative.code,
            suggestedProfitMargin: highProfitAlternative.profitMargin,
            potentialImprovement: highProfitAlternative.profitMargin - lowProduct.profitMargin
          });
        }
      }
    });
  });
  
  return improvements.sort((a, b) => b.potentialImprovement - a.potentialImprovement);
}
