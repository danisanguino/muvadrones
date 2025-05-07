"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useCompany } from "./context/companyContext";
import { handleLogin } from "@/utils/handleLogin";
import FbxModel from "./components/fbxModel";


export default function Home() {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  
  //setCompanyId from context
  const { setCompanyId } = useCompany();
  
  return (
    <>
    <div className="login">
        <form onSubmit={(e) => handleLogin(e, setCompanyId, router, email, password)}>

          <img src="./logo_muvadrones01.svg" alt="logo principal muvadrones" />

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

          <p><strong>Aviso Legal sobre Protección de Datos.</strong><br/>
          En Muvadrones te informamos que, aunque contamos con tus datos tras haber otorgado tu autorización, no realizaremos ningún tratamiento adicional sobre los mismos. Tus datos están almacenados de forma segura y únicamente se conservarán según lo requerido por normativa, sin ser utilizados para ningún otro fin.</p>
        </form>
    </div>
    </>

  );
};