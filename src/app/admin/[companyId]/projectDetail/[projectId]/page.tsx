"use client"

import BackButton from "@/app/components/backButton";
import { IProject } from "@/app/interfaces/interfaces";
import { fetchProjectDetail } from "@/utils/fetchProjectDetail";
import { withAuth } from "@/utils/withAuth";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";

function ProjectDetail () {
  const { projectId } = useParams(); //REMEMBER!! same name from [folder]
  const [project, setProject] = useState<IProject | null>();
  const [loading, setLoading] = useState<string>("");
 

  useEffect(() => {
    fetchProjectDetail(projectId, setProject, setLoading);
  }, [])
  

  return (
    <div>
      {loading && <p>{loading}</p>}
      <h3>Hola, estás en el proyecto: {project && project?.nombre} para modificar</h3>
      <p>{project?.descripcion}</p>
      <BackButton/>
    </div>
  )
}

export default withAuth(["admin_empresa"])(ProjectDetail)