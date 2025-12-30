import { f as useState } from './server.mjs';
import { u as useSupabaseClient } from './useSupabaseClient-CkLFOMIR.mjs';

const useProjects = () => {
  const projects = useState("projects", () => []);
  const supabase = useSupabaseClient();
  const fetchProjects = async () => {
    const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
    if (error) {
      console.error("Error fetching projects:", error);
      return;
    }
    if (data) {
      projects.value = data.map((item) => ({
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
      }));
    }
  };
  const getAllProjects = () => projects.value;
  const getProjectBySlug = (slug) => {
    return projects.value.find((p) => p.slug === slug);
  };
  const getAdjacentProjects = (slug) => {
    const index = projects.value.findIndex((p) => p.slug === slug);
    if (index === -1) return { prev: null, next: null };
    return {
      prev: index > 0 ? projects.value[index - 1] : null,
      next: index < projects.value.length - 1 ? projects.value[index + 1] : null
    };
  };
  return {
    projects,
    fetchProjects,
    getAllProjects,
    getProjectBySlug,
    getAdjacentProjects
  };
};

export { useProjects as u };
//# sourceMappingURL=useProjects-BdW4_BiV.mjs.map
