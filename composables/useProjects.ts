export interface Project {
    slug: string
    title: string
    subtitle: string
    date: string
    description: string
    coverImage: string
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
    const projects: Project[] = [
        {
            slug: 'fintech-dashboard',
            title: 'Stone Payment Terminal',
            subtitle: 'Fintech Dashboard',
            date: 'October 10, 2024',
            description: 'Designing a comprehensive financial management platform for SMEs with real-time analytics and seamless transaction oversight.',
            coverImage: '/images/projects/project-1.png', // Assuming this exists or using placeholder
            content: {
                heroImage: '/images/projects/project-1.png',
                introduction: 'In 2024, we set out to build one of the most ambitious products in Stone\'s history. A new point-of-sale (POS) product that helps merchants issue invoices, track sales, manage cash flow, and control inventory all in one place.',
                sections: [
                    {
                        type: 'image',
                        image: '/images/projects/project-1.png', // Placeholder for the dashboard UI
                        caption: 'Main Dashboard View'
                    },
                    {
                        type: 'text',
                        content: 'It all started with understanding the core needs of small retailers. The ability to issue electronic invoices quickly was paramount, but they also needed a simple way to track their daily sales without complex software.'
                    },
                    {
                        type: 'image', // Placeholder for the analytics view in the design
                        image: '/images/projects/project-1.png',
                        caption: 'Analytics Overview'
                    }
                ],
                results: {
                    description: 'After launch, adoption and activation exceeded expectations. In the first 90 days we onboarded tens of thousands of small retailers, saw a strong lift in conversion from setup to first sale, and merchants created a large volume of SKUs—evidence that the workflow fit real inventory needs.',
                    metrics: [
                        { label: 'Companies', value: '+67,428' },
                        { label: 'Conversion', value: '+62%' },
                        { label: 'Products created', value: '+41,805' }
                    ]
                }
            }
        },
        {
            slug: 'ecommerce-redesign',
            title: 'E-commerce Redesign',
            subtitle: 'Fashion Store',
            date: 'September 15, 2024',
            description: 'Reimagining the online shopping experience for modern consumers, focusing on mobile-first navigation and sophisticated aesthetic.',
            coverImage: '/images/projects/project-2.png',
            content: {
                introduction: 'A complete overhaul of the shopping experience, focusing on conversion and brand storytelling.',
                sections: [],
                results: {
                    description: 'Significant improvements in cart abandonment rates and mobile conversion.',
                    metrics: [
                        { label: 'Conversion', value: '+15%' },
                        { label: 'Mobile Traffic', value: '+40%' }
                    ]
                }
            }
        },
        {
            slug: 'mobile-banking',
            title: 'Mobile Banking App',
            subtitle: 'Finance',
            date: 'August 20, 2024',
            description: 'Building a seamless mobile banking experience with intuitive user flows, biometric security, and personalized financial insights.',
            coverImage: '/images/projects/project-3.png',
            content: {
                introduction: 'Redefining personal banking for the digital age.',
                sections: [],
                results: {
                    description: 'User engagement increased significantly after the redesign.',
                    metrics: [
                        { label: 'Active Users', value: '+25%' },
                        { label: 'Session Time', value: '+10%' }
                    ]
                }
            }
        },
        {
            slug: 'saas-platform',
            title: 'SaaS Platform',
            subtitle: 'B2B Productivity',
            date: 'July 05, 2024',
            description: 'Creating a scalable design system for a B2B productivity platform that empowers teams to collaborate and deliver high-impact results.',
            coverImage: '/images/projects/project-4.png',
            content: {
                introduction: 'Streamlining workflow for enterprise teams.',
                sections: [],
                results: {
                    description: 'Improved team collaboration and reduced task completion time.',
                    metrics: [
                        { label: 'Efficiency', value: '+30%' },
                        { label: 'Adoption Rate', value: '+85%' }
                    ]
                }
            }
        },
        {
            slug: 'healthcare-portal',
            title: 'Healthcare Portal',
            subtitle: 'Medical Tech',
            date: 'June 12, 2024',
            description: 'Designing patient-centered digital health solutions that streamline data access and improve interactions between patients and providers.',
            coverImage: '/images/projects/project-5.png',
            content: {
                introduction: 'Bridging the gap between patients and providers.',
                sections: [],
                results: {
                    description: 'Patient satisfaction scores increased dramatically.',
                    metrics: [
                        { label: 'Satisfaction', value: '4.8/5' },
                        { label: 'Appts Booked', value: '+120%' }
                    ]
                }
            }
        }
    ]

    const getAllProjects = () => projects

    const getProjectBySlug = (slug: string) => {
        return projects.find(p => p.slug === slug)
    }

    // Helper to get previous/next project
    const getAdjacentProjects = (slug: string) => {
        const index = projects.findIndex(p => p.slug === slug)
        if (index === -1) return { prev: null, next: null }

        return {
            prev: index > 0 ? projects[index - 1] : null,
            next: index < projects.length - 1 ? projects[index + 1] : null
        }
    }

    return {
        projects,
        getAllProjects,
        getProjectBySlug,
        getAdjacentProjects
    }
}
