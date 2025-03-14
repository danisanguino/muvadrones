import { supabase } from "@/supabase/supabaseClient";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const handleCreateProject = async (
  e: React.FormEvent,
  projectIdCompany: string | string[] | undefined,
  projectName: string,
  projectMin: string,
  project3D: string,
  projectCloud: string,
  projectOrto: string,
  projectCurve: string,
  projectMDT: string,
  projectMDS: string,
  projectCAD: string,
  router: AppRouterInstance
)=>{

  e.preventDefault();

  const createAllFields = {
    "empresa_id": projectIdCompany,
    "nombre": projectName,
    "Miniatura": projectMin,
    "Modelo3D": project3D,
    "NubePuntos":projectCloud,
    "Ortomosaico": projectOrto,
    "CurvasNivel": projectCurve,
    "MDT": projectMDT,
    "MDS": projectMDS,
    "PlanoCAD": projectCAD,
  }
  
  const { error: errorProject } = await supabase
  .from("proyectos")
  .insert(createAllFields)

  if (errorProject) {
    alert("algo pasa " + errorProject.message);
  }else {
    alert("Projecto creado con éxito");
    router.back();
  };

};