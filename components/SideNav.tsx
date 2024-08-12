"use client"

import { useEffect, useState } from "react";
import {PersonAdd, KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight, Home, IntegrationInstructions, Add } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth } from "@/config/firebase.config";

const SideNav = () => {
  const [ isNavOpen, setIsNavOpen] = useState(true);
  const [ isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    try {
      const authStatus = auth.onAuthStateChanged(cred => {
        if (cred) {
          setIsLoggedIn(true)
        }
      })
      return (() => authStatus())
    } catch(error) {
      console.log(error)
    }
  }, [router])
  

  return (
    <div className={`overflow-hidden p-10 pl-6 relative min-h-screen bg-[hsl(var(--secondary))] border-r-2 transition-all duration-500 ease-in-out ${isNavOpen ? 'w-8 lg:min-w-[20%]' : 'w-8'} `}>
      <div onClick={() => setIsNavOpen(!isNavOpen)} className="">
        { isNavOpen ?
         <KeyboardDoubleArrowLeft /> :
         <KeyboardDoubleArrowRight />
        }
      </div>
      <nav className="mt-4 flex flex-col gap-6">
      <Link href="/new-project" className="flex gap-6"><Add /> <h2>New</h2></Link>
      {isLoggedIn ?
       <Link href="/" className="flex gap-6"><Home /> <h2>Home</h2></Link> :
       <Link href="/signin" className="flex gap-6"><PersonAdd /> <h2>SignIn</h2></Link>
       }
      <Link href="/projects" className="flex gap-6"><IntegrationInstructions /> <h2>Projects</h2></Link>

    </nav>
    </div>
    
  )
}

export default SideNav;