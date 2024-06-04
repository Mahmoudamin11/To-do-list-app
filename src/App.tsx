import TasksContext from "./context/TasksContext"
import Input from "./components/Input"
const App = () => {
  return (
    <TasksContext>
      <Input />
    </TasksContext>
  )
}

export default App