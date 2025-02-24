"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useTasks } from "@/app/hooks/useTasks";

import { Label } from "@/components/ui/label";
import { TaskStatus } from "@/app/types/task";
import CategorySelect from "@/app/components/CategorySelect";

export default function CreateTask() {
  const { addTask } = useTasks();
  const [correctPeriod, setCorrectPeriod] = useState(false);
  const router = useRouter();

  const [task, setTask] = useState({
    title: "",
    category: "",
    content: "",
    status: TaskStatus.PENDING,
    startDate: "",
    endDate: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (new Date(task.startDate) > new Date(task.endDate)) {
      setCorrectPeriod(true);
      return;
    }
    if (!task.title || !task.content) return;

    addTask({
      ...task,
      id: Date.now().toString(),
    });

    router.push("/");
  };

  return (
    <main className="max-w-lg w-full shadow mt-4 mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Créer une tâche</h1>
      <form className="grid w-full gap-4" onSubmit={handleSubmit}>
        <div className="grid w-full  items-center gap-1.5">
          <Label htmlFor="title">Titre</Label>
          <Input
            name="title"
            placeholder="Titre"
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid w-full  items-center gap-1.5">
          <Label htmlFor="category">Catégorie</Label>
          <CategorySelect
            value={task.category}
            onChange={(category) => setTask({ ...task, category })}
          />
        </div>

        <div className="grid w-full  items-center gap-1.5">
          <Label htmlFor="content">Contenu</Label>
          <Textarea
            name="content"
            placeholder="Contenu"
            onChange={handleChange}
            required
          />
        </div>
        <div className="">
          <div className="flex w-full gap-2">
            <div className="grid flex-1 items-center gap-1.5">
              <Label htmlFor="startDate">Date début</Label>
              <input
                type="date"
                name="startDate"
                onChange={handleChange}
                className="border px-2 py-1 rounded-sm"
                required
              />
            </div>
            <div className="grid flex-1 items-center gap-1.5">
              <Label htmlFor="endDate">Date fin</Label>
              <input
                type="date"
                name="endDate"
                onChange={handleChange}
                className="border px-2 py-1 rounded-sm"
                required
              />
            </div>
          </div>
          <p className="text-red-500 py-1 text-sm">
            {correctPeriod &&
              "La date de fin doit etre superieur a la date de debut"}
          </p>
        </div>
        <Button type="submit">Créer</Button>
      </form>
    </main>
  );
}
