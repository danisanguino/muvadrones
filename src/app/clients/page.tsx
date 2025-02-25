"use client";

import { withAuth } from "@/utils/withAuth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCompany } from "../context/companyContext";
import { ICompany, IProject, IUser } from "../interfaces/interfaces";
import { fetchData } from "@/utils/fetchData";
import { logout } from "@/utils/logout";


const ClientsPage =  () => {
  const router = useRouter();
  // const searchParams = useSearchParams();
  // const userId = searchParams.get("userId");
  const [loading, setLoading] = useState<string>("");
  const [companyName, setCompanyName] = useState<ICompany>();
  const [userName, setUserName] = useState<IUser>();
  const [projects, setProjects] = useState<IProject[] | null>([]);

  const { companyId } = useCompany();

  //load data from context 
  useEffect(() => {
    fetchData(companyId, setCompanyName, setUserName, setProjects, setLoading);
  }, [])
  
  return (
    <>
      {loading && <p>{loading}</p>}
      {userName?.nombre ? (
        <h1>👥Hola {userName?.nombre}, área de Clientes 🛡️</h1>
        ) : (
        <h1>Área de clientes</h1>
      )}
      <button onClick={() => logout(setLoading, router)}>Salir</button>
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
