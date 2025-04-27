"use client"

import BackButton from "@/app/components/backButton";
import { ICompany, IProject, IUser } from "@/app/interfaces/interfaces";
import { fetchUsersAndProjects } from "@/utils/fetchUsersAndProjects";
import { handleDeleteProject } from "@/utils/handleDeleteProject";
import { handleDeleteUser } from "@/utils/handleDeleteUser";
import { withAuth } from "@/utils/withAuth";
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";



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

  const handleUpdateUser = (companyId: string)=> {
    router.push(`/admin/${companyId}/userDetail/${companyId}`)
  };

  const handleCreateUser = ()=> {
    router.push(`/admin/${companyId}/createUser/${companyId}`)
  };

  const handleCreateProject = () => {
    router.push(`/admin/${companyId}/createProject/${companyId}`)
  }

  if (loading) return <p>Cargando datos...</p>;

  return (
    <div className="container-admin">
      <h2>Empresa: {companyName?.nombre}</h2>
      <div className="container-users-projects">
        <div className="container-users-projects__list square-shadow">
          <h3>Usuarios</h3>
            <ul>
              {userName?.map((e) => (
                <li key={e.id}>
                  {e.email}
                  <button onClick={()=>handleUpdateUser(e.id)} className="container-users-projects__list--button button-edit" title="editar"><FaRegEdit className="img-button-edit"/></button>
                  <button onClick={()=>handleDeleteUser(e.id, e.email)} className="container-users-projects__list--button button-delete" title="borrar"><MdOutlineDeleteForever className="img-button-delete"/></button>
                </li>
              ))}
            </ul>
          <button onClick={handleCreateUser} className="container-users-projects__create-button">Crear usuario</button>
        </div>

        <div className="container-users-projects__list square-shadow">
          <h3>Proyectos</h3>
            {projects ? 
              ( <ul>
                  {projects.map((e)=> (
                  <li key={e.id}>
                    {e.nombre}
                    <button onClick={()=> handleUpdateProject(e.id)}className="container-users-projects__list--button button-edit" title="editar"><FaRegEdit className="img-button-edit"/></button>
                    <button onClick={()=> handleDeleteProject(e.id)}className="container-users-projects__list--button button-delete" title="borrar"><MdOutlineDeleteForever className="img-button-delete"/></button>
                  </li> 
                  ))}
                </ul>
              ) : (
              <p>Esta empresa no tiene proyectos</p>
              )
            }
            <button onClick={handleCreateProject}>Crear proyecto AQUI</button>
          </div>
        </div>
        <BackButton/>
    </div>
  )
}

export default withAuth(["admin_empresa"])(companyData); 