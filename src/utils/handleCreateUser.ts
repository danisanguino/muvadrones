import { supabase } from "@/supabase/supabaseClient";
import { Dispatch, SetStateAction } from "react";

export const handleCreateUser = async (
  e: any,
  userMail: string,
  setUserMail: Dispatch<SetStateAction<string>>,
  userPass: string,
  setUserPass: Dispatch<SetStateAction<string>>,
  userName: string,
  setUserName: Dispatch<SetStateAction<string>>,
  userRole: string,
  userIdCompany: string | string [] | undefined
) => {
  
  e.preventDefault();

  //insert in auth with pass
  const { data: dataAuth, error: authError } = await supabase.auth.signUp({
    email: userMail,
    password: userPass, 
  });

  if(authError){
    alert("error al crear usuario en auth " + authError.message)
    return;
  }

  //take ID and create userId
  const userId = dataAuth.user?.id;

  if (!userId) {
    alert("Error al obtener el ID del usuario creado");
    return;
  }

  //insert other data
  const { error: userError } = await supabase
  .from("usuarios")
  .insert({
    "id": userId,
    "nombre": userName,
    "email": userMail,
    "empresa": null,
    "rol": userRole,
    "empresa_id": userIdCompany
  });

  if (userError) {
    alert("error al crear usuario mamona! " + userError.message)
    return;
  } else {
    alert(`usuario ${userMail} creado con éxito`)
  };

  setUserName("");
  setUserMail("");
  setUserPass("");

}