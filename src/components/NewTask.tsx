import { useState } from "react";
import { useTask } from "../context/TasksContext"

const NewTask = ({theme}:any) => {
    const {toggleAddNewTask , getAddNewTask, addNewTask, getInCompTasks} = useTask();
    const [showError, setshowError] = useState("")
    let input = document.getElementById("newTaskInput") as HTMLInputElement;
    if (input) { 
        input.addEventListener('keypress', function (event) { 
            if (event.key === "Enter") { 
                event.preventDefault();
                let apply = document.getElementById("apply") as HTMLInputElement ; 
                apply.click();
                input.style.borderColor = "var(--purple)";
                setshowError("");
            }
        })
    }
    const createTask = () => { 
        let input  = document.getElementById("newTaskInput") as HTMLInputElement;
        let val = input.value ; 
        // an empty task 
        if (val == "") { 
            input.style.borderColor = "red";
            let p = document.getElementById("empty-task")as HTMLElement;
            p.style.visibility = "visible";
            setshowError("A task can't be empty");
        }
        else if (getInCompTasks().includes(val)) { 
            input.style.borderColor = "red";
            let p = document.getElementById("empty-task")as HTMLElement;
            p.style.visibility = "visible";
            setshowError("This task already exists");
        }
        else { 
            input.style.borderColor = "var(--purple)";
            setshowError("");
            input.value = "";
            addNewTask(val);
            closeNewTaskScreen()
        }
    }

    const closeNewTaskScreen = () => { 
        let input  = document.getElementById("newTaskInput") as HTMLInputElement;
        input.style.borderColor = "var(--purple)";
        setshowError("");

        toggleAddNewTask();
    }
  return (
    <div className={`${getAddNewTask() == 1 ? " opacity-100 z-30 " : " opacity-0 -z-10"}`}>
        <div 
        className={` absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${getAddNewTask() == 1 ? " opacity-100 z-50 " : " opacity-0 -z-0"}
                    p-8 rounded-md bg-background shadow-lg flex flex-col items-center gap-10
        `}>
            <h2 className="text-font-color font-bold text-2xl">New Task</h2>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col ">
                    <input autoFocus id="newTaskInput" type="text"  placeholder='Add a new task...' maxLength={60}
                    className={`text-font-color px-3 py-2 outline-none border-solid bg-background ${ !theme ? "hover:bg-gray-200 focus:bg-gray-200" : "hover:bg-zinc-700 focus:bg-zinc-700"} trans border-[1px] border-purple rounded-md w-[250px] min-[380px]:w-[300px] min-[490px]:w-[400px] min-[630px]:w-[550px] `} />
                    <p id="empty-task" className=" text-red-500  mt-1 invisible ">{showError}</p>
                </div>
                <div className="w-full flex justify-between items-center">
                    <button onClick={closeNewTaskScreen} className={`text-purple border-[1px] border-solid border-purple font-bold px-3 py-2 rounded-md trans ${!theme ? "hover:bg-gray-200 focus:bg-gray-200" : "hover:bg-zinc-700 focus:bg-zinc-700"} `}>Cancel</button>
                    <button id="apply" onClick={createTask} className="text-white font-bold px-3 py-2 bg-purple  rounded-md trans hover:opacity-90">Apply</button>
                </div>
            </div>
        </div>
        <div onClick={closeNewTaskScreen} className={` absolute w-full h-full top-0 left-0 bg-black opacity-50 `} />
    </div>
  )
}

export default NewTask