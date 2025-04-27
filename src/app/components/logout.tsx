import { logout } from "@/utils/logout"
import { useRouter } from "next/navigation"
import { useState } from "react";
import { IoMdLogOut } from "react-icons/io";



export default function Logout() {
  const [loading, setLoading] = useState<string>("");
  const router = useRouter();


  return (
    <>
    <button onClick={()=> logout(setLoading, router)} >Log out <IoMdLogOut className="img-btn"/></button>
    </>
  );
};
