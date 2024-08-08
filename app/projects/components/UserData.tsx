"use client"

import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserData = () => {
  const displayName = useSelector((state: RootState) => state.user.displayName);
  const email = useSelector((state: RootState) => state.user.email);
  const profilePicUrl = useSelector((state: RootState) => state.user.profilePicUrl);
  const id = useSelector((state: RootState) => state.user.id);

  return (
    <div className="px-4 py-1 flex gap-4 items-center justify-end">
      <div>
        <Avatar>
          <AvatarImage src={profilePicUrl}/>
          <AvatarFallback>{displayName ? displayName.split("")[0] : "N/A"}</AvatarFallback>
        </Avatar>
      </div>
      <div>{displayName}</div>
    </div>
  )
}

export default UserData;