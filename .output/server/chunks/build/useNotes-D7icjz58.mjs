import { e as useState } from './server.mjs';
import { u as useSupabaseClient } from './useSupabaseClient-xv77-Kdn.mjs';

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
  const updateNote = async (id, content) => {
    const { error } = await supabase.from("notes").update({ content }).eq("id", id);
    if (error) {
      console.error("Error updating note:", error);
      return false;
    }
    const noteIndex = notes.value.findIndex((n) => n.id === id);
    if (noteIndex !== -1) {
      notes.value[noteIndex].content = content;
    }
    return true;
  };
  return {
    notes,
    fetchNotes,
    getAllNotes,
    getNoteBySlug,
    updateNote
  };
};

export { useNotes as u };
//# sourceMappingURL=useNotes-D7icjz58.mjs.map
