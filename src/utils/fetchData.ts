import { ICompany, IUser, IProject } from "@/app/interfaces/interfaces";
import { supabase } from "@/supabase/supabaseClient";
import { SetStateAction } from "react";

export const fetchData = async (
  companyId: string | string[] | null | undefined,
  setCompanyName: { (value: SetStateAction<ICompany | undefined>): void; (arg0: any): void; },
  setUserName: { (value: SetStateAction<IUser | undefined>): void; (arg0: any): void; },
  setProjects: { (value: SetStateAction<IProject[] | null>): void; (arg0: any[] | null): void; },
  setLoading: { (value: SetStateAction<string>): void; (arg0: string): void; }
) => {

    try {
      const { data: company, error: errorCompany } = await supabase
      .from("empresas")
      .select("*")
      .eq("id", companyId)
      .single();
      
      const {data: user, error: errorUser} = await supabase
      .from("usuarios")
      .select("*")
      .eq("empresa_id", companyId)
      .single();
      
      const { data: projects, error: errorProjects } = await supabase
      .from("proyectos")
      .select("*")
      .eq("empresa_id", companyId);
      
      
      setCompanyName(company);
      setUserName(user);
      setProjects(projects);
      
      if (errorProjects || errorCompany || errorUser) {
        setLoading("Error loading data.");
        return;
      };

    } catch (error) {
      setLoading("There was an error loading data.");
      console.log(error)
    }

};