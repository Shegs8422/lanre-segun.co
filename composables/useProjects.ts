export interface Project {
    slug: string
    title: string
    subtitle: string
    date: string
    year: string
    description: string
    coverImage: string
    // Sophisticated CMS Fields
    client?: string
    industry?: string
    duration?: string
    role?: string
    teamSize?: string
    problemStatement?: string
    businessGoal?: string
    userGoal?: string
    targetUsers?: string
    designApproach?: string
    researchMethods?: string
    keyInsights?: string
    wireframes?: string[]
    finalDesigns?: string[]
    solutionSummary?: string
    outcome?: string
    learnings?: string
    tools?: string[]
    tags?: string[]
    featured?: boolean
    projectLink?: string
    isFigma?: boolean
    content: {
        heroImage?: string
        introduction: string
        sections: {
            type: 'image' | 'text' | 'grid'
            content?: string
            image?: string
            images?: string[]
            caption?: string
            title?: string
        }[]
        results: {
            metrics: {
                label: string
                value: string
            }[]
            description: string
        }
    }
}

export const useProjects = () => {
    const projects = useState<Project[]>('projects', () => [])
    const supabase = useSupabaseClient()

    const fetchProjects = async () => {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Error fetching projects:', error)
            return
        }

        if (data) {
            projects.value = data.map((item: any) => ({
                ...item,
                coverImage: item.cover_image,
                teamSize: item.team_size,
                problemStatement: item.problem_statement,
                businessGoal: item.business_goal,
                userGoal: item.user_goal,
                targetUsers: item.target_users,
                designApproach: item.design_approach,
                researchMethods: item.research_methods,
                keyInsights: item.key_insights,
                finalDesigns: item.final_designs,
                solutionSummary: item.solution_summary,
                projectLink: item.project_link,
                isFigma: item.is_figma
            }))
        }
    }

    const getAllProjects = () => projects.value

    const getProjectBySlug = (slug: string) => {
        return projects.value.find(p => p.slug === slug)
    }

    // Helper to get previous/next project
    const getAdjacentProjects = (slug: string) => {
        const index = projects.value.findIndex(p => p.slug === slug)
        if (index === -1) return { prev: null, next: null }

        return {
            prev: index > 0 ? projects.value[index - 1] : null,
            next: index < projects.value.length - 1 ? projects.value[index + 1] : null
        }
    }

    return {
        projects,
        fetchProjects,
        getAllProjects,
        getProjectBySlug,
        getAdjacentProjects
    }
}
