export enum TaskStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  ARCHIVED = "archived",
}

export type Task = {
  id: string;
  title: string;
  category: string;
  content: string;
  startDate: string;
  endDate: string;
  status: TaskStatus;
};

export const optionStatus = [
  {
    value: TaskStatus.PENDING,
    label: "En cours",
  },
  {
    value: TaskStatus.COMPLETED,
    label: "Terminée",
  },
  {
    value: TaskStatus.ARCHIVED,
    label: "Archivée",
  },
];

export const optionCategories = [
  "CATÉGORIE 1",
  "CATÉGORIE 2",
  "CATÉGORIE 3",
  "CATÉGORIE 4",
];
