import { ICompany, IProject, IUser } from "@/app/interfaces/interfaces";
import { supabase } from "@/supabase/supabaseClient";
import { Dispatch, SetStateAction } from "react";

export const fetchUsersAndProjects = async (
  companyId: string | string[] | undefined,
  setCompanyName: Dispatch<SetStateAction<ICompany | null | undefined>>,
  setProjects: Dispatch<SetStateAction<IProject[] | null>>,
  setUserName: Dispatch<SetStateAction<IUser[] | null>>,
  setLoading: Dispatch<SetStateAction<boolean>>
 ) => {

  try {
    const { data: dataCompany, error: errorDataCompany } = await supabase
    .from("empresas")
    .select("*")
    .eq("id", companyId)
    .single()

    const {data: dataUser, error: errorDataUser} = await supabase
    .from("usuarios")
    .select("*")
    .eq("empresa_id", companyId)

    const {data: dataProjects, error: errorDataProjects} = await supabase
    .from("proyectos")
    .select("*")
    .eq("empresa_id", companyId)


    if(errorDataCompany || errorDataUser || errorDataProjects ) {
      console.log("error al cargar datos desde supabase")
    }

    setLoading(false);
    setCompanyName(dataCompany);
    setUserName(dataUser);
    setProjects(dataProjects)
    
  } catch (error) {
    console.log("error desde el try and catch")
  };
};