"use client"

import BackButton from "@/app/components/backButton";
import { ICompany } from "@/app/interfaces/interfaces";
import { fetchUsersAndProjects } from "@/utils/fetchUsersAndProjects";
import { handleCreateProject } from "@/utils/handleCreateProject";
import { withAuth } from "@/utils/withAuth";
import { useParams, useRouter} from "next/navigation"
import { useEffect, useState } from "react";

function CreateProject () {

  const [companyName, setCompanyName] = useState<ICompany | null >();
  const [projectName, setProjectName] = useState<string>("");
  const [projectMin, setProjectMin] = useState<string>(""); 
  const [project3D, setProject3D] = useState<string>(""); 
  const [projectCloud, setProjectCloud] = useState<string>(""); 
  const [projectOrto, setProjectOrto] = useState<string>("");
  const [projectCurve, setProjectCurve] = useState<string>("");
  const [projectMDT, setProjectMDT] = useState<string>("");
  const [projectMDS, setProjectMDS] = useState<string>("");
  const [projectCAD, setProjectCAD] = useState<string>("");

  const router = useRouter();

  const {projectIdCompany } = useParams();

  useEffect(() => {
    fetchUsersAndProjects(projectIdCompany, setCompanyName, () => {}, () => {}, () => {});
  }, [])
  

  return (
    <div className="container-admin">
      <h2>Nuevo proyecto para {companyName?.nombre} </h2>
      <form onSubmit={(e)=>handleCreateProject(e, projectIdCompany, projectName, projectMin, project3D, projectCloud, projectOrto, projectCurve, projectMDT, projectMDS, projectCAD, router )}>
        <input
          type="text"
          value={projectName}
          onChange={(e)=> setProjectName(e.target.value)}
          placeholder="Nombre proyecto"
          required
        />

        <input
          type="text"
          value={projectMin}
          onChange={(e)=> setProjectMin(e.target.value)}
          placeholder="URL Miniatura"
          required
        />

        <input
          type="text"
          value={project3D}
          onChange={(e)=> setProject3D(e.target.value)}
          placeholder="URL Modelo 3D"
        />

        <input
          type="text"
          value={projectCloud}
          onChange={(e)=>setProjectCloud(e.target.value)}
          placeholder="URL Nube Puntos"
        />

        <input
          type="text"
          value={projectOrto}
          onChange={(e)=>setProjectOrto(e.target.value)}
          placeholder="URL Ortomosaico"
        />

        <input
          type="text"
          value={projectCurve}
          onChange={(e)=>setProjectCurve(e.target.value)}
          placeholder="URL Curva de Nivel"
        />

        <input
          type="text"
          value={projectMDT}
          onChange={(e)=>setProjectMDT(e.target.value)}
          placeholder="URL MDT"
        />

        <input
          type="text"
          value={projectMDS}
          onChange={(e)=>setProjectMDS(e.target.value)}
          placeholder="URL MDS"
        />

        <input
          type="text"
          value={projectCAD}
          onChange={(e)=>setProjectCAD(e.target.value)}
          placeholder="URL Plano CAD"
        />
        
        <button>Crear</button>
      </form>
      <BackButton/>
    </div>
  )
}

export default withAuth(["admin_empresa"])(CreateProject);