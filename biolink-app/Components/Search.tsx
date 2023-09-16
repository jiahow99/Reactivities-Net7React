import { Search } from "react-feather"

const SearchComponent = () => {
  return (
    <div className="relative">
        <input type="text" name="search" className="search ml-3 bg-primary pl-14 w-full py-4 outline-none shadow-lg rounded-md placeholder:tracking-wider placeholder:text-sm tracking-wider peer" placeholder="Search" autoComplete="off"></input>
        <Search className="absolute top-4 left-5 text-tertiary peer-focus-visible:text-white duration-200" />
    </div>
  )
}

export default SearchComponent