"use client";

import { useParams } from "next/navigation";

export default function ProjectDetailPage() {
  const { projectId } = useParams();

  return (
    <div>
      <h1>Hola, estás en el proyecto: {projectId}</h1>
    </div>
  );
}