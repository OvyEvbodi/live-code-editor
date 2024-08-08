"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Google, GitHub } from '@mui/icons-material';
import { signInWithGoogle, signInWithGithub } from "@/lib/auth-utils"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { auth } from "@/config/firebase.config";

const SignIn = () => {
  const router = useRouter();

  useEffect(() => {
    const authStatus = auth.onAuthStateChanged(cred => {
      if (cred) {
        router.push("/")      }
    })
    return (() => authStatus())
  }, [router])
  
  return (
    <div className="">
      <h1>Sign In </h1>
      <p>Please choose Google or Github for now, thanks.</p>
      <form className="flex flex-col gap-4 lg:w-2/5 mt-4">
        <Input placeholder="email" />
        <Input placeholder="password" />
        <Button>Sign in</Button>
      </form>
      <Button onClick={signInWithGoogle} className="mt-6 px-20 flex gap-4 bg-[hsl(var(--secondary))] text-[hsl(var(--foreground)) hover:text-[hsl(var(--background))]"><Google /> <span>Sign in with Google</span></Button>
      <Button onClick={signInWithGithub} className="mt-6 px-20 flex gap-4 bg-[hsl(var(--secondary))] text-[hsl(var(--foreground)) hover:text-[hsl(var(--background))]"><GitHub /> <span>Sign in with GitHub</span></Button>
    </div>
  )
}

export default SignIn;