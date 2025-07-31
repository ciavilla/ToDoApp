export interface Task {
    id: string;
    title: string;
    color: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateTaskData {
    title: string;
    color: string;
}

export interface UpdateTaskData {
    title?: string;
    color?: string;
    completed?: boolean;
}

export const TASK_COLORS = [
    { name: 'Red', value: 'red', class: 'bg-task-red' },
    { name: 'Orange', value: 'orange', class: 'bg-task-orange' },
    { name: 'Yellow', value: 'yellow', class: 'bg-task-yellow' },
    { name: 'Green', value: 'green', class: 'bg-task-green' },
    { name: 'Blue', value: 'blue', class: 'bg-task-blue' },
    { name: 'Indigo', value: 'indigo', class: 'bg-task-indigo' },
    { name: 'Purple', value: 'purple', class: 'bg-task-purple' },
    { name: 'Pink', value: 'pink', class: 'bg-task-pink' },
    { name: 'Brown', value: 'brown', class: 'bg-task-brown' },
] as const;
