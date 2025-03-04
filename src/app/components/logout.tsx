import { logout } from "@/utils/logout"
import { useRouter } from "next/navigation"
import { useState } from "react";

export default function Logout() {
  const [loading, setLoading] = useState<string>("");
  const router = useRouter();


  return (
    <button onClick={()=> logout(setLoading, router)}>Cerrar sesión</button>
  );
};
