import { useEffect, useMemo, useState } from 'react';
import { Library } from 'lucide-react';
import type { Book, ReadingStatus } from '@/types';
import { STATUS_META } from '@/types';
import { createBook, loadBooks, saveBooks } from '@/lib/storage';
import { AddBookForm } from '@/components/AddBookForm';
import { BookCard } from '@/components/BookCard';
import { EmptyState } from '@/components/EmptyState';
import { Summary } from '@/components/Summary';

type Filter = ReadingStatus | 'all';

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'want-to-read', label: 'Want to Read' },
  { key: 'reading', label: 'Reading' },
  { key: 'finished', label: 'Finished' },
];

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    setBooks(loadBooks());
  }, []);

  useEffect(() => {
    saveBooks(books);
  }, [books]);

  function addBook(title: string, status: ReadingStatus) {
    setBooks((prev) => [createBook(title, status), ...prev]);
  }

  function changeStatus(id: string, status: ReadingStatus) {
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
  }

  function removeBook(id: string) {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  }

  const visibleBooks = useMemo(() => {
    const sorted = [...books].sort((a, b) => b.addedAt - a.addedAt);
    if (filter === 'all') return sorted;
    return sorted.filter((b) => b.status === filter);
  }, [books, filter]);

  const counts = useMemo(() => {
    const base: Record<Filter, number> = {
      all: books.length,
      'want-to-read': 0,
      reading: 0,
      finished: 0,
    };
    for (const b of books) base[b.status]++;
    return base;
  }, [books]);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* Header */}
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-5 sm:px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-900 text-white">
            <Library className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">Reading List</h1>
            <p className="text-xs text-neutral-500">
              Track books across your study journey
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-8">
        {/* Add form */}
        <AddBookForm onAdd={addBook} existingBooks={books} />

        {/* Summary */}
        {books.length > 0 && (
          <div className="mt-6">
            <Summary
              total={counts.all}
              reading={counts.reading}
              finished={counts.finished}
            />
          </div>
        )}

        {/* Filters */}
        {books.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {FILTERS.map((f) => {
              const active = filter === f.key;
              const dot =
                f.key !== 'all' ? STATUS_META[f.key as ReadingStatus].dotClass : '';
              return (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                    active
                      ? 'bg-neutral-900 text-white'
                      : 'bg-white text-neutral-600 ring-1 ring-neutral-200 hover:bg-neutral-100'
                  }`}
                >
                  {dot && <span className={`h-2 w-2 rounded-full ${dot}`} />}
                  {f.label}
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums ${
                      active ? 'bg-white/20' : 'bg-neutral-100 text-neutral-500'
                    }`}
                  >
                    {counts[f.key]}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* List / Empty */}
        <div className="mt-6">
          {books.length === 0 ? (
            <EmptyState />
          ) : visibleBooks.length === 0 ? (
            <p className="py-12 text-center text-sm text-neutral-400">
              No books in this category.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {visibleBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onStatusChange={changeStatus}
                  onRemove={removeBook}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
