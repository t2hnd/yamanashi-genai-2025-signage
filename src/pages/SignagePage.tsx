import { useState, useEffect } from 'react';
import { useDemoContext } from '../contexts/DemoContext';
import { getCurrentTimeSlot } from '../data/timeSlots';
import { getCurrentSeason, getSeasonById } from '../data/seasonConfigs';
import { getMainRecommendation, getSubRecommendations } from '../utils/recommendationEngine';
import { getCrossSellSuggestions } from '../data/crossSellPairs';
import { getProductByCode } from '../data/products';
import { getLowStockItems } from '../data/inventory';
import { Recommendation, TimeSlot, SeasonConfig } from '../types';
import { getProductImagePath, DEFAULT_PRODUCT_IMAGE } from '../utils/productImage';

export default function SignagePage() {
  const { settings, inventory } = useDemoContext();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mainProduct, setMainProduct] = useState<Recommendation | null>(null);
  const [subProducts, setSubProducts] = useState<Recommendation[]>([]);

  // 現在時刻の更新
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 時間帯・季節の取得（デモ設定優先）
  const hour = settings.simulatedHour ?? currentTime.getHours();
  const timeSlot: TimeSlot = getCurrentTimeSlot(hour);
  const season: SeasonConfig = settings.simulatedSeason 
    ? getSeasonById(settings.simulatedSeason) 
    : getCurrentSeason();

  // 推奨商品の更新
  useEffect(() => {
    const main = getMainRecommendation(timeSlot, season, inventory, settings.scoreWeights);
    setMainProduct(main);
    if (main) {
      setSubProducts(getSubRecommendations(timeSlot, season, inventory, main.product.code, settings.scoreWeights, 3));
    }
  }, [timeSlot, season, inventory, settings.scoreWeights]);

  // 併売提案
  const crossSell = mainProduct ? getCrossSellSuggestions(mainProduct.product.code)[0] : null;
  const suggestedProduct = crossSell
    ? getProductByCode(crossSell.productCodeA === mainProduct?.product.code ? crossSell.productCodeB : crossSell.productCodeA)
    : null;

  // 在庫少商品
  const lowStockItems = getLowStockItems(inventory);

  return (
    <div className="signage-container flex flex-col" style={{ backgroundColor: timeSlot.backgroundColor }}>
      {/* ヘッダー */}
      <header className="bg-bakery-primary text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🥐</span>
          <h1 className="text-2xl font-bold">八ヶ岳高原のパン工房</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xl">{season.icon} {season.name}</span>
          <span className="text-2xl font-bold font-price">
            {currentTime.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </header>

      {/* 時間帯テーマ */}
      <div className="bg-bakery-secondary/50 py-3 px-6 text-center">
        <span className="text-2xl mr-2">{timeSlot.icon}</span>
        <span className="text-xl font-bold text-bakery-primary">{timeSlot.theme}</span>
        <span className="text-lg ml-4 text-gray-600">{timeSlot.catchphrase}</span>
      </div>

      {/* メインコンテンツ */}
      <main className="flex-1 p-6 flex gap-6 overflow-hidden">
        {/* メイン推奨商品 */}
        <div className="flex-1 flex flex-col">
          {mainProduct && (
            <div className="bg-white rounded-2xl shadow-xl p-6 flex-1 flex flex-col animate-fade-in">
              <div className="flex justify-between items-start mb-2">
                <div className="text-sm text-bakery-accent font-bold">✨ 本日のおすすめ</div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-score-high">{mainProduct.score}点</div>
                  <div className="text-xs text-gray-500">推奨スコア</div>
                </div>
              </div>
              
              <img
                src={getProductImagePath(mainProduct.product.code)}
                onError={(e) => { e.currentTarget.src = DEFAULT_PRODUCT_IMAGE; }}
                alt={mainProduct.product.name}
                className="flex-1 object-cover rounded-xl mb-4 min-h-0"
              />
              
              <h2 className="text-3xl font-bold text-bakery-primary mb-2">
                {mainProduct.product.name}
              </h2>
              <p className="text-gray-600 mb-3">{mainProduct.product.description}</p>
              
              {/* スコア詳細 */}
              <div className="bg-gray-50 rounded-lg p-3 mb-3 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                    <span>💰 利益率:</span>
                    <div className="flex-1 score-bar">
                      <div className="score-bar-fill bg-score-high" style={{ width: `${mainProduct.scoreBreakdown.profitScore}%` }} />
                    </div>
                    <span className="font-bold">{mainProduct.scoreBreakdown.profitScore.toFixed(0)}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>⏰ 時間帯:</span>
                    <div className="flex-1 score-bar">
                      <div className="score-bar-fill bg-score-mid" style={{ width: `${mainProduct.scoreBreakdown.timeSlotScore}%` }} />
                    </div>
                    <span className="font-bold">{mainProduct.scoreBreakdown.timeSlotScore.toFixed(0)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📅 季節:</span>
                    <div className="flex-1 score-bar">
                      <div className="score-bar-fill bg-season-summer" style={{ width: `${mainProduct.scoreBreakdown.seasonScore}%` }} />
                    </div>
                    <span className="font-bold">{mainProduct.scoreBreakdown.seasonScore.toFixed(0)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📦 在庫:</span>
                    <div className="flex-1 score-bar">
                      <div className="score-bar-fill bg-stock-ok" style={{ width: `${mainProduct.scoreBreakdown.inventoryScore}%` }} />
                    </div>
                    <span className="font-bold">{mainProduct.scoreBreakdown.inventoryScore.toFixed(0)}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-end">
                <span className="price-text text-4xl text-bakery-accent">
                  ¥{mainProduct.product.price.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {mainProduct.reason}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* サブ推奨商品 */}
        <div className="w-80 flex flex-col gap-4">
          <h3 className="text-lg font-bold text-bakery-primary">こちらもおすすめ</h3>
          {subProducts.map((rec, index) => (
            <div 
              key={rec.product.code}
              className="bg-white rounded-xl shadow-lg p-4 product-card animate-slide-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex gap-4">
                <img
                  src={getProductImagePath(rec.product.code)}
                  onError={(e) => { e.currentTarget.src = DEFAULT_PRODUCT_IMAGE; }}
                  alt={rec.product.name}
                  className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-bakery-primary">{rec.product.name}</h4>
                    <span className="text-sm font-bold text-score-high">{rec.score}点</span>
                  </div>
                  <p className="text-xs text-gray-500">{rec.product.department}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="price-text text-xl text-bakery-accent">
                      ¥{rec.product.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-400">利益率{rec.product.profitMargin.toFixed(0)}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 併売提案バナー */}
      {crossSell && suggestedProduct && (
        <div className="bg-bakery-accent/10 border-t-2 border-bakery-accent py-4 px-6">
          <div className="flex items-center justify-center gap-4">
            <span className="text-2xl">💡</span>
            <span className="text-lg">{crossSell.suggestionText}</span>
            <span className="price-text text-xl text-bakery-accent font-bold">
              ¥{suggestedProduct.price.toLocaleString()}
            </span>
          </div>
        </div>
      )}

      {/* 在庫少アラート */}
      {lowStockItems.length > 0 && (
        <div className="bg-stock-low/20 py-2 px-6 ticker-container">
          <div className="ticker-content flex items-center gap-4">
            <span className="text-stock-low font-bold">⚡ 在庫わずか:</span>
            {lowStockItems.map(item => {
              const product = getProductByCode(item.productCode);
              return product ? (
                <span key={item.productCode} className="whitespace-nowrap">
                  {product.name}(残り{item.quantity}個)
                </span>
              ) : null;
            })}
          </div>
        </div>
      )}

      {/* フッター */}
      <footer className="bg-bakery-primary text-white py-3 px-6 flex justify-between items-center">
        <p className="text-lg">{season.specialMessage}</p>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
          <span>営業中</span>
        </div>
      </footer>
    </div>
  );
}
