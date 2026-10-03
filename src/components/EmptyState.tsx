import { BookOpen } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-white/60 px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100">
        <BookOpen className="h-7 w-7 text-neutral-400" />
      </div>
      <p className="mt-4 max-w-xs text-sm font-medium text-neutral-600">
        Your reading list is empty. Add your first book.
      </p>
    </div>
  );
}
