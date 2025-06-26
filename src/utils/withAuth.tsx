"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabase/supabaseClient";

export const withAuth = (allowedRoles: string[]) => (WrappedComponent: React.FC) => {
  const AuthWrapper = (props: any) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const checkAuth = async () => {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError || !session) {
          router.push("/");
          return;
        }

        const { data: user, error: userError } = await supabase
          .from("usuarios")
          .select("rol")
          .eq("id", session.user.id)
          .single();

        if (userError) {
          console.error("Error obteniendo el rol:", userError.message);
          router.push("/"); 
          return;
        }

        if (!user || !allowedRoles.includes(user.rol)) {
          console.warn("Rol no autorizado:", user?.rol);
          router.push("/"); 
          return;
        }

        setLoading(false); 
      };

      checkAuth();
    }, [router, allowedRoles]); 

    if (loading) return <p className="auth-loading">Cargando datos... </p>; 
    return <WrappedComponent {...props} />; 
  };

  return AuthWrapper; 
};
