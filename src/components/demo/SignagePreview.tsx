import { Monitor, RefreshCw } from 'lucide-react';
import SignagePage from '../../pages/SignagePage';

export default function SignagePreview() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-gray-800 text-sm tracking-wide uppercase flex items-center gap-2">
          <Monitor className="w-4 h-4 text-bakery-primary" />
          サイネージプレビュー
        </h3>
        <span className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
          <RefreshCw className="w-3 h-3" />
          リアルタイム連動
        </span>
      </div>

      {/* プレビューコンテナ */}
      <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden relative">
        {/* スケール用のコンテナ */}
        <div
          className="absolute inset-0 origin-top-left"
          style={{
            transform: 'scale(0.55)',
            width: '182%',
            height: '182%',
          }}
        >
          <SignagePage />
        </div>
      </div>

      {/* ヒント */}
      <div className="mt-2 text-xs text-gray-500 text-center">
        左のコントロールを操作すると、このプレビューがリアルタイムで更新されます
      </div>
    </div>
  );
}
