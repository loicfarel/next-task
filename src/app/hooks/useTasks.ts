import { useEffect, useState } from "react";
import { Task } from "../types/task";

const STORAGE_KEY = "tasks";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem(STORAGE_KEY);
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const saveTasks = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
  };

  const addTask = (task: Task) => {
    saveTasks([...tasks, task]);
  };

  const deleteTask = (id: string) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    saveTasks(filteredTasks);
  };

  const updateTask = (updatedTask: Task) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    saveTasks(updatedTasks);
  };

  // const updateTaskStatus = (id: string, status: TaskStatus) => {
  //   const updatedTasks = tasks.map((task) =>
  //     task.id === id ? { ...task, status } : task
  //   );
  //   saveTasks(updatedTasks);
  // };

  return { tasks, addTask, deleteTask, updateTask };
}
