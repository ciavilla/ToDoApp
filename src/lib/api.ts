import axios from 'axios';
import { CreateTaskData, Task, UpdateTaskData } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const taskApi = {
    getTasks: async (): Promise<Task[]> => {
        const response = await api.get<Task[]>('/tasks');
        return response.data;
    },

    createTask: async (data: CreateTaskData): Promise<Task> => {
        const response = await api.post<Task>('/tasks', data);
        return response.data;
    },

    updateTask: async (id: string, data: UpdateTaskData): Promise<Task> => {
        const response = await api.put<Task>(`/tasks/${id}`, data);
        return response.data;
    },

    deleteTask: async (id: string): Promise<void> => {
        await api.delete(`/tasks/${id}`);
    }
};
