"use client"

import { supabase } from "@/supabase/supabaseClient";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data: { session }, error } = await supabase.auth.signInWithPassword({
    email,
    password,
    });

    if (error || !session) {
      alert("Correo o contraseña incorrectos. Por favor compruebe sus datos.");
      return;
    }

    // Get role from supabase
    const { data: user, error: userError } = await supabase
    .from("usuarios")
    .select("rol")
    .eq("id", session.user.id)
    .single();


    if (userError || !user) {
      alert("No se pudo obtener el rol del usuario.");
      return;
    }

    // Redirect to the corresponding page
    if (user.rol === "admin_empresa") {
      router.push("/admin");
      } else if (user.rol === "cliente") {
      router.push("/clients");
      } else {
      alert("Rol no autorizado.");
      }

  };

  return (
    <div>
        <p> Area de clientes muvadrones</p>
        <form onSubmit={handleLogin}>
          <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          />

          <input
          type="password"
          placeholder="pass"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          />

          <button type="submit">Acceder</button>
        </form>
    </div>

  );
};