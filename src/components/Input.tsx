import search from "../assets/search.svg"
import chevron from "../assets/chevron.svg"
import darkTheme from '../assets/darkTheme.svg'
import lightTheme from '../assets/lightTheme.svg'
import { useState } from "react"
import { useTask } from "../context/TasksContext"
import Tasks from "./Tasks"
const Input = () => {
  const [openFilterList, setopenFilterList] = useState(false); // closed by default 
  const [isdarktheme, setIsDarktheme] = useState(false); // light by default 
  const {changeFilterCond , getFilterCond, changeSearch} = useTask();
  // const [getCond] = useState(getFilterCond())
  const toggleTheme = () => { 
    if (isdarktheme) { 
      document.body.classList.remove("dark-theme");
      document.body.classList.add("light-theme");
      setIsDarktheme(false)
    }
    else { 
      document.body.classList.remove("light-theme");
      document.body.classList.add("dark-theme");
      setIsDarktheme(true)
    }
  }
  const toggleFilterList = () => { 
    if (openFilterList) { 
      setopenFilterList(false)
    }
    else { 
      setopenFilterList(true)
    }
  }

  const searchTask = () => { 
    let input = document.getElementById("search-in") as HTMLInputElement ; 
    changeSearch(input.value);
  }
  return (
    <div className='w-fit mx-auto h-[100vh] flex items-center justify-center flex-col gap-8'>
      <h1 className='font-bold text-2xl text-font-color'>TODO LIST</h1>
      
      {/* body */}
      <div className='flex flex-col-reverse items-center min-[530px]:flex-row gap-4'>
        <div className="relative">
          <input id="search-in" onChange={searchTask} type="text" placeholder='Search task...' maxLength={60}
            className={`text-font-color px-3 py-2 outline-none border-solid bg-background ${ !isdarktheme ? "hover:bg-gray-200 focus:bg-gray-200" : "hover:bg-zinc-700 focus:bg-zinc-700"} trans border-[1px] border-purple rounded-md w-[300px]  min-[780px]:w-[550px] `} />
          <img src={search} className=" absolute top-1/2 right-3 w-5 -translate-y-1/2" alt="search task" />
        </div>

        {/* Filter tasks */}
        <div className="flex flex-row gap-4 h-full ">
            <div className="relative w-32">
                <button onClick={toggleFilterList} className=" bg-purple px-3 h-full py-1 w-full rounded-md flex  items-center justify-between cursor-pointer trans hover:opacity-90">
                  {/* Chosen way to filter */}
                  <span className="text-white font-bold   capitalize">{getFilterCond() == 0 ? "All" : getFilterCond() == 1 ? "Complete" : "Incomplete"}</span>
                  <img src={chevron} className={`${openFilterList ? " rotate-180" : " rotate-0"} trans w-3 mt-1`} alt="" />
                </button>
                <ul className={` z-20 w-full absolute text-left mt-1 border-[1px] transition-opacity duration-100 ${openFilterList ? " opacity-100" : " opacity-0"}  border-solid border-purple  rounded-md bg-background flex flex-col top-full left-0 `}>
                <li onClick={() => {changeFilterCond(0) ; toggleFilterList()} } className={`text-font-color transition-height duration-200  ${openFilterList ? "h-full px-2 py-1" : "h-0 p-0 "} cursor-pointer trans w-full   rounded-t-md  ${!isdarktheme ? "hover:bg-gray-200 focus:bg-gray-200" : "hover:bg-zinc-700 focus:bg-zinc-700"}`}>All</li>
                <li onClick={() => {changeFilterCond(1) ; toggleFilterList()} } className={`text-font-color transition-height duration-200  ${openFilterList ? "h-full px-2 py-1" : "h-0 p-0 "} cursor-pointer trans w-full   ${!isdarktheme ? "hover:bg-gray-200 focus:bg-gray-200" : "hover:bg-zinc-700 focus:bg-zinc-700"}`}>Complete</li>
                <li onClick={() => {changeFilterCond(2) ; toggleFilterList()} } className={`text-font-color transition-height duration-200  ${openFilterList ? "h-full px-2 py-1" : "h-0 p-0 "} cursor-pointer trans w-full  rounded-b-md  ${!isdarktheme ? "hover:bg-gray-200 focus:bg-gray-200" : "hover:bg-zinc-700 focus:bg-zinc-700"}`}>Incomplete</li>
                </ul>
            </div>
            {/* Toggle theme */}
            <button onClick={toggleTheme} className='rounded-md bg-purple trans hover:opacity-90 w-12 flex items-center justify-center px-3 py-1 '>
              <img src={!isdarktheme ? darkTheme : lightTheme} className="w-5" alt="" />
            </button>
            
        </div>
      </div>
      
      <Tasks theme={isdarktheme} />
    </div>
  )
}

export default Input ;