import { BookMarked, BookOpen, CheckCircle2 } from 'lucide-react';

interface SummaryProps {
  total: number;
  reading: number;
  finished: number;
}

export function Summary({ total, reading, finished }: SummaryProps) {
  const stats = [
    {
      label: 'Total Books',
      value: total,
      icon: BookMarked,
      iconClass: 'text-neutral-500',
      bgClass: 'bg-neutral-100',
    },
    {
      label: 'Currently Reading',
      value: reading,
      icon: BookOpen,
      iconClass: 'text-sky-600',
      bgClass: 'bg-sky-100',
    },
    {
      label: 'Finished',
      value: finished,
      icon: CheckCircle2,
      iconClass: 'text-emerald-600',
      bgClass: 'bg-emerald-100',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="flex flex-col items-center gap-1.5 rounded-2xl border border-neutral-200 bg-white p-3 text-center shadow-sm sm:flex-row sm:gap-3 sm:px-4 sm:py-3.5"
          >
            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${stat.bgClass}`}>
              <Icon className={`h-4 w-4 ${stat.iconClass}`} />
            </div>
            <div className="min-w-0">
              <p className="text-xl font-bold leading-none tabular-nums text-neutral-900 sm:text-2xl">
                {stat.value}
              </p>
              <p className="mt-1 text-[10px] font-medium leading-tight text-neutral-500 sm:text-xs">
                {stat.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
