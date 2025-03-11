"use client"

import BackButton from "@/app/components/backButton";
import { ICompany, IProject, IUser } from "@/app/interfaces/interfaces";
import { fetchUsersAndProjects } from "@/utils/fetchUsersAndProjects";
import { handleDeleteUser } from "@/utils/handleDeleteUser";
import { withAuth } from "@/utils/withAuth";
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";

function companyData() {
  const [userName, setUserName] = useState<IUser[] | null>([]);
  const [companyName, setCompanyName] = useState<ICompany | null >();
  const [projects, setProjects] = useState<IProject[] | null>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  
  const { companyId } = useParams(); //get url, name same as folder companyData

  useEffect(() => {
   fetchUsersAndProjects( companyId, setCompanyName, setProjects, setUserName, setLoading);
  }, []);

  const handleUpdateProject = (projectId: string)=> {
      router.push(`/admin/${companyId}/projectDetail/${projectId}`)
  };

  const handleUpdateUser = (juanillo: string)=> {
    router.push(`/admin/${companyId}/userDetail/${juanillo}`)
  };

  const handleCreateUser = ()=> {
    router.push(`/admin/${companyId}/createUser/${companyId}`)
  };

  
  if (loading) return <p>Cargando datos...</p>;

  return (
    <>
      <h2>Usuarios de {companyName?.nombre} </h2>
        <ul>
          {userName?.map((e) => (
            <li key={e.id}>
              {e.email}
              <button onClick={()=>handleUpdateUser(e.id)}>Editar</button>
              <button onClick={()=>handleDeleteUser(e.id, e.email)}>Borrar</button>
            </li>
          ))}
        </ul>
        <h2>Proyectos</h2>
        {projects ? 
          ( <ul>
              {projects.map((e)=> (
               <li key={e.id}>
                {e.nombre}
                <button onClick={() => handleUpdateProject(e.id)}>Edit</button>
                <button>Borrar</button>
              </li> 
              ))}
            </ul>
          ) : (
          <p>Esta empresa no tiene proyectos</p>
          )
        }
        <button onClick={handleCreateUser}>Crear usuario AQUI</button>
        <BackButton/>
    </>
  )
}

export default withAuth(["admin_empresa"])(companyData); 