import { IProject } from "@/app/interfaces/interfaces";
import { supabase } from "@/supabase/supabaseClient";
import { SetStateAction } from "react";

export const fetchProjectDetail = async (
  projectId: any,
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
