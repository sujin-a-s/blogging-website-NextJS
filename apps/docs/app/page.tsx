"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-hot-toast";


export default function Page(): JSX.Element {
  const router = useRouter()
    const pushtoSignup = () => {
      router.push("/signup")
    }

    useEffect(()=>{
      pushtoSignup()
    },[])

    return (
      <div></div>
    )
}
