"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useCompany } from "./context/companyContext";
import { handleLogin } from "@/utils/handleLogin";
import FbxModel from "./components/fbxModel";

import "../css/styles.css";

export default function Home() {
  const router = useRouter();

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
        {/* <FbxModel url="https://drive.google.com/uc?export=download&id=1-z94aT0TYnVBptAMf7Zio2haBMiwXlbd"/> */}
    </div>

  );
};