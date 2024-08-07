"use client"

import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const ProjectCard = () => {
  const displayName = useSelector((state: RootState) => state.user.displayName);
  const email = useSelector((state: RootState) => state.user.email);
  const profilePicUrl = useSelector((state: RootState) => state.user.profilePicUrl);
  const id = useSelector((state: RootState) => state.user.id);

  return (
    <div>
      {email}
      <p></p>
      {displayName}
      <p>{id}</p>
      {profilePicUrl}
    </div>
  )
}

export default ProjectCard;