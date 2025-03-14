"use client"

import BackButton from "@/app/components/backButton";
import { IUser } from "@/app/interfaces/interfaces";
import { supabase } from "@/supabase/supabaseClient";
import { fetchUserDetail } from "@/utils/fetchUserDetail";
import { withAuth } from "@/utils/withAuth";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function UserDetail () {
  const { userId } = useParams();
  const [user, setUser] = useState<IUser | null>();
  const [userName, setUserName] = useState<string | undefined>("");
  const [userMail, setUserMail] = useState<string | undefined>("");
  const [userRole, setUserRole] = useState<string>("cliente");
  const [userPass, setUserPass] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false)
  
  useEffect(() => {  
      fetchUserDetail(userId, setUser, setLoading);
  }, []);


  const handleUpdateUser= async (e: React.FormEvent)=> {
    e.preventDefault();

    const updatedData = {
      "nombre": userName || user?.nombre,
      "email": userMail || user?.email || "",
      "rol": userRole || "cliente"
    };

    const {error: errorUser} = await supabase
    .from("usuarios")
    .update(updatedData)
    .eq("id", userId)

    if(errorUser) {
      alert("Rellena alguno de los campos para actualizar");
    };

    // supabase auth handle pass
    if (userPass) {
      const { error: authError } = await supabase.auth.updateUser({ password: userPass });

      if (authError) {
        alert("Error al actualizar la contraseña: " + authError.message);
        return;
      }
    }

    alert(`Usuario ${updatedData.nombre} actualizado con éxito`);
    setUser((prev) => prev ? { ...prev, ...updatedData } : null); 
    setUserPass("");

  };
  
  return (
    <>
      <h1>Actualizar usuario: {user?.nombre || user?.email}</h1>
    
      {/* {!user?.nombre ? (
        <h1>Actualizar usuario: {user?.email}</h1>
        ):(
        <h1>Actualizar usuario: {user?.nombre}</h1>
      )} */}

      <form onSubmit={handleUpdateUser}>
        <input
          type="text"
          value={userName || user?.nombre || ""}
          placeholder={user?.nombre || "Inserta Nombre"}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="email"
          value={userMail || user?.email || ""}
          placeholder={user?.email || "Inserta Email"}
          onChange={(e) => setUserMail(e.target.value)}
          required
        />
        <input
          type="password"
          value={userPass || ""}
          placeholder="Nueva contraseña (opcional)"
          onChange={(e) => setUserPass(e.target.value)}
        />
        <select
          value={userRole}
          onChange={(e) => setUserRole(e.target.value)}
        >
          <option value="cliente">Cliente</option>
          <option value="admin_empresa">Admin</option>
        </select>
        <button>Update</button>
      </form>
     
      <BackButton/>
    </>
  )
}

export default withAuth(["admin_empresa"])(UserDetail);