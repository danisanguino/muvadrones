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
  const [userRole, setUserRole] = useState<IUser | null>();
  const [userPass, setUserPass] = useState<IUser>();
  const [loading, setLoading] = useState<boolean>(false)
  
  //loading user data
  useEffect(() => {  
      fetchUserDetail(userId, setUser, setLoading);
  }, [])

  // Establecer valores iniciales cuando user se cargue
  // useEffect(() => {
  //   if (user) {
  //     setUserName(user.nombre || "");
  //     setUserMail(user.email || "");
  //   }
  // }, [user]);

  const handleUpdateUser= async (e: React.FormEvent)=> {
    e.preventDefault();

    const {error: errorUser} = await supabase
    .from("usuarios")
    .update({
      "nombre": userName,
      "email": userMail,
    })
    .eq("id", userId)
    .single()

    if(errorUser) {
      alert("esto no update bro " + errorUser.message)
    }

    alert(`Usuario ${user?.nombre} actualizado con éxito`)

  };
  
  return (
    <>
      {!user?.nombre ? (
        <h1>Actualizar usuario: {user?.email}</h1>
        ):(
        <h1>Actualizar usuario: {user?.nombre}</h1>
      )}
      <form onSubmit={handleUpdateUser}>
        <input
          type="text"
          value={userName || user?.nombre || ""}
          placeholder={user?.nombre || "Inserta Nombre"}
          onChange={(e)=> setUserName(e.target.value)}
        />
        <input
          type="email"
          value={userMail || user?.email || ""}
          placeholder={user?.email}
          onChange={(e) => setUserMail(e.target.value)}
          required
        />
        <button>Update</button>
      </form>
     
      <BackButton/>
    </>
  )
}

export default withAuth(["admin_empresa"])(UserDetail);