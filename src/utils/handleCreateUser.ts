import { supabase } from "@/supabase/supabaseClient";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
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
  userIdCompany: string | string[] | undefined,
  router: AppRouterInstance
) => {
  
  e.preventDefault();
  
  // Insert in auth with pass
  const { data: dataAuth, error: authError } = await supabase.auth.signUp({
    email: userMail,
    password: userPass, 
  });

  if (authError) {
    alert("Error al crear usuario en auth: " + authError.message);
    return;
  }

  // Take ID and create userId
  const userId = dataAuth.user?.id;

  if (!userId) {
    alert("Error al obtener el ID del usuario creado");
    return;
  }

  const createAllFields = {
      "id": userId,
      "nombre": userName,
      "email": userMail,
      "empresa": null,
      "rol": userRole,
      "empresa_id": userIdCompany
  }

  // Insert other data
  const { error: userError } = await supabase
    .from("usuarios")
    .upsert(createAllFields);

  if (userError) {
    alert("Error al crear usuario en la tabla de usuarios: " + userError.message);
    return;
  } else {
    alert(`Usuario ${userMail} creado con éxito`);
  }
  router.back();
  setUserName("");
  setUserMail("");
  setUserPass("");
}