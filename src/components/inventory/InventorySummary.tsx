import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { useDemoContext } from '../../contexts/DemoContext';
import { getInventorySummary } from '../../data/inventory';

export default function InventorySummary() {
  const { inventory } = useDemoContext();
  const summary = getInventorySummary(inventory);

  const cards = [
    {
      label: '充足',
      count: summary.available,
      icon: CheckCircle2,
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      borderColor: 'border-emerald-200',
    },
    {
      label: '在庫少',
      count: summary.low,
      icon: AlertTriangle,
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600',
      borderColor: 'border-amber-200',
    },
    {
      label: '在庫切れ',
      count: summary.out,
      icon: XCircle,
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      borderColor: 'border-red-200',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className={`${card.bgColor} ${card.borderColor} border rounded-lg p-4 flex flex-col items-center`}
          >
            <Icon className={`w-6 h-6 ${card.textColor} mb-2`} />
            <span className={`text-3xl font-bold ${card.textColor}`}>
              {card.count}
            </span>
            <span className="text-sm text-gray-600 mt-1">{card.label}</span>
          </div>
        );
      })}
    </div>
  );
}
