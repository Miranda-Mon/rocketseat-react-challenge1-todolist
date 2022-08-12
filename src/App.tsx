import { v4 as uuidv4 } from "uuid";
import "./global.css";
import { Header } from "./components/Header";
import { Task } from "./components/Task";
import {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  HtmlHTMLAttributes,
  useState,
} from "react";
interface ITask {
  id: string;
  message: string;
  isActive: boolean;
}
function App() {
  const [newTask, setNewTask] = useState<ITask[]>([]);
  const [newTaskText, setNewTaskText] = useState("");
  const [count, setCount] = useState(0);

  function handleNewTaskChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("");
    setNewTaskText(event.target.value);
    //setNewTaskText(event.target.value);
  }
  function handleCreateTask(event: FormEvent) {
    event.preventDefault();
    setNewTaskText("");
    setNewTask([
      ...newTask,
      {
        id: uuidv4().toString(),
        message: newTaskText,
        isActive: false,
      },
    ]);
  }

  function handleNewTaskInvalid(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório!");
  }

  function handleDeleteTask(task: string) {
    const removeTask = newTask.filter((item) => {
      item.isActive ? setCount(count - 1) : count;

      return item.id !== task;
    });

    setNewTask((prev) => removeTask);
  }

  function handleIsActive(isActive: boolean, id: string) {
    const result = newTask;
    isActive ? setCount(count + 1) : count == 0 ? 0 : setCount(count - 1);
    result.forEach((element) => {
      element.id == id ? (element.isActive = isActive) : element.isActive;
    });
    console.log(result);

    setNewTask(result);
  }
  return (
    <body>
      <Header />

      <main>
        <div className="newTask">
          <form onSubmit={handleCreateTask} className="newTask">
            <textarea
              name="newTask"
              placeholder="Insira aqui uma nova tarefa"
              onChange={handleNewTaskChange}
              onInvalid={handleNewTaskInvalid}
              value={newTaskText}
              required
            ></textarea>
            <button type="submit">Criar</button>
          </form>
        </div>
        <div className="labelsCount">
          <label htmlFor="">Total de tarefas:{newTask.length}</label>
          <label htmlFor="">Concluídas:{count}</label>
        </div>

        {newTask.length > 0
          ? newTask.map((item) => {
              return (
                <Task
                  key={item.id}
                  task={item}
                  onRemoveTask={handleDeleteTask}
                  onIsActive={handleIsActive}
                ></Task>
              );
            })
          : null}
      </main>
    </body>
  );
}

export default App;
