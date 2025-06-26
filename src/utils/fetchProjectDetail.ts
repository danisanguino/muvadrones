import { supabase } from "@/supabase/supabaseClient";
import { Dispatch, SetStateAction } from "react";

export const fetchProjectDetail = async (
  projectId: string | string[] | undefined,
  setProject: (arg0: any) => void,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<SetStateAction<string | null>>  // Añadimos setError para manejar errores
) => {
  try {
    const { data, error } = await supabase
      .from("proyectos")
      .select("*")
      .eq("id", projectId)
      .single();

    if (error) {
      setError("Error al cargar los datos del proyecto.");
      setLoading(false); // Detener carga
      return;
    }

    setProject(data);
    setLoading(false); // Detener carga al obtener datos
  } catch (error) {
    setError("Hubo un problema al cargar los datos.");
    setLoading(false); // Detener carga
    console.log(error);
  }
};
