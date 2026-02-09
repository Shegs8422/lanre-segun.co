export interface BlogPost {
    id: string
    title: string
    date: string
    year: string
    month: string
    slug: string
    hidden: boolean
    excerpt: string
    content: string
    subtitle?: string
    cover_image?: string
    tags?: string[]
    reading_time?: string
    featured?: boolean
}

export const useBlog = () => {
    const posts = useState<BlogPost[]>('posts', () => [])
    const supabase = useSupabaseClient()

    const fetchPosts = async () => {
        const { data, error } = await supabase
            .from('blog')
            .select('*')
            .order('date', { ascending: false })

        if (error) {
            console.error('Error fetching blog posts:', error)
            return
        }

        if (data) {
            posts.value = data
        }
    }

    const getAllPosts = () => posts.value

    const getPostBySlug = (slug: string) => {
        return posts.value.find(p => p.slug === slug)
    }

    const createPost = async (post: Omit<BlogPost, 'id'>) => {
        const { data, error } = await supabase
            .from('blog')
            // @ts-expect-error - 'notes' table might not exist in types yet)
            .insert(post)
            .select()
            .single()

        if (error) {
            console.error('Error creating blog post:', error)
            return null
        }

        if (data) {
            posts.value.unshift(data)
            return data
        }
        return null
    }

    const updatePost = async (id: string, updates: Partial<BlogPost>) => {
        const { error } = await supabase
            .from('blog')
            // @ts-expect-error - 'notes' table might not exist in types yet
            .update(updates)
            .eq('id', id)

        if (error) {
            console.error('Error updating blog post:', error)
            return false
        }

        // Update local state
        const postIndex = posts.value.findIndex(p => p.id === id)
        if (postIndex !== -1 && posts.value[postIndex]) {
            Object.assign(posts.value[postIndex], updates)
        }

        return true
    }

    const deletePost = async (id: string) => {
        const { error } = await supabase
            .from('blog')
            .delete()
            .eq('id', id)

        if (error) {
            console.error('Error deleting blog post:', error)
            return false
        }

        posts.value = posts.value.filter(p => p.id !== id)
        return true
    }

    return {
        posts,
        fetchPosts,
        getAllPosts,
        getPostBySlug,
        createPost,
        updatePost,
        deletePost
    }
}
