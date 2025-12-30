export interface Note {
    id: string
    title: string
    date: string
    year: string
    month: string
    slug: string
    hidden: boolean
    excerpt: string
    content: string
}

export const useNotes = () => {
    const notes = useState<Note[]>('notes', () => [])
    const supabase = useSupabaseClient()

    const fetchNotes = async () => {
        const { data, error } = await supabase
            .from('notes')
            .select('*')
            .order('date', { ascending: false })

        if (error) {
            console.error('Error fetching notes:', error)
            return
        }

        if (data) {
            notes.value = data
        }
    }

    const getAllNotes = () => notes.value

    const getNoteBySlug = (slug: string) => {
        return notes.value.find(n => n.slug === slug)
    }

    return {
        notes,
        fetchNotes,
        getAllNotes,
        getNoteBySlug
    }
}
