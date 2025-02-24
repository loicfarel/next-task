"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTasks } from "@/app/hooks/useTasks";
import { Badge } from "@/components/ui/badge";
import { getLabelStatus } from "@/app/helpers/task";

export default function TaskDetail() {
  const { id } = useParams();
  const { tasks } = useTasks();
  const task = tasks.find((t) => t.id === id);

  if (!task)
    return <p className="text-center text-gray-500">Tâche introuvable</p>;

  return (
    <main className="container space-y-2.5 mx-auto p-4">
      <div className="mb-5">
        <Link href="/">
          <Button>Retour</Button>
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-4">
        {task.title}
        <Badge className="ml-2" variant="secondary">
          {getLabelStatus(task.status)}
        </Badge>
      </h1>
      <p className="text-sm text-gray-900">
        <span className="font-semibold">Catégorie :</span> {task.category}
      </p>
      <p className="text-sm text-gray-900">
        <span className="font-semibold">Contenu :</span> {task.content}
      </p>
      <p className="text-sm text-gray-900">
        <span className="font-semibold">Période :</span> {task.startDate}
        {" - "}
        {task.endDate}
      </p>
    </main>
  );
}
