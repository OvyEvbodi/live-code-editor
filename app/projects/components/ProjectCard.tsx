"use client"

import Image from "next/image";
import {  useState } from "react";
import { Loyalty } from "@mui/icons-material";
import { EditProject } from "@/redux/user.slice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase.config";

export interface ProjectCardProps {
  title: string;
  htmlCode: string;
  cssCode: string;
  jsCode: string;
  output: string;
  userId: string;
  author: string;
  picture: string;
  saved: boolean;
  projectId: number;
}

const ProjectCard = (props: ProjectCardProps) => {
  const [ isSaved, setIsSaved ] = useState(props.saved);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleEditProject = (projectData: ProjectCardProps) => {
    dispatch(EditProject(projectData))
    router.push("/new-project")
  };
  
  const handleLike = async (projectData: ProjectCardProps, projectId: number) => {
    setIsSaved(prev => !prev)
    try {
      const docRef = doc(db, "caditor-users", projectData.userId);
      const document = await getDoc(docRef);

      if (document.exists()) {
        const projData = document.data().projects.map((item: ProjectCardProps, index: number) => {
          if (index === projectId) {
            item.saved = !item.saved;
          }
          return item
        });
        updateDoc(docRef, {
          projects: projData
        })
      }
    } catch (error) {
      console.log(error)
      setIsSaved(prev => !prev)
    }
  };

  return (
    <div className="w-72 border-4 bg-[hsl(var(--secondary))] overflow-hidden">
      <div className="bg-zinc-700 p-2">
        <iframe
        title="project preview"
        srcDoc={props.output}
        className="w-full h-full"
        />       
      </div>
      <div className="px-3 pt-1 flex justify-between items-center overflow-hidden">
        <div className="flex flex-grow justify-between items-center gap-4">
          <div className="bg-[hsl(var(--secondary))] w-16 h-12 rounded-md overflow-hidden flex justify-center items-center">
            {props.picture && <Image src={props.picture} width={48} height={48} alt="author's profile picture" />}
          </div>
          <div onClick={() => handleEditProject(props)} className="cursor-pointer p-2 w-full">
            <h4 className="text-sm font-medium">{props.title}</h4>
            <div className="flex justify-between w-full">
              <span className="text-sm font-light capitalize">{props.author}</span>
            </div>
          </div>
        </div>
        <Loyalty onClick={() => handleLike(props, props.projectId)} className={`cursor-pointer ${isSaved && 'text-[hsl(var(--accent))]'}`} />
      </div>
    </div>
  )
}

export default ProjectCard;