'use client';

import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import Link from 'next/link';
import { fetchNotes } from '@/lib/api/clientApi';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import Loading from '@/components/Loading/Loading';
import Error from '@/components/Error/Error';
import { useDebouncedCallback } from 'use-debounce';
import { NoteTag } from '@/types/note';
import css from './NotesPage.module.css';

type NotesContentProps = {
  tag: string;
  perPage?: number;
};

export default function NotesContent({ tag, perPage = 12 }: NotesContentProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const debounceSearch = useDebouncedCallback((value: string) => {
    setDebouncedSearch(value);
    setPage(1);
  }, 500);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    debounceSearch(value);
  };

  const noteTag: NoteTag | undefined = tag === 'all' ? undefined : (tag as NoteTag);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', page, perPage, debouncedSearch, noteTag],
    queryFn: () => fetchNotes(page, perPage, debouncedSearch, noteTag),
    placeholderData: keepPreviousData,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />

        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}

        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      {isLoading && <Loading />}
      {isError && <Error message="Error fetching notes." />}
      {data && data.notes.length === 0 && <p>No notes found.</p>}
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}
