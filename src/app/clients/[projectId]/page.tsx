"use client";

import { withAuth } from "@/utils/withAuth";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IProject } from '../../interfaces/interfaces';
import { fetchProjectDetail } from "@/utils/fetchProjectDetail";
import BackButton from "@/app/components/backButton";

function ProjectDetailPage() {

  const [project, setProject] = useState<IProject | null>();
  const [loading, setLoading] = useState<string>("");
  
  const { projectId } = useParams(); //get id from URL

  useEffect(() => {
    fetchProjectDetail(projectId, setProject, setLoading);
  }, [])
  

  return (
    <div>
      {loading && <p>{loading}</p>}
      <h3>Hola, estás en el proyecto: {project?.nombre}</h3>
      <p>{project?.descripcion}</p>
      <BackButton/>
    </div>
  );
}

export default withAuth(["cliente"])(ProjectDetailPage);

