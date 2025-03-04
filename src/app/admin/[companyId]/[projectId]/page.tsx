"use client"

import { IProject } from "@/app/interfaces/interfaces";
import { supabase } from "@/supabase/supabaseClient";
import { fetchProjectDetail } from "@/utils/fetchProjectDetail";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";

export default function ProjectDetail () {
  const { projectId } = useParams(); //same name from [folder]
  const [project, setProject] = useState<IProject | null>();
  const [loading, setLoading] = useState<string>("");
 
  console.log("id del proyecto", projectId)

  useEffect(() => {
    fetchProjectDetail(projectId, setProject, setLoading);
  }, [])
  
  // setLoading("cargando")

  return (
    <div>
      {/* {loading && <p>{loading}</p>} */}
      <h3>Hola, estás en el proyecto: {project?.nombre} para modificar</h3>
      <p>{project?.descripcion}</p>
    </div>
  )
}