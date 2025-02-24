"use client";

import Link from "next/link";
import { useTasks } from "./hooks/useTasks";
import { Button } from "@/components/ui/button";
import { DeleteTaskModal } from "./components/DeleteTaskModal";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getLabelStatus } from "./helpers/task";
export default function Home() {
  const { tasks, deleteTask } = useTasks();

  return (
    <main className="container mx-auto p-4">
      <div className="flex gap-6 items-center">
        <h1 className="text-2xl font-bold mb-4">Liste des tâches</h1>
        <Link href="/task/create">
          <Button className="mb-4">Créer une tâche</Button>
        </Link>
      </div>
      {tasks.length > 0 ? (
        <div className="grid grid-cols-4 w-full gap-4">
          {tasks.map((task) => (
            <Card className="w-full" key={task.id}>
              <CardHeader>
                <CardTitle>
                  {task.title}
                  <Badge className="ml-2" variant="secondary">
                    {getLabelStatus(task.status)}
                  </Badge>
                </CardTitle>
                <CardDescription>{task.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{task.content}</p>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Link href={`/task/${task.id}`}>
                  <Button variant="outline">Voir</Button>
                </Link>
                <Link href={`/task/edit/${task.id}`}>
                  <Button variant="default">Modifier</Button>
                </Link>
                <DeleteTaskModal onConfirm={() => deleteTask(task.id)} />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <p className="mt-8 text-gray-500">Aucune tâche disponible.</p>
      )}
    </main>
  );
}
