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
          router.push("/"); // 🚫 Redirige si no hay sesión
          return;
        }

        const { data: user, error: userError } = await supabase
          .from("usuarios")
          .select("rol")
          .eq("id", session.user.id)
          .single();

        if (userError) {
          console.error("❌ Error obteniendo el rol:", userError.message);
          router.push("/"); // 🔒 Redirige si hay error
          return;
        }

        if (!user || !allowedRoles.includes(user.rol)) {
          console.warn("🚫 Rol no autorizado:", user?.rol);
          router.push("/"); // 🚷 Redirige si el rol no está permitido
          return;
        }

        setLoading(false); // ✅ Autorizado -> muestra el contenido
      };

      checkAuth();
    }, [router, allowedRoles]); // 🔄 Se ejecuta si cambian router o roles

    if (loading) return <p>⏳ Cargando... 🚀</p>; // ⏳ Evita mostrar la página antes de verificar
    return <WrappedComponent {...props} />; // ✅ Renderiza si está autorizado
  };

  return AuthWrapper; // 🪄 Devuelve el componente protegido
};
