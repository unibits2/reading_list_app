import { useState } from 'react';
import { Plus } from 'lucide-react';
import { STATUS_META, STATUS_ORDER, type Book, type ReadingStatus } from '@/types';

interface AddBookFormProps {
  onAdd: (title: string, status: ReadingStatus) => void;
  existingBooks: Book[];
}

const MAX_TITLE_LENGTH = 60;

export function AddBookForm({ onAdd, existingBooks }: AddBookFormProps) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<ReadingStatus>('want-to-read');
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = title.trim().replace(/\s+/g, ' ');
    if (!trimmed) {
      setError('Please enter a book title.');
      return;
    }
    if (trimmed.length > MAX_TITLE_LENGTH) {
      setError('Book title must be 60 characters or fewer.');
      return;
    }
    const isDuplicate = existingBooks.some(
      (b) => b.title.trim().replace(/\s+/g, ' ').toLowerCase() === trimmed.toLowerCase()
    );
    if (isDuplicate) {
      setError('This book is already in your reading list.');
      return;
    }
    onAdd(trimmed, status);
    setTitle('');
    setStatus('want-to-read');
    setError('');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-5"
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError('');
          }}
          placeholder="Book title…"
          className="flex-1 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-900 outline-none transition focus:border-neutral-400 focus:bg-white focus:ring-2 focus:ring-neutral-900/5"
        />
        <div className="flex gap-2 sm:gap-1.5">
          {STATUS_ORDER.map((s) => {
            const meta = STATUS_META[s];
            const active = status === s;
            return (
              <button
                key={s}
                type="button"
                onClick={() => setStatus(s)}
                className={`flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl px-3 py-2.5 text-xs font-semibold transition sm:flex-none ${
                  active
                    ? meta.filterActive
                    : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${meta.dotClass}`} />
                {meta.label}
              </button>
            );
          })}
        </div>
      </div>
      {error && <p className="mt-2 text-xs font-medium text-red-500">{error}</p>}
      <button
        type="submit"
        className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-700 active:scale-[.99] sm:w-auto"
      >
        <Plus className="h-4 w-4" />
        Add to list
      </button>
    </form>
  );
}
