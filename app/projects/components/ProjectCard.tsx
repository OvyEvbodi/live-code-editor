import Image from "next/image";
import { BookmarkBorder, Bookmark } from "@mui/icons-material";

const ProjectCard = () => {
  return (
    <div className="w-72 border-4 bg-[hsl(var(--secondary))]">
      <div className="bg-zinc-700 p-2">
       <Image src="" width={200} height={160} alt="pic alt" />
      </div>
      <div className="flex gap-4 items-center p-3">
        <div className="bg-zinc-200 w-10 h-10 rounded-md">
          <Image src="" width={40} height={40} alt="author pic alt" />
        </div>
        <div className="w-full">
          <h4 className="text-sm font-medium">proj name</h4>
          <div className="flex justify-between w-full">
            <span className="text-sm font-light capitalize">author</span>
            {/* check if saved, then render conditional icon */}
            <BookmarkBorder /> 
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard;