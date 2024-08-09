"use client"

import { db } from "@/config/firebase.config";
import { RootState } from "@/redux/store";
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ProjectCard, { ProjectCardProps }  from "@/app/projects/components/ProjectCard";
import TriangleSpinner from "@/components/TriangleSpinner";

const AllProjects = () => {
  const id = useSelector((state: RootState) => state.user.id);
  const [ projectList, setProjectList ] = useState<ProjectCardProps[]>([]);

  useEffect(() => {
    const handleGetProjects = async () => {
      try {
        console.log(id)
        const docRef = doc(db, "caditor-users", id);
        const document = await getDoc(docRef);
        if (document.exists()) {
          document.data().projects && setProjectList(document.data().projects)
          console.log(document.data())
        } else {
          console.log("doc not found... create user!")
        }
      } catch (error) {
        console.log(error)
      }
    };
    handleGetProjects();
  }, [id])

  return (
    <div className="flex gap-8 flex-wrap py-8 justify-center">
      { projectList && projectList.length > 0 ?
        projectList.map((item, index) => (
          <ProjectCard key={index} {...item} />
        )) :
        // projectList && projectList.length === 0 ?
        // <div>No projects yet... Design coming soon, lol.</div> :
        <TriangleSpinner />
      }
    </div>
  )
}

export default AllProjects;