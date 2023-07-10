// task.model.ts

export interface Task {
    id?: number;
    title: string;
    completed: boolean;
    status: string; // Add the status property
    category: string; // Add the 'category' property
    dueDate?: Date; // Make the property optional by adding '?'
    estimate?: {
      value: number;
      units: string;
    }| undefined;
    importance?: string; // Add the importance property
  }

  