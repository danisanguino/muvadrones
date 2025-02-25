"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useCompany } from "./context/companyContext";
import { handleLogin } from "@/utils/handleLogin";


export default function Home() {
  const router = useRouter();
  // const searchParams = useSearchParams();
  // const urlUser = searchParams.get("userId");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  
  //setCompanyId from context
  const { setCompanyId } = useCompany();
  
  return (
    <div>
        <p> Area de clientes muvadrones</p>
        <form onSubmit={(e) => handleLogin(e, setCompanyId, router, email, password)}>
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