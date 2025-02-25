"use client";

import { withAuth } from "@/utils/withAuth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCompany } from "../context/companyContext";
import { ICompany, IProject, IUser, IProps } from '../interfaces/interfaces';
import { fetchData } from "@/utils/fetchData";
import { logout } from "@/utils/logout";


const ClientsPage =  ( { juanillo }: IProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  const [loading, setLoading] = useState<string>("");
  const [companyName, setCompanyName] = useState<ICompany>();
  const [userName, setUserName] = useState<IUser>();
  const [projects, setProjects] = useState<IProject[] | null>([]);

  const { companyId } = useCompany();


  //load data from context 
  useEffect(() => {
    fetchData(companyId, setCompanyName, setUserName, setProjects, setLoading);
  }, [])

  const projectDetail = (projectId: string) => {
    router.push(`/clients/${projectId}`);
  };
  
  return (
    <>
      {loading && <p>{loading}</p>}
      {userName?.nombre ? (
        <h1>Hola {userName?.nombre}, área de Clientes</h1>
        ) : (
        <h1>Área de clientes</h1>
      )}
      <button onClick={() => logout(setLoading, router)}>Salir</button>
      <h2>Empresa: {companyName?.nombre}</h2>
      <h3>Proyectos wenis</h3>
      <ul>
        {projects && projects.map((e) => (
          <li key={e.id}>
            <h4><button onClick={()=> projectDetail(e.id)}>{e.nombre}</button></h4>
          </li>
        ))}
      </ul>
    </>
  );
};

export default withAuth(["cliente"])(ClientsPage); 
