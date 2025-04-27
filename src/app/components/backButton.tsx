import { useRouter } from "next/navigation"
import { MdOutlineArrowBack } from "react-icons/md";


export default function BackButton () {
  const router = useRouter();

  const handleBack = () => {
      router.back();
  }
  
  return(
      <button onClick={handleBack} className="back-button"> Volver <MdOutlineArrowBack className="img-arrow" /></button>
  )
}