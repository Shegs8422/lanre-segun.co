import { e as useState } from './server.mjs';
import { u as useSupabaseClient } from './useSupabaseClient-CkLFOMIR.mjs';

const useNotes = () => {
  const notes = useState("notes", () => []);
  const supabase = useSupabaseClient();
  const fetchNotes = async () => {
    const { data, error } = await supabase.from("notes").select("*").order("date", { ascending: false });
    if (error) {
      console.error("Error fetching notes:", error);
      return;
    }
    if (data) {
      notes.value = data;
    }
  };
  const getAllNotes = () => notes.value;
  const getNoteBySlug = (slug) => {
    return notes.value.find((n) => n.slug === slug);
  };
  return {
    notes,
    fetchNotes,
    getAllNotes,
    getNoteBySlug
  };
};

export { useNotes as u };
//# sourceMappingURL=useNotes-Ddzju8C2.mjs.map
