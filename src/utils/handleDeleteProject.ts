import { supabase } from "@/supabase/supabaseClient";

export const handleDeleteProject = async (projectId: string) => {
  const areYouSure = confirm("Quiere eliminar el proyecto??");

  if(!areYouSure) {
    alert("Proyecto no eliminado")
  } else {

    const { error } = await supabase
    .from("proyectos")
    .delete()
    .eq("id", projectId )

    if(error) {
      alert("No se ha podido eliminar el proyecto " + error.message)
    }

    alert("Has eliminado el proyecto")
  }
};