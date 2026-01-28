import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { pages } from './data/pages';
import SignagePage from './pages/SignagePage';
import DemoPage from './pages/DemoPage';

function Navigation() {
  const location = useLocation();
  
  return (
    <nav className="bg-bakery-primary text-white p-2">
      <div className="flex gap-2 overflow-x-auto">
        {pages.map(page => (
          <Link
            key={page.id}
            to={page.path}
            className={`nav-link whitespace-nowrap flex items-center gap-1 ${
              location.pathname === page.path ? 'active' : ''
            }`}
          >
            <span>{page.icon}</span>
            <span className="hidden sm:inline">{page.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

function PlaceholderPage({ title, description }: { title: string, description: string }) {
  return (
    <div className="min-h-screen bg-bakery-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-bakery-primary mb-4">{title}</h1>
        <p className="text-gray-600 mb-8">{description}</p>
        <div className="bg-white rounded-lg p-8 shadow-lg">
          <p className="text-center text-gray-400">
            🚧 このページは実装予定です
          </p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Routes>
        <Route path="/" element={<SignagePage />} />
        <Route path="/demo" element={<DemoPage />} />
        <Route path="/logic" element={<PlaceholderPage title="🧠 推奨ロジック" description="AIの推奨理由を可視化" />} />
        <Route path="/inventory" element={<PlaceholderPage title="📦 在庫管理" description="在庫状況とサイネージ連動" />} />
        <Route path="/network" element={<PlaceholderPage title="🔗 併売分析" description="商品間の併売関係を可視化" />} />
        <Route path="/simulator" element={<PlaceholderPage title="📈 利益シミュレーター" description="施策効果を数値で確認" />} />
      </Routes>
    </div>
  );
}
