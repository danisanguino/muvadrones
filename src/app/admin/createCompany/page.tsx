"use client"

import BackButton from "@/app/components/backButton";
import { handleCreateCompany } from "@/utils/handleCreateCompany";
import { withAuth } from "@/utils/withAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";

function CreateCompany (){
  const [companyName, setCompanyName] = useState<string>("");
  const router = useRouter();

  return (
    <>
    <h2>Crear empresa</h2>
    <form onSubmit={(e) => handleCreateCompany(e, companyName, setCompanyName, router)}>
      <input
        type="text"
        value={companyName}
        onChange={(e)=>setCompanyName(e.target.value)}
        placeholder="Insertar nombre de empresa"
      />
      <button>Crear</button>
    </form>
    <BackButton/>
    </>
  )
}

export default withAuth(["admin_empresa"])(CreateCompany)