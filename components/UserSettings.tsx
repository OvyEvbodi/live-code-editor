"use client"

import { Button } from "./ui/button";
import { Input } from "./ui/input";

const UserSettings = () => {
  return (
    <div className="flex flex-col gap-4 lg:w-2/5 mt-4">
      <h2>User Settings</h2>
      <p>This section is currently under development. Please check back on the 15th of August, 2024.</p>
      <form className="flex flex-col gap-4 lg:w-2/5 mt-4">
        <Input type="email" placeholder="update email" />
        <Input type="text" placeholder="update display name" />
        <Input type="file" name="dp" placeholder="update avatar" className="bg-slate-500 cursor-pointer"/>
        <Button className="cursor-not-allowed bg-slate-300 hover:bg-slate-300">Update settings</Button>
      </form>
    </div>
  )
}

export default UserSettings;