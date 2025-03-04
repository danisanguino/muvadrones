import { supabase } from "@/supabase/supabaseClient";

export const fetchProjectDetail = async (
  projectId: string | string[] | undefined,
  setProject: (arg0: any) => void,
  setLoading: (arg0: string) => void
) => {

  try {
    const { data, error} = await supabase
    .from("proyectos")
    .select("*")
    .eq("id", projectId)
    .single();

    if(error) {
      alert("Error loading project data.");
      return;
    };

    setProject(data);
    
  } catch (error) {
    setLoading("There was an error loading data.");
    console.log(error)
    
  };
};
