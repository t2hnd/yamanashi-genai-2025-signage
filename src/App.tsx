import { Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  Monitor,
  SlidersHorizontal,
  Brain,
  Package,
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

export default function App() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Routes>
        <Route path="/" element={<SignagePage />} />
        <Route path="/demo" element={<DemoPage />} />
        <Route path="/logic" element={<LogicPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
      </Routes>
    </div>
  );
}
