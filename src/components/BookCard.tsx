import { Check, Trash2 } from 'lucide-react';
import { STATUS_META, STATUS_ORDER, type Book, type ReadingStatus } from '@/types';

interface BookCardProps {
  book: Book;
  onStatusChange: (id: string, status: ReadingStatus) => void;
  onRemove: (id: string) => void;
}

export function BookCard({ book, onStatusChange, onRemove }: BookCardProps) {
  const meta = STATUS_META[book.status];

  return (
    <div className="group flex flex-col rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold leading-snug text-neutral-900">
            {book.title}
          </h3>
          <span
            className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${meta.badgeClass}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${meta.dotClass}`} />
            {meta.label}
          </span>
        </div>
        <button
          onClick={() => onRemove(book.id)}
          aria-label={`Remove ${book.title}`}
          className="shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 px-2.5 py-1.5 text-xs font-semibold text-neutral-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Delete
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {STATUS_ORDER.map((s) => {
          const m = STATUS_META[s];
          const active = book.status === s;
          return (
            <button
              key={s}
              onClick={() => onStatusChange(book.id, s)}
              className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition ${
                active
                  ? m.filterActive
                  : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
              }`}
            >
              {active && <Check className="h-3 w-3" />}
              {m.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
