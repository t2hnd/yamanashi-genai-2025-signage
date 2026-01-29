import { Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  Monitor,
  SlidersHorizontal,
  Brain,
  Package,
  Network,
  TrendingUp,
  Construction
} from 'lucide-react';
import { pages } from './data/pages';
import SignagePage from './pages/SignagePage';
import DemoPage from './pages/DemoPage';
import LogicPage from './pages/LogicPage';
import InventoryPage from './pages/InventoryPage';

const iconMap: Record<string, React.ReactNode> = {
  monitor: <Monitor className="w-4 h-4" />,
  sliders: <SlidersHorizontal className="w-4 h-4" />,
  brain: <Brain className="w-4 h-4" />,
  package: <Package className="w-4 h-4" />,
  network: <Network className="w-4 h-4" />,
  chart: <TrendingUp className="w-4 h-4" />,
};

function Navigation() {
  const location = useLocation();

  return (
    <nav className="bg-bakery-primary text-white px-4 py-2 border-b border-bakery-primary/80">
      <div className="flex gap-1 overflow-x-auto">
        {pages.map(page => {
          const isActive = location.pathname === page.path;
          return (
            <Link
              key={page.id}
              to={page.path}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                isActive
                  ? 'bg-white/20 text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {iconMap[page.icon]}
              <span className="hidden sm:inline">{page.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function PlaceholderPage({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-bakery-primary/10 flex items-center justify-center text-bakery-primary">
            {icon}
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        </div>
        <p className="text-gray-500 mb-8 ml-13">{description}</p>
        <div className="bg-white rounded-lg p-12 shadow-sm border border-gray-100">
          <div className="text-center text-gray-400">
            <Construction className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium">このページは実装予定です</p>
            <p className="text-sm mt-1">Coming soon...</p>
          </div>
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
        <Route path="/logic" element={<LogicPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route
          path="/network"
          element={
            <PlaceholderPage
              title="併売分析"
              description="商品間の併売関係を可視化"
              icon={<Network className="w-5 h-5" />}
            />
          }
        />
        <Route
          path="/simulator"
          element={
            <PlaceholderPage
              title="利益シミュレーター"
              description="施策効果を数値で確認"
              icon={<TrendingUp className="w-5 h-5" />}
            />
          }
        />
      </Routes>
    </div>
  );
}
