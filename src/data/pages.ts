import { PageConfig } from '../types';

export const pages: PageConfig[] = [
  {
    id: 'signage',
    path: '/',
    name: 'サイネージ',
    icon: 'monitor',
    description: '店頭表示用メイン画面'
  },
  {
    id: 'demo',
    path: '/demo',
    name: 'デモ操作',
    icon: 'sliders',
    description: '時間・季節・在庫をシミュレーション'
  },
  {
    id: 'logic',
    path: '/logic',
    name: '推奨ロジック',
    icon: 'brain',
    description: 'AIの推奨理由を可視化'
  },
  {
    id: 'inventory',
    path: '/inventory',
    name: '在庫管理',
    icon: 'package',
    description: '在庫状況とサイネージ連動'
  },
  {
    id: 'items',
    path: '/items',
    name: '商品マスタ',
    icon: 'image',
    description: '全商品の画像一覧'
  }
];

export function getPageByPath(path: string): PageConfig | undefined {
  return pages.find(p => p.path === path);
}
