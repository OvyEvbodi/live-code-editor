"use client"

import Image from "next/image";
import { useEffect } from "react";
import { BookmarkBorder, Bookmark } from "@mui/icons-material";

export interface ProjectCardProps {
  title: string;
  htmlCode: string;
  cssCode: string;
  jsCode: string;
  ouput: string;
  userId: string;
  author: string;
  picture: string;
  saved: boolean;
  projectId: number;
}

const ProjectCard = (props: ProjectCardProps) => {
  return (
    <div className="w-72 border-4 bg-[hsl(var(--secondary))]">
      <div className="bg-zinc-700 p-2">
        <iframe
        title="project preview"
        srcDoc={props.ouput}
        className="w-full h-full"
        />       
      </div>
      <div className="flex gap-4 items-center p-3">
        <div className="bg-zinc-200 w-14 h-10 rounded-md overflow-hidden flex justify-center items-center">
          {props.picture && <Image src={props.picture} width={48} height={48} alt="author's profile picture" />}
        </div>
        <div className="w-full">
          <h4 className="text-sm font-medium">{props.title}</h4>
          <div className="flex justify-between w-full">
            <span className="text-sm font-light capitalize">{props.author}</span>
            {
              props.saved ? 
              <Bookmark /> :
              <BookmarkBorder /> 
            }
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard;