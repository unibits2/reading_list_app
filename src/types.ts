export type ReadingStatus = 'want-to-read' | 'reading' | 'finished';

export interface Book {
  id: string;
  title: string;
  status: ReadingStatus;
  addedAt: number;
}

export const STATUS_META: Record<
  ReadingStatus,
  { label: string; dotClass: string; badgeClass: string; filterActive: string }
> = {
  'want-to-read': {
    label: 'Want to Read',
    dotClass: 'bg-amber-400',
    badgeClass: 'bg-amber-100 text-amber-700',
    filterActive: 'bg-amber-500 text-white',
  },
  reading: {
    label: 'Reading',
    dotClass: 'bg-sky-500',
    badgeClass: 'bg-sky-100 text-sky-700',
    filterActive: 'bg-sky-500 text-white',
  },
  finished: {
    label: 'Finished',
    dotClass: 'bg-emerald-500',
    badgeClass: 'bg-emerald-100 text-emerald-700',
    filterActive: 'bg-emerald-500 text-white',
  },
};

export const STATUS_ORDER: ReadingStatus[] = ['want-to-read', 'reading', 'finished'];
