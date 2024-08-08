import { Search } from "@mui/icons-material";

const SearchBar = () => {
  return (
    <div className="flex gap-4 rounded-md p-3 bg-[hsl(var(--secondary))] hover:shadow-lg hover:shadow-[hsl(var(--accent))]">
      <Search />
      <input className="flex-1  bg-transparent outline-none" type="text" placeholder="search for a project..." />
    </div>
  )
}

export default SearchBar;