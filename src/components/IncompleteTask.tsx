import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useTask } from "../context/TasksContext";

const IncompleteTask = ({task}:any) => {
    const {deleteIncompeleteTask , markAsCompleted} = useTask();
  return (
    <div className={`w-[250px] min-[430px]:w-[400px] min-[780px]:w-[600px] h-fit  flex justify-between items-center`}>
        <div className='flex gap-4 items-center justify-center'>
            <button onClick={() => markAsCompleted(task)} className={`bg-background rounded-sm border-[1px] border-solid border-purple flex items-center justify-center trans
                                w-5 h-5
            `}>
            </button>
            <p className='-mt-1  text-font-color'>{task}</p>
        </div>

        <FontAwesomeIcon onClick={() => deleteIncompeleteTask(task)} icon={faTrashCan} className={`trans text-lg  cursor-pointer text-gray-300 hover:text-red-400`} />
    
    </div>
  )
}

export default IncompleteTask