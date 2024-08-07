"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Google, GitHub } from '@mui/icons-material';
import { signInWithGoogle, signInWithGithub } from "@/lib/auth-utils"

const SignIn = () => {
  return (
    <div className="">
      <h1>Sign In </h1>
      <form className="flex flex-col gap-4 lg:w-2/5">
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