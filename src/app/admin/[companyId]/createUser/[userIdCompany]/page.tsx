"use client"

import BackButton from "@/app/components/backButton";
import { ICompany } from "@/app/interfaces/interfaces";
import { fetchUsersAndProjects } from "@/utils/fetchUsersAndProjects";
import { handleCreateUser } from "@/utils/handleCreateUser";
import { withAuth } from "@/utils/withAuth";
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";

function CreateUser() {
  const [userName, setUserName] = useState<string>("");
  const [companyName, setCompanyName] = useState<ICompany | null >();
  const [userMail, setUserMail] = useState<string>("");
  const [userPass, setUserPass] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("cliente");

  const { userIdCompany } = useParams();

    useEffect(() => {
     fetchUsersAndProjects(userIdCompany, setCompanyName, () => {}, () => {}, () => {});
    }, []);

  const router= useRouter();

  return (
    <div className="container-admin">
      <h2>Crear usuario para {companyName?.nombre}</h2>
      <form onSubmit={(e)=>handleCreateUser(e, userMail, setUserMail, userPass, setUserPass, userName, setUserName, userRole, userIdCompany, router)}>
        <input
          type="text"
          name="name"
          value={userName}
          onChange={(e)=> setUserName(e.target.value)}
          placeholder="nombre"
        />
        <input
          type="email"
          name="email"
          value={userMail}
          onChange={(e)=> setUserMail(e.target.value)}
          placeholder="email"
          required
        />
        <input
          type="password"
          name="pass"
          value={userPass}
          onChange={(e)=> setUserPass(e.target.value)}
          placeholder="contraseña"
          required
        />

        <select
          value={userRole}
          onChange={(e) => setUserRole(e.target.value)}
        >
          <option value="cliente">Cliente</option>
          <option value="admin_empresa">Admin</option>
        </select>

        <button>Añadir</button>
      </form>
      <BackButton/>
    </div>
  )
}

export default withAuth(["admin_empresa"])(CreateUser)
