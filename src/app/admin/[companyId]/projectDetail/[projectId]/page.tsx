"use client"

import BackButton from "@/app/components/backButton";
import { IProject } from "@/app/interfaces/interfaces";
import { supabase } from "@/supabase/supabaseClient";
import { fetchProjectDetail } from "@/utils/fetchProjectDetail";
import { withAuth } from "@/utils/withAuth";
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";

function ProjectDetail () {
  const { projectId } = useParams(); //REMEMBER!! same name from [folder]

  const [project, setProject] = useState<IProject | null>();
  const [loading, setLoading] = useState<boolean>(false);
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


  useEffect(() => {
    fetchProjectDetail(projectId, setProject, setLoading);
  }, [])

  const handleUpdateProject = async (e: React.FormEvent)=> {
    e.preventDefault();

    const allFieldsUpdate = {
      "nombre": projectName || project?.nombre,
      "Miniatura": projectMin || project?.Miniatura,
      "Modelo3D": project3D || project?.Modelo3D,
      "NubePuntos": projectCloud || project?.NubePuntos,
      "Ortomosaico": projectOrto || project?.Ortomosaico,
      "CurvasNivel": projectCurve || project?.CurvasNivel,
      "MDT": projectMDT || project?.MDT,
      "MDS": projectMDS || project?.MDS,
      "PlanoCAD": projectCAD || project?.PlanoCAD
     }

    const { error: projectError} = await supabase
    .from("proyectos")
    .update(allFieldsUpdate)
    .eq("id", project?.id)

    if(projectError) {
      alert("no se ha podido modificar: " + projectError.message)
    }

    alert(`Proyecto ${allFieldsUpdate.nombre} modificado correctamente`)
    router.back();
  };
  
  if (loading) {
      return <h1>Cargando...</h1>;
  }

  return (
    <div>
      <h3>Modificar: {project?.nombre}</h3>
      <form onSubmit={handleUpdateProject}>
        <label>Nombre Proyecto</label>
        <input
          type="text"
          value={projectName || project?.nombre || ""}
          onChange={(e)=> setProjectName(e.target.value)}
          placeholder={project?.nombre}
          required
        />
        <label>Miniatura</label>
        <input
          type="text"
          value={projectMin || project?.Miniatura || ""}
          onChange={(e)=> setProjectMin(e.target.value)}
          placeholder={project?.Miniatura || "Inserta URL"}
        />
        <label>Modelo 3D</label>
        <input
          type="text"
          value={project3D || project?.Modelo3D || ""}
          onChange={(e)=> setProject3D(e.target.value)}
          placeholder={project?.Modelo3D || "Inserta URL"}
        />
        <label>Nube Puntos</label>
        <input
          type="text"
          value={projectCloud || project?.NubePuntos || ""}
          onChange={(e)=> setProjectCloud(e.target.value)}
          placeholder={project?.NubePuntos || "Inserta URL"}
        />
        <label>Ortomosaico</label>
        <input
          type="text"
          value={projectOrto || project?.Ortomosaico || ""}
          onChange={(e)=> setProjectOrto(e.target.value)}
          placeholder={project?.Ortomosaico || "Inserta URL"}
        />
        <label>Curvas Nivel</label>
        <input
          type="text"
          value={projectCurve || project?.CurvasNivel || ""}
          onChange={(e)=> setProjectCurve(e.target.value)}
          placeholder={project?.CurvasNivel || "Inserta URL"}
        />
        <label>MDT</label>
        <input
          type="text"
          value={projectMDT || project?.MDT || ""}
          onChange={(e)=> setProjectMDT(e.target.value)}
          placeholder={project?.MDT || "Inserta URL"}
        />
        <label>MDS</label>
        <input
          type="text"
          value={projectMDS || project?.MDS || ""}
          onChange={(e)=> setProjectMDS(e.target.value)}
          placeholder={project?.MDS || "Inserta URL"}
        />
        <label>Plano CAD</label>
        <input
          type="text"
          value={projectCAD || project?.PlanoCAD || ""}
          onChange={(e)=> setProjectCAD(e.target.value)}
          placeholder={project?.PlanoCAD || "Inserta URL"}
        />

        <button>Editar</button>

      </form>
      <BackButton/>
    </div>
  )
}

export default withAuth(["admin_empresa"])(ProjectDetail)