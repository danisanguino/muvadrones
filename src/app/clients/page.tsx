"use client";

import { withAuth } from "@/utils/withAuth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCompany } from "../context/companyContext";
import { ICompany, IProject, IUser } from '../interfaces/interfaces';
import { fetchData } from "@/utils/fetchData";
import { Sidebar } from "../components/sidebar";

export default function ClientsPage() {
// const ClientsPage = () =>  {
  const router = useRouter();
  // const searchParams = useSearchParams();
  const [loading, setLoading] = useState<string>("");
  const [companyName, setCompanyName] = useState<ICompany>();
  const [userName, setUserName] = useState<IUser>();
  const [projects, setProjects] = useState<IProject[] | null>([]);

  //get companyId from context
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

// export default withAuth(["cliente"])(ClientsPage); 
