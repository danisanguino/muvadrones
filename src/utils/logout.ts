import { supabase } from "@/supabase/supabaseClient";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { SetStateAction } from "react";

export const logout = async (
  setLoading: { (value: SetStateAction<string>): void; (arg0: string): void; },
  router: AppRouterInstance | string[]
) => {
    
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert("Error al cerrar sesión.");
    };
    setLoading("Cerrando sesión...");
    router.push("/");

};