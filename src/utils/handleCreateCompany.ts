import { supabase } from "@/supabase/supabaseClient";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction } from "react";

export const handleCreateCompany = async (
  e: React.FormEvent<HTMLFormElement>,
  companyName: string,
  setCompanyName: Dispatch<SetStateAction<string>> ,
  router: AppRouterInstance,
  ) => {

  e.preventDefault();

  const { error } = await supabase
    .from("empresas")
    .insert({
      "nombre": companyName
    })

  if (error) {
    console.error("Error al crear la empresa:", error);
    setCompanyName("");
    return;
  } else {
    setCompanyName("");
    alert(companyName + " creada con éxito");
    router.push("/admin")
  }
}