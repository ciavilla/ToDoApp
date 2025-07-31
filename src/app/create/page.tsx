'use client';

import { useRouter } from 'next/navigation';
import { taskApi } from '@/lib/api';
import TaskForm from '@/components/TaskForm';
import Header from '@/components/Header';
import { CreateTaskData } from '@/types';
import { useState } from 'react';

export default function CreateTask() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (data: CreateTaskData) => {
        setIsLoading(true);
        try {
            await taskApi.createTask(data);
            router.push('/');
        } catch (error) {
            console.error('Error creating task:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='w-[1440px] h-[1024px] mx-auto bg-[#1A1A1A] overflow-hidden'>
            <Header />
            <TaskForm
                onSubmit={handleSubmit}
                isLoading={isLoading}
            />
        </div>
    );
}
