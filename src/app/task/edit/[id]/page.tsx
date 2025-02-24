"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useTasks } from "@/app/hooks/useTasks";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { optionCategories, optionStatus, TaskStatus } from "@/app/types/task";

export default function EditTask() {
  const { tasks, updateTask } = useTasks();
  const router = useRouter();
  const { id } = useParams();

  const [task, setTask] = useState({
    id: "",
    title: "",
    category: "",
    content: "",
    status: TaskStatus.PENDING,
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    if (id) {
      const foundTask = tasks.find((t) => t.id === id);
      if (foundTask) {
        setTask(foundTask);
      }
    }
  }, [id, tasks]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.title || !task.content) return;
    updateTask(task);
    router.push("/");
  };
  if (!task.id)
    return <p className="text-center mt-8 text-gray-500">Chargement ...</p>;
  return (
    <main className="max-w-lg w-full shadow mt-4 mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Modifier la tâche</h1>
      <form className="grid w-full gap-4" onSubmit={handleSubmit}>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="title">Titre</Label>
          <Input
            name="title"
            placeholder="Titre"
            value={task.title}
            onChange={handleChange}
            required
          />
        </div>
        <Select
          value={task.category}
          name="category"
          onValueChange={(e) => setTask({ ...task, category: e })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Catégorie" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Catégorie</SelectLabel>
              {optionCategories.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="content">Contenu</Label>
          <Textarea
            name="content"
            placeholder="Contenu"
            value={task.content}
            onChange={handleChange}
            required
          />
        </div>

        <Select
          value={task.status}
          name="status"
          onValueChange={(e) => setTask({ ...task, status: e as TaskStatus })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              {optionStatus.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="flex w-full gap-2">
          <div className="grid flex-1 items-center gap-1.5">
            <Label htmlFor="startDate">Date début</Label>
            <input
              type="date"
              name="startDate"
              value={task.startDate}
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
              value={task.endDate}
              onChange={handleChange}
              className="border px-2 py-1 rounded-sm"
              required
            />
          </div>
        </div>
        <Button type="submit">Modifier</Button>
      </form>
    </main>
  );
}
