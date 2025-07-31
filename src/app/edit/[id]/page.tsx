'use client';

import TaskForm from "@/components/TaskForm";
import Header from "@/components/Header";
import { taskApi } from "@/lib/api";
import { Task, UpdateTaskData } from "@/types";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditTask() {
    const router = useRouter();
    const params = useParams();
    const [task, setTask] = useState<Task | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const taskId = params.id as string;

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const tasks = await taskApi.getTasks();
                const foundTask = tasks.find(t => t.id === taskId);

                if (foundTask) {
                    setTask(foundTask);
                } else {
                    setError('Task not found');
                }
                } catch (err) {
                    setError('Failed to load task');
                    console.error('Error fetching task:', err);
                } finally {
                    setLoading(false);
                }
            };

            if (taskId) {
                fetchTask();
            }
        }, [taskId]);

        const handleSubmit = async (data: UpdateTaskData) => {
            if (!task) return;

            setIsSubmitting(true);
            try {
                await taskApi.updateTask(task.id, data);
                router.push('/');
            } catch (error) {
                console.error('Error updating task:', error);
            } finally {
                setIsSubmitting(false);
            }
        };

        if (loading) {
            return (
                <div className="w-[1440px] h-[1024px] mx-auto bg-[#1A1A1A] flex items-center justify-center">
                    <Header />
                    <div className="text-[#F2F2F2] font-inter text-[16px]">Loading...</div>
                </div>
            );
        }

        if (error || !task) {
            return (
                <div className="w-[1440px] h-[1024px] mx-auto bg-[#1A1A1A] flex items-center justify-center px-[352px]">
                    <Header />
                    <div className="w-[736px] bg-[#262626] border border-[#333333] rounded-[8px] p-[32px] text-center">
                        <h2 className="text-[24px] font-inter font-bold text-[#E25858] mb-[16px]">Error</h2>
                        <p className="text-[16px] font-inter text-[#D9D9D9] mb-[24px] leading-[140%]">
                            {error || 'Task not found'}
                        </p>
                        <button
                            onClick={() => router.push('/')}
                            className="bg-[#1E6F9F] text-[#F2F2F2] px-[24px] py-[12px] rounded-[8px] hover:bg-[#4EA8DE] transition-colors font-inter font-bold text-[14px]">
                                Back
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div className="w-[1440px] h-[1024px] mx-auto bg-[#1A1A1A] overflow-hidden">
                <Header />
                <TaskForm
                    initialData={{ title: task.title, color: task.color }}
                    onSubmit={handleSubmit}
                    isEditing={true}
                    isLoading={isSubmitting}
                />
            </div>
        );
    }
