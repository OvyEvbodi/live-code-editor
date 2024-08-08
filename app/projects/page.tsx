import UserData from "@/app/projects/components/UserData";
import SearchBar from "@/app/projects/components/SearchBar";
import ProjectCard from "@/app/projects/components/ProjectCard";
const ProjectsPage = () => {
  return (
    <main className="">
      <div className="flex justify-between items-center ">
      <h1>Projects page</h1>
      <UserData />
      </div>
      <SearchBar />
      <div className="flex gap-8 flex-wrap py-8 justify-center">
      {
        [...Array(9)].map((_, index) => (
          <ProjectCard key={index} />
        ))
      }
      </div>
    </main>
  )
}

export default ProjectsPage;
