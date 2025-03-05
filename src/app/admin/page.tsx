"use client";

import { supabase } from "@/supabase/supabaseClient";
import { withAuth } from "@/utils/withAuth";
import { useEffect, useState } from "react";
import { ICompany } from "../interfaces/interfaces";
import Logout from "../components/logout";
import { useRouter } from "next/navigation";

const AdminPage = () => {
  const [companys, setCompanys] = useState<ICompany[] | null>([]);
  const router = useRouter();

  useEffect(() => {

    const fetchAllData = async () => {

      try {
        const { data: dataCompanys, error: errorCompanys } = await supabase
        .from("empresas")
        .select("*")
   
        if (errorCompanys) {
          console.log("Error to get companys", errorCompanys);
          return;
        }
        setCompanys(dataCompanys);

      } catch (error) {
        alert("There was an error loading data.");
      }
  
    };
  
    fetchAllData();
    
  }, [])

  const handleCompany = (companyId: string) => {
    router.push(`/admin/${companyId}`);
  }

  


  return (
  <>
    <h1>🛠️ Panel de Administración 🚀</h1>
    <ul>
      {companys?.map((e) => (
        <li key={e.id}>
          <button onClick={() => handleCompany(e.id)}>{e.nombre}</button>
        </li>
      ))}
    </ul>
    <button onClick={() => router.push("admin/createCompany")}>Crear empresa</button>
    <Logout />
  </>
  );
};

export default withAuth(["admin_empresa"])(AdminPage); 
