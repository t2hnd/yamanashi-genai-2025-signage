/**
 * 商品画像パスユーティリティ
 */

// デフォルト画像パス（該当画像がない場合に表示）
export const DEFAULT_PRODUCT_IMAGE = '/images/products/101060.jpg';

/**
 * 商品コードから画像パスを取得
 */
export function getProductImagePath(productCode: number): string {
  return `/images/products/${productCode}.jpg`;
}
