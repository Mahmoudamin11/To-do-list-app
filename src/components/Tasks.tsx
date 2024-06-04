import emptyDark from "../assets/empty-dark.svg"
import emptyLight from "../assets/empty-light.svg"
import addTaskIcon from "../assets/Vector (1).svg"
import NewTask from "./NewTask"
import { useTask } from "../context/TasksContext"
const Tasks = ({theme}:any) => {
    const {toggleAddNewTask, showTasks} = useTask();
  return (
    <div className='w-full flex flex-col items-center '>
        
        {/* Display tasks */}
        <div className="w-full relative z-10 h-[350px] overflow-y-scroll  scrollbar-none   flex justify-center ">
            {
                showTasks().length == 0  
                ? 
                <div className="w-full h-full flex items-center justify-center">
                    <img src={theme ? emptyDark : emptyLight} className="w-72" alt="empty-dark-theme" />
                </div>
                :
                <div className="w-[250px] min-[430px]:w-[400px] min-[780px]:w-[600px] h-full flex flex-col items-center justify-start  gap-4">
                    {
                        showTasks().map((task, index) => (
                            <div key={index} className={`pb-4  ${index < showTasks().length - 1 ? "border-b-[1px] border-b-solid border-b-purple" : ""}`}>
                                {task}
                            </div>
                        ))
                    }
                </div>
            }
        </div>


        <div onClick={toggleAddNewTask} className=" relative z-10  w-full flex justify-end">
            <button className="w-12  h-12 rounded-full bg-purple flex items-center justify-center trans hover:opacity-90 ">
                <img src={addTaskIcon} className=" w-5" alt="Add Task" />
            </button>
        </div>
        {/* add margin top for this  */}
        <NewTask theme={theme} />
    </div>
  )
}

export default Tasks