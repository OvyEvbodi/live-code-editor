import UserData from "@/app/projects/components/UserData";
import SearchBar from "@/app/projects/components/SearchBar";
import ProjectCard from "@/app/projects/components/ProjectCard";
import Logo from "@/components/Logo";
import AllProjects from "@/app/projects/components/AllProjects";
const ProjectsPage = () => {
  return (
    <main className="">
      <Logo />
      <div className="flex justify-between items-center ">
      <h1>Projects page</h1>
      <UserData />
      </div>
      <SearchBar />
      <AllProjects />
    </main>
  )
}

export default ProjectsPage;
