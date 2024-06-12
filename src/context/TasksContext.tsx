import { ReactNode, createContext, useContext, useEffect, useState } from "react"
import IncompleteTask from "../components/IncompleteTask"
import CompletedTask from "../components/CompletedTask"

type child = { 
    children: ReactNode,
}



type taskType = { 
    
    changeFilterCond:(num:number) => void
    getFilterCond:() => number
    toggleAddNewTask:() => void
    getAddNewTask : ()=> number
    addNewTask:(task:string) => void
    showTasks: () => Array<any>
    getInCompTasks: () => Array<string>
    deleteIncompeleteTask : (task:string) => void
    deleteCompletedTask : (task:string) => void
    markAsCompleted : (task:string) => void
    markAsIncompleted : (task:string) => void
    changeSearch:(search:string) => void
}

const taskContext = createContext({} as taskType); // as our type
export function useTask() { 
    return useContext(taskContext);
}
const comp = localStorage.getItem("comp") ? JSON.parse(localStorage.getItem("comp")!)  : [] ;
const inComp = localStorage.getItem("inComp") ? JSON.parse(localStorage.getItem("inComp")!)  : [] ;


function TasksContext({ children }: child) {
    // 0 => all , 1 => comp , 2 => inComp
    const [filterCond, setfilterCond] = useState(0); 
    const [newTask, setaddNewTask] = useState(0);
    const [inCompleteTasks , setInCompleteTasks] = useState< Array<any> >([])
    const [completeTasks , setCompleteTasks] = useState< Array<any> >([])
    const [inCompleteTasksString ] = useState< Array<string> >(inComp)
    const [completeTasksString ] = useState< Array<string> >(comp)
    const [search , setsearch] = useState("")
    // localStorage.clear()
    useEffect(() => { 
        let compArr = new Array();
        let inCompArr = new Array();
        for(let i = 0 ; i < inCompleteTasksString.length ; i++) { 
            inCompArr.push(<IncompleteTask task={inCompleteTasksString[i]} />)
        }
        for(let i = 0 ; i < completeTasksString.length ; i++) { 
            compArr.push(<CompletedTask task={completeTasksString[i]} />)
        }
        setInCompleteTasks(inCompArr);
        setCompleteTasks(compArr);
        
    }, [])

    useEffect(() => { 
        showTasks();
    }, [search])

    const changeSearch = (search:string) => { 
        setsearch(search);
    }

    const changeFilterCond = (num:number) => { 
        setfilterCond(num)
    }
    const getFilterCond = () => { 
        return filterCond ; 
    }

    

    const toggleAddNewTask = () => { 
        let input = document.getElementById("newTaskInput") as HTMLInputElement
        if (newTask == 1) {
            setaddNewTask(0);
            input.readOnly = true ;
            
        }
        else { 
            setaddNewTask(1);
            input.focus();
            input.readOnly = false ;
        }
    }

    const getAddNewTask = () => { 
        return newTask ; 
    }
    const addNewTask = (task:string) => { 
        inCompleteTasks.push(<IncompleteTask task={task}  />);
        inCompleteTasksString.push(task);
        localStorage.setItem("inComp" , JSON.stringify(inCompleteTasksString));
    }
    
    const showTasks = () => { 
        if (search == "") { 
            if (filterCond == 0) { 
                const tasks = inCompleteTasks.concat(completeTasks);
                return tasks ;
            }
            // incomp
            else if (filterCond == 2) { 
                return inCompleteTasks
            }
            else { 
                return completeTasks
            }
        }
        else { 
            return searchTasks();
        }
    }

    const searchTasks = () => { 
        let items  = new Array() ; 
        if (filterCond == 0) { 
            inCompleteTasksString.map((t) => { 
                if (t.toLowerCase().startsWith(search.toLowerCase())) { 
                    items.push(<IncompleteTask task={t} /> );
                }
            })
            completeTasksString.map((t) => { 
                if (t.toLowerCase().startsWith(search.toLowerCase())) { 
                    items.push(<CompletedTask task={t} /> );
                }
            })
        }
        // incomp
        else if (filterCond == 2) { 
            inCompleteTasksString.map((t) => { 
                if (t.toLowerCase().startsWith(search.toLowerCase())) { 
                    items.push(<IncompleteTask task={t} /> );
                }
            })
        }
        else { 
            completeTasksString.map((t) => { 
                if (t.toLowerCase().startsWith(search.toLowerCase())) { 
                    items.push(<CompletedTask task={t} /> );
                }
            })
        }
        return items ; 
    }

    const deleteIncompeleteTask = (task:string) => { 
        let items = new Array();
        for(let i  = 0 ; i < inCompleteTasks.length ; i++) { 
            if (task != inCompleteTasksString[i]  ) { 
                items.push(inCompleteTasks[i]);
            }
            else { 
                inCompleteTasksString.splice(i , 1);
                localStorage.setItem("inComp" , JSON.stringify(inCompleteTasksString));
            }
        }
        setInCompleteTasks(items);
    }
    const deleteCompletedTask = (task:string) => { 
        let items = new Array();
        for(let i  = 0 ; i < completeTasks.length ; i++) { 
            if (task != completeTasksString[i]) { 
                items.push(completeTasks[i]);
            }
            else { 
                completeTasksString.splice(i , 1);
                localStorage.setItem("comp" , JSON.stringify(completeTasksString));
            }
        }
        setCompleteTasks(items);
    }

    const markAsCompleted = (task:string) => { 
        deleteIncompeleteTask(task);
        completeTasks.push(<CompletedTask task={task}  />);
        completeTasksString.push(task);
        localStorage.setItem("comp" , JSON.stringify(completeTasksString));
        localStorage.setItem("inComp" , JSON.stringify(inCompleteTasksString));

    }
    const markAsIncompleted = (task:string) => { 
        deleteCompletedTask(task);
        inCompleteTasks.push(<IncompleteTask task={task}  />);
        inCompleteTasksString.push(task);
        localStorage.setItem("comp" , JSON.stringify(completeTasksString));
        localStorage.setItem("inComp" , JSON.stringify(inCompleteTasksString));

    }


    const getInCompTasks = () => { 
        return inCompleteTasksString ; 
    }

    return (
        <taskContext.Provider value={{changeFilterCond , getFilterCond, toggleAddNewTask , getAddNewTask, addNewTask,
            showTasks, deleteIncompeleteTask, deleteCompletedTask , markAsCompleted , getInCompTasks , changeSearch , markAsIncompleted
        }}>
            {children}
        </taskContext.Provider>
    )
}

export default TasksContext