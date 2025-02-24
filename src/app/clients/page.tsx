"use client";

import { supabase } from "@/supabase/supabaseClient";
import { withAuth } from "@/utils/withAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ClientsPage =  () => {
  const calabaza = useRouter();
  const [loading, setLoading] = useState<string>("");

  const logout = async () => {
    
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert("Error al cerrar sesión.");
    };

    setLoading("Cerrando sesión...");
    calabaza.push("/");
    
  };
  
  return (
  <>
  {loading && <p>{loading}</p>}
  <h1>👥 Panel de Clientes 🛡️</h1>
  <button onClick={logout}>Salir</button>
  </>
  )

};

export default withAuth(["cliente"])(ClientsPage); 
