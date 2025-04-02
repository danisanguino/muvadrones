"use client";

import { withAuth } from "@/utils/withAuth";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IProject } from '../../interfaces/interfaces';
import { fetchProjectDetail } from "@/utils/fetchProjectDetail";
import BackButton from "@/app/components/backButton";
import FbxModel from "@/app/components/fbxModel";

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
      {/* Renderizar el modelo FBX si el proyecto tiene una URL */}
      <FbxModel url="https://drive.google.com/file/d/1-z94aT0TYnVBptAMf7Zio2haBMiwXlbd/view?usp=drive_link"/>
      <FbxModel url={project?.Miniatura || ""}/>
      <BackButton/>
    </div>
  );
}

export default withAuth(["cliente"])(ProjectDetailPage);

