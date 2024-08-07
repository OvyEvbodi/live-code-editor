import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
const SignIn = () => {
  return (
    <div className="">
      <h1>Sign In </h1>
      <form className="flex flex-col gap-4 lg:w-2/5">
        <Input placeholder="email" />
        <Input placeholder="password" />
        <Button>Sign in</Button>
      </form>
    </div>
  )
}

export default SignIn;