import { IUser } from "@/app/interfaces/interfaces";
import { supabase } from "@/supabase/supabaseClient";
import { Dispatch, SetStateAction } from "react";

export const fetchUserDetail = async (
  userId: string | string[] | undefined,
  setUser: Dispatch<SetStateAction<IUser | null | undefined>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
  // setUserName: Dispatch<SetStateAction<string | undefined>>
  )=> {
    
  try {
    const {data: userData, error: errorUserData} = await supabase
    .from("usuarios")
    .select("*")
    .eq("id", userId)
    .single()
    
    if (errorUserData) {
      console.log("error al cargar los datos de usuario")
    }

    setUser(userData);
    // setUserName(userData);
    
  } catch (error) {
    alert("Sorry, something is wrong")
  }
}