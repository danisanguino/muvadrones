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
  <div className="container-admin">
    <div className="container-admin-projects container-projects">
      <img src="/logo_muvadrones01.svg" className="logo__container-projects"/>
      <h1>Panel de Administración</h1>
      <p>Pulsa una empresa para ver sus proyectos y usuarios</p>
      <ul>
        {companys?.map((e) => (
          <li key={e.id}>
            <button onClick={() => handleCompany(e.id)}>{e.nombre}</button>
          </li>
        ))}
      </ul>
      <button onClick={() => router.push("admin/createCompany")} className="button__container-projects">Crear empresa</button>
    <Logout />
    </div>
  </div>
  );
};

export default withAuth(["admin_empresa"])(AdminPage); 
