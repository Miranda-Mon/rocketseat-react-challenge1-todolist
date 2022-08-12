import { useState } from "react";
import styles from "./Task.module.css";
interface ITask {
  id: string;
  message: string;
  isActive: boolean;
}
interface ITasksCallback {
  onRemoveTask: Function;
  onIsActive: Function;
  task: ITask;
}
export const Task = ({ task, onRemoveTask, onIsActive }: ITasksCallback) => {
  const [mainTask, setMainTask] = useState<ITask>(task);
  function handleRemoveTask() {
    onRemoveTask(task.id);
  }
  function handleIsActive() {
    console.log(task.isActive);
    setMainTask({
      id: task.id,
      isActive: !task.isActive,
      message: task.message,
    });
    onIsActive(!task.isActive, task.id);
  }
  return (
    <div className={styles.row}>
      <div>
        <input
          className={styles.checkbox}
          type="checkbox"
          onChange={handleIsActive}
          name=""
        />

        <label htmlFor="">
          {mainTask.isActive ? <s>{task.message}</s> : task.message}
        </label>
      </div>
      <div>
        <label htmlFor="" onClick={handleRemoveTask}>
          Apagar
        </label>
      </div>
    </div>
  );
};
