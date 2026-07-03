export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Tables {
  blog: {
    Row: {
      id: string
      title: string
      slug: string
      date: string
      year: string
      month: string
      hidden: boolean
      excerpt: string
      content: string
      subtitle: string | null
      cover_image: string | null
      tags: string[] | null
      reading_time: string | null
      featured: boolean | null
      created_at: string
      updated_at: string
    }
    Insert: {
      id?: string
      title: string
      slug: string
      date: string
      year: string
      month: string
      hidden?: boolean
      excerpt?: string
      content?: string
      subtitle?: string | null
      cover_image?: string | null
      tags?: string[] | null
      reading_time?: string | null
      featured?: boolean | null
      created_at?: string
      updated_at?: string
    }
    Update: {
      id?: string
      title?: string
      slug?: string
      date?: string
      year?: string
      month?: string
      hidden?: boolean
      excerpt?: string
      content?: string
      subtitle?: string | null
      cover_image?: string | null
      tags?: string[] | null
      reading_time?: string | null
      featured?: boolean | null
      created_at?: string
      updated_at?: string
    }
  }

  projects: {
    Row: {
      id: string
      slug: string
      title: string
      subtitle: string | null
      date: string | null
      year: string | null
      description: string | null
      cover_image: string | null
      cover_image_alt: string | null
      client: string | null
      industry: string | null
      duration: string | null
      role: string | null
      team_size: string | null
      problem_statement: string | null
      business_goal: string | null
      user_goal: string | null
      target_users: string | null
      design_approach: string | null
      research_methods: string | null
      key_insights: string | null
      wireframes: string[] | null
      final_designs: string[] | null
      solution_summary: string | null
      outcome: string | null
      learnings: string | null
      tools: string[] | null
      tags: string[] | null
      tech_stack: string[] | null
      featured: boolean | null
      hidden: boolean | null
      project_link: string | null
      is_figma: boolean | null
      content: Json | null
      challenge: string | null
      architecture: string | null
      implementation_highlights: string | null
      repository_url: string | null
      live_demo_url: string | null
      performance_metrics: string | null
      created_at: string
      updated_at: string
    }
    Insert: {
      id?: string
      slug: string
      title: string
      subtitle?: string | null
      date?: string | null
      year?: string | null
      description?: string | null
      cover_image?: string | null
      cover_image_alt?: string | null
      client?: string | null
      industry?: string | null
      duration?: string | null
      role?: string | null
      team_size?: string | null
      problem_statement?: string | null
      business_goal?: string | null
      user_goal?: string | null
      target_users?: string | null
      design_approach?: string | null
      research_methods?: string | null
      key_insights?: string | null
      wireframes?: string[] | null
      final_designs?: string[] | null
      solution_summary?: string | null
      outcome?: string | null
      learnings?: string | null
      tools?: string[] | null
      tags?: string[] | null
      tech_stack?: string[] | null
      featured?: boolean | null
      hidden?: boolean | null
      project_link?: string | null
      is_figma?: boolean | null
      content?: Json | null
      challenge?: string | null
      architecture?: string | null
      implementation_highlights?: string | null
      repository_url?: string | null
      live_demo_url?: string | null
      performance_metrics?: string | null
      created_at?: string
      updated_at?: string
    }
    Update: {
      id?: string
      slug?: string
      title?: string
      subtitle?: string | null
      date?: string | null
      year?: string | null
      description?: string | null
      cover_image?: string | null
      cover_image_alt?: string | null
      client?: string | null
      industry?: string | null
      duration?: string | null
      role?: string | null
      team_size?: string | null
      problem_statement?: string | null
      business_goal?: string | null
      user_goal?: string | null
      target_users?: string | null
      design_approach?: string | null
      research_methods?: string | null
      key_insights?: string | null
      wireframes?: string[] | null
      final_designs?: string[] | null
      solution_summary?: string | null
      outcome?: string | null
      learnings?: string | null
      tools?: string[] | null
      tags?: string[] | null
      tech_stack?: string[] | null
      featured?: boolean | null
      hidden?: boolean | null
      project_link?: string | null
      is_figma?: boolean | null
      content?: Json | null
      challenge?: string | null
      architecture?: string | null
      implementation_highlights?: string | null
      repository_url?: string | null
      live_demo_url?: string | null
      performance_metrics?: string | null
      created_at?: string
      updated_at?: string
    }
  }

  gallery: {
    Row: {
      id: number
      url: string
      caption: string | null
      order_index: number | null
      created_at: string
    }
    Insert: {
      id?: number
      url: string
      caption?: string | null
      order_index?: number | null
      created_at?: string
    }
    Update: {
      id?: number
      url?: string
      caption?: string | null
      order_index?: number | null
      created_at?: string
    }
  }

  security_questions: {
    Row: {
      id: string
      question_1: string
      answer_1_hash: string
      question_2: string
      answer_2_hash: string
      question_3: string
      answer_3_hash: string
      password_override: string | null
      created_at: string
      updated_at: string
    }
    Insert: {
      id: string
      question_1: string
      answer_1_hash: string
      question_2: string
      answer_2_hash: string
      question_3: string
      answer_3_hash: string
      password_override?: string | null
      created_at?: string
      updated_at?: string
    }
    Update: {
      id?: string
      question_1?: string
      answer_1_hash?: string
      question_2?: string
      answer_2_hash?: string
      question_3?: string
      answer_3_hash?: string
      password_override?: string | null
      created_at?: string
      updated_at?: string
    }
  }
}

export type Database = {
  public: {
    Tables: Tables
  }
}
