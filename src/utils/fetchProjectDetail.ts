import { supabase } from "@/supabase/supabaseClient";
import { Dispatch, SetStateAction } from "react";

export const fetchProjectDetail = async (
  projectId: string | string[] | undefined,
  setProject: (arg0: any) => void,
  setLoading: Dispatch<SetStateAction<boolean>>
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
    // setLoading("There was an error loading data.");
    console.log(error)
    
  };
};
