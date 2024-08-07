"use client"

import { useState } from "react";
import {PersonAdd, KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight, Home, IntegrationInstructions } from "@mui/icons-material";
import Link from "next/link";

const SideNav = () => {
  const [ isNavOpen, setIsNavOpen] = useState(true);
  const [ isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div className={` overflow-hidden p-10 pl-6 absolute h-screen bg-[hsl(var(--secondary))] border-r-2 ${isNavOpen ? 'w-1/5' : 'w-8'} `}>
      <div onClick={() => setIsNavOpen(!isNavOpen)} className="">
        { isNavOpen ?
         <KeyboardDoubleArrowLeft /> :
         <KeyboardDoubleArrowRight />
        }
      </div>
      <nav className="mt-4 flex flex-col gap-6">
      {isLoggedIn ?
       <Link href="/" className="flex gap-6"><Home /> <h2>Home</h2></Link> :
       <Link href="/signup" className="flex gap-6"><PersonAdd /> <h2>Sign in</h2></Link>
       }
      <Link href="/projects" className="flex gap-6"><IntegrationInstructions /> <h2>Projects</h2></Link>
    </nav>
    </div>
    
  )
}

export default SideNav;