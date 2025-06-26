"use client";

import { withAuth } from "@/utils/withAuth";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IProject } from '../../interfaces/interfaces';
import { fetchProjectDetail } from "@/utils/fetchProjectDetail";
import FbxModel from "@/app/components/fbxModel";
import { Sidebar } from "@/app/components/sidebar";

function ProjectDetailPage() {

  const [project, setProject] = useState<IProject | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // Opcional: manejar error si lo necesitas
  
  
  const { projectId } = useParams(); //get id from URL

  useEffect(() => {
    fetchProjectDetail(projectId, setProject, setLoading, setError);
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
        
        {project?.Miniatura?.trim() && (
          <>
            <p>Miniatura</p>
            <FbxModel url={project.Miniatura} />
          </>
        )}

        {project?.Modelo3D?.trim() && (
          <>
            <p>Modelo 3D</p>
            <FbxModel url={project.Modelo3D} />
          </>
        )}

        {project?.NubePuntos?.trim() && (
          <>
            <p>Nube de Puntos</p>
            <FbxModel url={project.NubePuntos} />
          </>
        )}

        {project?.CurvasNivel?.trim() && (
          <>
            <p>Curvas de Nivel</p>
            <FbxModel url={project.CurvasNivel} />
          </>
        )}

        {project?.Ortomosaico?.trim() && (
          <>
            <p>Ortomosaico</p>
            <FbxModel url={project.Ortomosaico} />
          </>
        )}

        {project?.MDT?.trim() && (
          <>
            <p>MDT</p>
            <FbxModel url={project.MDT} />
          </>
        )}

        {project?.MDS?.trim() && (
          <>
            <p>MDS</p>
            <FbxModel url={project.MDS} />
          </>
        )}

        {project?.PlanoCAD?.trim() && (
          <>
            <p>PlanoCAD</p>
            <FbxModel url={project.PlanoCAD} />
          </>
        )}

      </div>
    </div>
  );
}

export default withAuth(["cliente"])(ProjectDetailPage);

