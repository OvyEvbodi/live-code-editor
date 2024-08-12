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
  const searchString = useSelector((state: RootState) => state.user.searchString);
  const searchMode = searchString != "";

  const [ filteredProjects, setFilteredProjects ] = useState<ProjectCardProps[] | []>([]);

  useEffect(() => {
    const handleGetProjects = async () => {
      try {
        const docRef = doc(db, "caditor-users", id);
        const document = await getDoc(docRef);
        if (document.exists()) {
          document.data().projects && setProjectList(document.data().projects)
        } else {
          console.log("doc not found... create user!")
        } 
      } catch (error) {
        console.log(error)
      }
    };
    handleGetProjects();
  }, [id])

  useEffect(() => {
    setFilteredProjects(projectList.filter((project) => {
      return project.title.toLowerCase().includes(searchString.toLowerCase());
    }))
  }, [projectList, searchString])

  return (
    <div className="flex gap-8 flex-wrap py-8 justify-center">
      {
        !searchMode ? 
        projectList && projectList.length > 0 ? 
          projectList.map((item, index) => (
            <ProjectCard key={index} {...item} />
          ))
        : <div>Your projects will appear here.
            <TriangleSpinner />
          </div>
        :
        filteredProjects && filteredProjects.length > 0 ? 
          filteredProjects.map((item, index) => (
            <ProjectCard key={index} {...item} />
          )) 
        : <div>
            Eeeerm, we&apos;re pretty sure you don&apos;t have a project with this title... Try another search.
          </div>
      }
    </div>
  )
}

export default AllProjects;
