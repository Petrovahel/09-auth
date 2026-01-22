import { QueryClient, dehydrate } from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';
import type { Metadata } from "next";


type PageProps = {
  params: {
    slug: string[];
  };
};
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const tag = params.slug?.[0] ?? 'all';

  return {
    title: `NoteHub — ${tag}`,
    description: `Notes filtered by tag: ${tag}`,
    openGraph: {
      title: `NoteHub — ${tag}`,
      description: `Notes filtered by tag: ${tag}`,
      url: `https://notehub.com/notes/filter/${tag}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `Filter ${tag}`,
        },
      ],
    },
  };
}

export default async function NotesByTagPage({ params }: PageProps) {
  const { slug } = await params;
  const tag = slug?.[0] ?? 'all';

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, 12, '', tag],
    queryFn: () =>
      fetchNotes(1, 12, '', tag === 'all' ? undefined : tag),
  });

  return (
    <NotesClient
      tag={tag}
      dehydratedState={dehydrate(queryClient)}
    />
  );
}
