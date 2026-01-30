import { useState, useEffect } from 'react';
import {
  Croissant,
  Star,
  TrendingUp,
  Clock,
  Thermometer,
  Package,
  Lightbulb,
  Circle,
  Eye,
  EyeOff
} from 'lucide-react';
import { useDemoContext } from '../contexts/DemoContext';
import { getCurrentTimeSlot } from '../data/timeSlots';
import { getCurrentSeason, getSeasonById } from '../data/seasonConfigs';
import { getMainRecommendation, getSubRecommendations } from '../utils/recommendationEngine';
import { getCrossSellSuggestions } from '../data/crossSellPairs';
import { getProductByCode } from '../data/products';
import { Recommendation, TimeSlot, SeasonConfig } from '../types';
import { getProductImagePath, DEFAULT_PRODUCT_IMAGE } from '../utils/productImage';

export default function SignagePage() {
  const { settings, inventory } = useDemoContext();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mainProduct, setMainProduct] = useState<Recommendation | null>(null);
  const [subProducts, setSubProducts] = useState<Recommendation[]>([]);
  const [showScores, setShowScores] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hour = settings.simulatedHour ?? currentTime.getHours();
  const timeSlot: TimeSlot = getCurrentTimeSlot(hour);
  const season: SeasonConfig = settings.simulatedSeason
    ? getSeasonById(settings.simulatedSeason)
    : getCurrentSeason();

  useEffect(() => {
    const main = getMainRecommendation(timeSlot, season, inventory, settings.scoreWeights);
    setMainProduct(main);
    if (main) {
      setSubProducts(
        getSubRecommendations(timeSlot, season, inventory, main.product.code, settings.scoreWeights, 3)
      );
    }
  }, [timeSlot, season, inventory, settings.scoreWeights]);

  const crossSell = mainProduct ? getCrossSellSuggestions(mainProduct.product.code)[0] : null;
  const suggestedProduct = crossSell
    ? getProductByCode(
        crossSell.productCodeA === mainProduct?.product.code
          ? crossSell.productCodeB
          : crossSell.productCodeA
      )
    : null;

  return (
    <div className="signage-container flex flex-col bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-slate-700 text-white p-3 sm:p-4 flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/10 flex items-center justify-center">
            <Croissant className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <h1 className="text-lg sm:text-2xl font-bold">八ヶ岳高原のパン工房</h1>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => setShowScores(!showScores)}
            className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
              showScores
                ? 'bg-white/20 text-white'
                : 'bg-white/10 text-white/70'
            }`}
            title={showScores ? 'スコア表示中' : 'スコア非表示'}
          >
            {showScores ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            <span>{showScores ? 'デモ表示' : '実掲示'}</span>
          </button>
          <span className="text-sm sm:text-lg font-medium">{season.name}</span>
          <span className="text-lg sm:text-2xl font-bold tabular-nums">
            {currentTime.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </header>

      {/* 時間帯テーマ */}
      <div className="bg-gray-100 py-2 sm:py-3 px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
          <span className="text-base sm:text-xl font-bold text-slate-700">{timeSlot.theme}</span>
        </div>
        <span className="text-sm sm:text-lg text-slate-500">{timeSlot.catchphrase}</span>
      </div>

      {/* メインコンテンツ */}
      <main className="flex-1 p-3 sm:p-6 overflow-auto flex justify-center">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 max-w-5xl w-full">
          {/* メイン推奨商品 */}
          <div className="flex-1 flex flex-col min-w-0">
            {mainProduct && (
              <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 flex flex-col animate-fade-in max-w-3xl h-full">
                <div className="flex justify-between items-start mb-2 flex-shrink-0">
                  <div className="flex items-center gap-2 text-orange-500 font-bold text-sm sm:text-base">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5" />
                    本日のおすすめ
                  </div>
                  {showScores && (
                    <div className="text-right">
                      <div className="text-xl sm:text-2xl font-bold text-orange-500">{mainProduct.score}点</div>
                      <div className="text-xs text-gray-500">推奨スコア</div>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-h-0 mb-3 sm:mb-4 flex items-center justify-center">
                  <img
                    src={getProductImagePath(mainProduct.product.code)}
                    onError={(e) => {
                      e.currentTarget.src = DEFAULT_PRODUCT_IMAGE;
                    }}
                    alt={mainProduct.product.name}
                    className="max-w-full max-h-full object-contain rounded-xl"
                    style={{ height: 'clamp(180px, 30vh, 280px)', width: 'auto' }}
                  />
                </div>

                <h2 className="text-xl sm:text-3xl font-bold text-slate-700 mb-2 flex-shrink-0">
                  {mainProduct.product.name}
                </h2>
                <p className="text-sm sm:text-base text-slate-500 mb-3 flex-shrink-0">{mainProduct.product.description}</p>

                {/* スコア詳細 */}
                {showScores && (
                  <div className="bg-gray-50 rounded-lg p-2 sm:p-3 mb-3 text-xs sm:text-sm flex-shrink-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span className="text-slate-500 w-12">利益率:</span>
                        <div className="flex-1 score-bar">
                          <div
                            className="score-bar-fill bg-orange-400"
                            style={{ width: `${mainProduct.scoreBreakdown.profitScore}%` }}
                          />
                        </div>
                        <span className="font-bold tabular-nums text-slate-600 w-8 text-right">
                          {mainProduct.scoreBreakdown.profitScore.toFixed(0)}%
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span className="text-slate-500 w-12">時間帯:</span>
                        <div className="flex-1 score-bar">
                          <div
                            className="score-bar-fill bg-orange-400"
                            style={{ width: `${mainProduct.scoreBreakdown.timeSlotScore}%` }}
                          />
                        </div>
                        <span className="font-bold tabular-nums text-slate-600 w-8 text-right">
                          {mainProduct.scoreBreakdown.timeSlotScore.toFixed(0)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Thermometer className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span className="text-slate-500 w-12">季節:</span>
                        <div className="flex-1 score-bar">
                          <div
                            className="score-bar-fill bg-orange-400"
                            style={{ width: `${mainProduct.scoreBreakdown.seasonScore}%` }}
                          />
                        </div>
                        <span className="font-bold tabular-nums text-slate-600 w-8 text-right">
                          {mainProduct.scoreBreakdown.seasonScore.toFixed(0)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span className="text-slate-500 w-12">在庫:</span>
                        <div className="flex-1 score-bar">
                          <div
                            className="score-bar-fill bg-orange-400"
                            style={{ width: `${mainProduct.scoreBreakdown.inventoryScore}%` }}
                          />
                        </div>
                        <span className="font-bold tabular-nums text-slate-600 w-8 text-right">
                          {mainProduct.scoreBreakdown.inventoryScore.toFixed(0)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-end flex-shrink-0">
                  <span className="price-text text-2xl sm:text-4xl text-orange-500">
                    ¥{mainProduct.product.price.toLocaleString()}
                  </span>
                  {showScores && (
                    <span className="text-xs sm:text-sm text-slate-500 bg-gray-100 px-2 sm:px-3 py-1 rounded-full">
                      {mainProduct.reason}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* サブ推奨商品 */}
          <div className="w-full lg:w-80 flex flex-col gap-3 sm:gap-4">
            <h3 className="text-base sm:text-lg font-bold text-slate-700">こちらもおすすめ</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
              {subProducts.map((rec, index) => (
                <div
                  key={rec.product.code}
                  className="bg-white rounded-xl shadow-md p-3 sm:p-4 product-card animate-slide-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex gap-3 sm:gap-4">
                    <img
                      src={getProductImagePath(rec.product.code)}
                      onError={(e) => {
                        e.currentTarget.src = DEFAULT_PRODUCT_IMAGE;
                      }}
                      alt={rec.product.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-bold text-slate-700 text-sm sm:text-base truncate">{rec.product.name}</h4>
                        {showScores && (
                          <span className="text-xs sm:text-sm font-bold text-orange-500 flex-shrink-0">{rec.score}点</span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-2">{rec.product.description}</p>
                      <div className="flex justify-between items-center mt-1 sm:mt-2">
                        <span className="price-text text-lg sm:text-xl text-orange-500">
                          ¥{rec.product.price.toLocaleString()}
                        </span>
                        {showScores && (
                          <span className="text-xs text-slate-400">
                            利益率{rec.product.profitMargin.toFixed(0)}%
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* 併売提案バナー */}
      {crossSell && suggestedProduct && (
        <div className="bg-orange-50 border-t border-orange-200 py-3 sm:py-4 px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
            <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
            <span className="text-sm sm:text-lg text-slate-700 text-center">
              こちらもいかがですか？ <span className="font-bold">{suggestedProduct.name}</span>
            </span>
            <span className="price-text text-lg sm:text-xl text-orange-500 font-bold">
              ¥{suggestedProduct.price.toLocaleString()}
            </span>
          </div>
        </div>
      )}

      {/* フッター */}
      <footer className="bg-slate-700 text-white py-2 sm:py-3 px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-2">
        <p className="text-sm sm:text-lg text-center">{season.specialMessage.replace(/^[^\s]+\s/, '')}</p>
        <div className="flex items-center gap-2">
          <Circle className="w-3 h-3 fill-orange-400 text-orange-400 animate-pulse" />
          <span className="text-sm sm:text-base">営業中</span>
        </div>
      </footer>
    </div>
  );
}
