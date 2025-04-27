"use client";

import { withAuth } from "@/utils/withAuth";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IProject } from '../../interfaces/interfaces';
import { fetchProjectDetail } from "@/utils/fetchProjectDetail";
import BackButton from "@/app/components/backButton";
import FbxModel from "@/app/components/fbxModel";
import { Sidebar } from "@/app/components/sidebar";

function ProjectDetailPage() {

  const [project, setProject] = useState<IProject | null>();
  const [loading, setLoading] = useState<string>("");
  
  const { projectId } = useParams(); //get id from URL

  useEffect(() => {
    fetchProjectDetail(projectId, setProject, setLoading);
  }, [])
  

  return (
    <div className="container">
      <Sidebar/>
      <div className="container-projects-detail">
        <div className="container-projects-detail__name-project-and-back">
        {loading && <p>{loading}</p>}
        <h1>{project?.nombre}</h1>
        </div>
        {/* Renderizar el modelo FBX si el proyecto tiene una URL */}
        {project?.Miniatura && <FbxModel url={project.Miniatura} />}
        {project?.Modelo3D && <FbxModel url={project.Modelo3D} />}
        {project?.NubePuntos && <FbxModel url={project.NubePuntos} />}
        <BackButton/>
      </div>
    </div>
  );
}

export default withAuth(["cliente"])(ProjectDetailPage);

