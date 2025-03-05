"use client"

import BackButton from "@/app/components/backButton";
import { IUser } from "@/app/interfaces/interfaces";
import { fetchUserDetail } from "@/utils/fetchUserDetail";
import { withAuth } from "@/utils/withAuth";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function UserDetail () {
  const { userId } = useParams();
  const [user, setUser] = useState<IUser | null>();
  const [loading, setLoading] = useState<boolean>(false)
  
  useEffect(() => {  
      fetchUserDetail(userId, setUser, setLoading);
  }, [])
  
  return (
    <>
      {!user?.nombre ? (
        <h1>Soy el usuario: {user?.email} </h1>
        ):(
        <h1>Soy el usuario: {user?.nombre} </h1>
      )}
     
      <BackButton/>
    </>
  )
}

export default withAuth(["admin_empresa"])(UserDetail);