'use client'
import SearchKeyword from "@/models/SearchKeyword"
import commonStore from "@/stores/CommonStore";
import { useEffect, useRef } from "react";
import { Search } from "react-feather"
import { useDebounce, useDebouncedCallback } from 'use-debounce';


interface Props {
  search: (search: SearchKeyword) => void
  
}

const SearchComponent = ({ search }: Partial<Props>) => {
  /**
   * When user input keyword, 
   * create new SearchKeyword object with "title"
   * and perform debounce search
   */
  const handleInput = useDebouncedCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const keyword = event.target.value;
        const searchKeyword = new SearchKeyword(keyword)
        search!(searchKeyword)
      }, 300 )
  
  // Input ref
  const searchInput = useRef<HTMLInputElement | null>(null);
  // Focus input when search page mounted
  useEffect(() => {
    if (searchInput.current && search) {
      searchInput.current.focus();
    }
  }, [])

  // Open search page
  const { openSearch } = commonStore;

  return search 
  ? (
    <div className="relative w-full">
        <input ref={searchInput} onChange={handleInput} type="text" name="search" className="search bg-primary pl-14 w-full py-4 shadow-lg rounded-md placeholder:tracking-wider placeholder:text-sm tracking-wider peer" placeholder="Search" autoComplete="off"></input>
        <Search className="absolute top-4 left-5 text-tertiary peer-focus-visible:text-white duration-200" />
    </div>
  ): (
    <div className="relative w-full">
          <input onClick={openSearch} type="text" name="search" className="search bg-primary pl-14 w-full outline-none cursor-pointer py-4 shadow-lg rounded-md placeholder:tracking-wider placeholder:text-sm tracking-wider peer" placeholder="Search" autoComplete="off"></input>
          <Search className="absolute top-4 left-5 text-tertiary peer-focus-visible:text-white duration-200" />
      </div>
  )
} 

export default SearchComponent