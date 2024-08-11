"use client"

import { useDispatch } from "react-redux";
import { setSearchString } from "@/redux/user.slice"
import { Search } from "@mui/icons-material";
import { useState } from "react";

const SearchBar = () => {

  const dispatch = useDispatch();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    dispatch(setSearchString(event.target.value))
  };

  return (
    <div className="flex gap-4 rounded-md p-3 bg-[hsl(var(--secondary))] hover:shadow-lg hover:shadow-[hsl(var(--accent))]">
      <Search />
      <input onChange={ handleSearch }  className="flex-1  bg-transparent outline-none" type="text" placeholder="search for a project..." />
    </div>
  )
}

export default SearchBar;