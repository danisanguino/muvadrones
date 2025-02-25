"use client";

import { supabase } from "@/supabase/supabaseClient";
import { withAuth } from "@/utils/withAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCompany } from "../context/companyContext";
import { ICompany, IProject, IUser } from "../interfaces/interfaces";


const ClientsPage =  () => {
  const router = useRouter();
  const [loading, setLoading] = useState<string>("");
  const [companyName, setCompanyName] = useState<ICompany>();
  const [userName, setUserName] = useState<IUser>();
  const [projects, setProjects] = useState<IProject[] | null>([]);


  const { companyId } = useCompany();

  //logout function
  const logout = async () => {
    
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert("Error al cerrar sesión.");
    };
    setLoading("Cerrando sesión...");
    router.push("/");
  };

  //load data from context 
  useEffect(() => {
    
    const fetchData = async () => {

    try {
      const { data: company, error: errorCompany } = await supabase
      .from("empresas")
      .select("*")
      .eq("id", companyId)
      .single();
      
      const {data: user, error: errorUser} = await supabase
      .from("usuarios")
      .select("*")
      .eq("empresa_id", companyId)
      .single();
      
      const { data: dataProjects, error: errorDataProjects } = await supabase
      .from("proyectos")
      .select("*")
      .eq("empresa_id", companyId);
      
      
      setCompanyName(company);
      setUserName(user);
      setProjects(dataProjects);
      
      if (errorDataProjects || errorCompany || errorUser) {
        setLoading("Error loading data.");
        return;
      };

    } catch (error) {
      setLoading("There was an error loading data.");
      console.log(error)
    }

    };
 
    fetchData();
  }, [])
  
  

  
  return (
    <>
      {loading && <p>{loading}</p>}
      {userName?.nombre ? (
        <h1>👥Hola {userName?.nombre}, área de Clientes 🛡️</h1>
        ) : (
        <h1>Área de clientes</h1>
      )}
      <button onClick={logout}>Salir</button>
      <h2>Empresa: {companyName?.nombre}</h2>
      <h3>Proyectos wenis</h3>
      <ul>
        {projects && projects.map((e) => (
          <li key={e.id}>
            <h4>{e.nombre}</h4>
            <p>{e.descripcion}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default withAuth(["cliente"])(ClientsPage); 
