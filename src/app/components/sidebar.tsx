"use client"

import { useCompany } from "@/app/context/companyContext";
import { ICompany, IProject, IUser } from "@/app/interfaces/interfaces";
import { fetchData } from "@/utils/fetchData";
import { useEffect, useState } from "react"
import Logout from "./logout";

export function Sidebar() {
  const [companyName, setCompanyName] = useState<ICompany | undefined>(undefined);
  const [userName, setUserName] = useState<IUser | undefined>(undefined);
  const [loading, setLoading] = useState<string>("");
  const [projects, setProjects] = useState<IProject[] | null>(null);
  
  const { companyId } = useCompany();

  useEffect(() => {

    fetchData(companyId, setCompanyName, setUserName, setProjects, setLoading);

  }, [])
  


  return (
    <>
      {!companyName ? (
        <h2>Admin</h2>
      ):(
        <h2>{companyName && companyName?.nombre}</h2>
      )}
      <p>{userName && userName?.nombre}</p>
      <Logout/> 
    </>

  );
}