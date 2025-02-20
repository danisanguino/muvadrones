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
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
          router.push("/"); // Redirige si no hay sesión
          return;
        }

        const { data: user, error: userError } = await supabase
          .from("usuarios")
          .select("rol")
          .eq("id", session.user.id)
          .single();

        if (userError || !user || !allowedRoles.includes(user.rol)) {
          router.push("/"); // Redirige si el rol no está permitido
        } else {
          setLoading(false);
        }
      };

      checkAuth();
    }, [router]);

    if (loading) return <p>⏳ Cargando...</p>;
    return <WrappedComponent {...props} />;
  };

  return AuthWrapper;
};
