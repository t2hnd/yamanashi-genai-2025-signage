import { Monitor, RefreshCw } from 'lucide-react';
import SignagePage from '../../pages/SignagePage';

export default function MiniSignagePreview() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <Monitor className="w-5 h-5 text-blue-500" />
          <h3 className="font-semibold text-gray-800">サイネージプレビュー</h3>
        </div>
        <span className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
          <RefreshCw className="w-3 h-3" />
          リアルタイム連動
        </span>
      </div>

      {/* プレビューコンテナ */}
      <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ height: '280px' }}>
        <div
          className="absolute inset-0 origin-top-left"
          style={{
            transform: 'scale(0.35)',
            width: '286%',
            height: '286%',
          }}
        >
          <SignagePage />
        </div>
      </div>

      <div className="mt-2 text-xs text-gray-500 text-center">
        在庫変更がサイネージ表示に反映されます
      </div>
    </div>
  );
}
