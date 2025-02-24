"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

export default function CreateTask() {
  const { addTask } = useTasks();
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
        <Select
          defaultValue="CATÉGORIE 1"
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
        <div className="grid w-full  items-center gap-1.5">
          <Label htmlFor="content">Contenu</Label>
          <Textarea
            name="content"
            placeholder="Contenu"
            onChange={handleChange}
            required
          />
        </div>

        <Select
          defaultValue="pending"
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
        <Button type="submit">Créer</Button>
      </form>
    </main>
  );
}
