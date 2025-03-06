import { supabase } from "@/supabase/supabaseClient";

export const handleDeleteUser = async (userId: string, userEmail: string)=> {

  const confirmed = confirm("¿Desea borrar el usuario " + userEmail + "?")
  
  if(!confirmed){
    alert("No se ha eliminado ningún usuario")
    return;
  } 
  
  const deleteUser = await supabase
  .from("usuarios")
  .delete()
  .eq("id", userId)

  alert(`El usuario ${userEmail} se ha eliminado correctamente`)
};