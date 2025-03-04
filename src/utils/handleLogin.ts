import { supabase } from "@/supabase/supabaseClient";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const handleLogin = async (
  e: React.FormEvent,
  setCompanyId: (companyId: string) => void,
  router: AppRouterInstance,
  email: string,
  password: string
) => {

    e.preventDefault();
    
    const { data: { session }, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error || !session) {
      alert("Correo o contraseña incorrectos. Por favor compruebe sus datos.");
      return;
    }
    
    // Get role and company id from supabase
    const { data: user, error: userError } = await supabase
    .from("usuarios")
    .select("*")
    .eq("id", session.user.id)
    .single();
    
    if (userError || !user) {
      alert("No se pudo obtener el rol del usuario.");
      return;
    }

    //save companyId in context
    setCompanyId(user.empresa_id);

    // Redirect to the corresponding page
    if (user.rol === "admin_empresa") {
      router.push("/admin");
      } else if (user.rol === "cliente") {
      router.push(`/clients`);
      } else {
      alert("Rol no autorizado.");
      }

  };