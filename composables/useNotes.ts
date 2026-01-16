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

    const updateNote = async (id: string, content: string) => {
        const { error } = await supabase
            .from('notes')
            // @ts-ignore
            .update({ content })
            .eq('id', id)

        if (error) {
            console.error('Error updating note:', error)
            return false
        }

        // Update local state
        const noteIndex = notes.value.findIndex(n => n.id === id)
        if (noteIndex !== -1 && notes.value[noteIndex]) {
            notes.value[noteIndex].content = content
        }

        return true
    }

    return {
        notes,
        fetchNotes,
        getAllNotes,
        getNoteBySlug,
        updateNote
    }
}
