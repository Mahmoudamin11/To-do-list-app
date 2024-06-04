import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import done from "../assets/Rectangle 18.svg"
import { useTask } from "../context/TasksContext";

const CompletedTask = ({task}:any) => {
    const {deleteCompletedTask, markAsIncompleted} = useTask();
    return (
        <div className={`w-[250px] min-[430px]:w-[400px] min-[780px]:w-[600px] h-fit  flex justify-between items-center`}>
            <div className='flex gap-4 items-center justify-center'>
                <button onClick={() => markAsIncompleted(task)}  className={`bg-purple rounded-sm border-[1px] border-solid border-purple flex items-center justify-center trans
                                    w-6 h-6
                `}>
                    <img src={done} alt="marked" className="w-4" />
                </button>
                <p className='-mt-1   text-gray-300 relative before:w-full before:absolute before:h-[1px] before:bg-font-color before:top-1/2 before:left-0'>{task}</p>
            </div>

            <FontAwesomeIcon onClick={() => {deleteCompletedTask(task)} } icon={faTrashCan} className={`trans text-lg  cursor-pointer text-gray-300 hover:text-red-400`} />
        
        </div>
)}

export default CompletedTask