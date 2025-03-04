"use client";

import { withAuth } from "@/utils/withAuth";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IProject } from '../../interfaces/interfaces';
import { fetchProjectDetail } from "@/utils/fetchProjectDetail";

function ProjectDetailPage() {
  const router = useRouter();
  const [project, setProject] = useState<IProject | null>();
  const [loading, setLoading] = useState<string>("");
  
  const { projectId } = useParams(); //get id from URL

  useEffect(() => {
    fetchProjectDetail(projectId, setProject, setLoading);
  }, [])
  
  const handleBack = () => {
    router.push("/clients");
  }

  return (
    <div>
      {loading && <p>{loading}</p>}
      <h3>Hola, estás en el proyecto: {project?.nombre}</h3>
      <p>{project?.descripcion}</p>
      <button onClick={handleBack}>Volver a proyectos</button>
    </div>
  );
}

export default withAuth(["cliente"])(ProjectDetailPage);

