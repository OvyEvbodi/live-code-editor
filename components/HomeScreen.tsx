"use client"

import { auth } from "@/config/firebase.config";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { handleSignOut } from "@/lib/auth-utils";

const HomeScreen = () => {
  const router = useRouter();
  useEffect(() => {
    const authStatus = auth.onAuthStateChanged(cred => {
      if (cred) {
        // console.log(cred?.providerData[0].email)
      } else {
        router.push("/signin")
      }
    })
  }, [router])
  return (
    <div>
      <Button onClick={handleSignOut}>Sign out</Button>
    </div>
  )
}

export default HomeScreen;