import type { Metadata } from "next";
import CreateNote from "@/components/CreateNote/CreateNote";

export const metadata: Metadata = {
  title: "Create note — NoteHub",
  description: "Create new note in NoteHub",
  openGraph: {
    title: "Create note — NoteHub",
      description: "Create new note in NoteHub",
      url: "https://notehub.com/notes/action/create",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub — Create note",
        },
    ],
  },
};


export default function CreateNotePage() {
  return <CreateNote />;
}
