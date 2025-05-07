"use client"

import { useCompany } from "@/app/context/companyContext";
import { ICompany, IProject, IUser } from "@/app/interfaces/interfaces";
import { fetchData } from "@/utils/fetchData";
import { useEffect, useState } from "react"
import Logout from "./logout";
import BackButton from "./backButton";
import { usePathname } from 'next/navigation';

export function Sidebar() {
  const [companyName, setCompanyName] = useState<ICompany | undefined>(undefined);
  const [userName, setUserName] = useState<IUser | undefined>(undefined);
  const [loading, setLoading] = useState<string>("");
  const [projects, setProjects] = useState<IProject[] | null>(null);
  const pathname = usePathname();
  
  const { companyId } = useCompany();

  useEffect(() => {

    fetchData(companyId, setCompanyName, setUserName, setProjects, setLoading);

  }, [])
  

  const normalizedPath = pathname.replace(/\/$/, "");
  const hiddenRoutes = ["/clients"];
  const shouldShowBackButton = !hiddenRoutes.includes(normalizedPath);



  return (
    <div className="sidebar">
      <div className="logo-data-user">
      <img src="/logo_muvadrones01.svg" alt="logo principal muvadrones" />
      {!companyName ? (
        <h2>Admin</h2>
      ):(
        <h2>{companyName && companyName?.nombre}</h2>
      )}
      <p>Hola {userName?.nombre || userName?.email}</p>
      </div>
      <div>
        {shouldShowBackButton && <BackButton />}
        <Logout/> 
      </div>
    </div>

  );
}