export const useGallery = () => {
    const supabase = useSupabaseClient()
    const galleryItems = useState<any[]>('gallery-items', () => [])

    const fetchGallery = async () => {
        try {
            const { data, error } = await supabase
                .from('gallery')
                .select('*')
                .order('order_index', { ascending: true })

            if (error) throw error
            galleryItems.value = data || []
        } catch (e) {
            console.error('Gallery Fetch Error:', e)
        }
    }

    return {
        galleryItems,
        fetchGallery
    }
}
