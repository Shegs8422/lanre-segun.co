import { u as useSupabaseClient } from './useSupabaseClient-CkLFOMIR.mjs';
import { f as useState } from './server.mjs';

const useGallery = () => {
  const supabase = useSupabaseClient();
  const galleryItems = useState("gallery-items", () => []);
  const fetchGallery = async () => {
    try {
      const { data, error } = await supabase.from("gallery").select("*").order("order_index", { ascending: true });
      if (error) throw error;
      galleryItems.value = data || [];
    } catch (e) {
      console.error("Gallery Fetch Error:", e);
    }
  };
  return {
    galleryItems,
    fetchGallery
  };
};

export { useGallery as u };
//# sourceMappingURL=useGallery-DEZYYCOP.mjs.map
