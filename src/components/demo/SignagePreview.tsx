import SignagePage from '../../pages/SignagePage';

export default function SignagePreview() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-bakery-primary flex items-center gap-2">
          <span>📺</span>
          <span>サイネージプレビュー</span>
        </h3>
        <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
          リアルタイム連動
        </span>
      </div>

      {/* プレビューコンテナ */}
      <div className="flex-1 bg-white rounded-xl shadow-lg overflow-hidden relative">
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
