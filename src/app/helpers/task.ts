import { TaskStatus } from "../types/task";

export const getLabelStatus = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.PENDING:
      return "En cours";
    case TaskStatus.COMPLETED:
      return "Terminée";
    case TaskStatus.ARCHIVED:
      return "Archivée";
  }
};
