'use client';

import { Task } from "@/types";
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface TaskCardProps {
    tasks: Task[];
    onToggleComplete: (id: string, completed: boolean) => void;
    onDelete: (id: string) => void;
}

export default function TaskCard({ tasks, onToggleComplete, onDelete }: TaskCardProps) {
    const router = useRouter();
    const completedTasks = tasks.filter(task => task.completed).length;

    const getComputedColor = (color: string) => {
        return `var(--color-task-${color})`;
    };

    const handleCardClick = (e: React.MouseEvent, taskId: string) => {
        if ((e.target as HTMLElement).closest('button, input')) {
            return;
        }
        router.push(`/edit/${taskId}`);
    };

    return (
        <div className="absolute top-[291px] left-[352px] w-[736px] flex flex-col gap-[24px]">
            <div className="w-[736px] h-[19px] flex justify-between items-center">
                <div className="flex items-center gap-[8px]">
                    <span className="w-[41px] h-[17px] font-inter font-bold text-[14px] leading-[100%] text-[#4EA8DE] flex items-center">
                        Tasks
                    </span>
                    <div className="h-[19px] bg-[#333333] rounded-[999px] px-[8px] py-[2px] flex items-center justify-center gap-[10px]">
                        <span className="w-[9px] h-[15px] font-inter font-bold text-[12px] leading-[100%] text-[#D9D9D9] flex items-center justify-center">
                            {tasks.length}
                        </span>
                    </div>
                </div>

                <div className="w-[109px] h-[19px] flex items-center gap-[8px]">
                    <span className="w-[76px] h-[17px] font-inter font-bold text-[14px] leading-[100%] text-[#8284FA] flex items-center">
                        Completed
                    </span>
                    <div className="h-[19px] bg-[#333333] rounded-[999px] px-[8px] py-[2px] flex items-center justify-center gap-[10px]">
                        <span className="w-[9px] h-[15px] font-inter font-bold text-[12px] leading-[100%] text-[#D9D9D9] flex items-center justify-center">
                            {tasks.length === 0 ? "0" : `${completedTasks} `}
                        </span>
                    </div>
                </div>
            </div>

            <div className="space-y-[12px]">
                {tasks.map(task => (
                    <div
                        key={task.id}
                        className="w-full bg-[#262626] border border-[#333333] rounded-lg p-4 shadow-sm hover:bg-[#2A2A2A] transition-colors cursor-pointer"
                        onClick={(e) => handleCardClick(e, task.id)}
                    >


                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={(e) => {
                                        e.stopPropagation();
                                        onToggleComplete(task.id, e.target.checked);
                                    }}
                                    className="w-5 h-5 rounded-full border-2 appearance-none relative cursor-pointer transition-colors hover:opacity-80"
                                    style={{
                                        borderColor: task.completed ? 'transparent' : getComputedColor(task.color),
                                        backgroundColor: task.completed ? getComputedColor(task.color) : 'transparent',
                                        backgroundImage: task.completed
                                            ? "url(\"data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m13.854 3.646-7.5 7.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6 10.293l7.146-7.147a.5.5 0 0 1 .708.708z'/%3e%3c/svg%3e\")"
                                            : 'none'
                                    }}
                                />
                            </div>

                            <p className={`font-inter text-sm leading-[19px] flex-1 transition-colors ${task.completed
                                ? 'text-[#808080] line-through'
                                : 'text-[#F2F2F2]'
                                }`}>
                                {task.title}
                            </p>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(task.id);
                                }}
                                className="flex-shrink-0 p-1 text-[#808080] hover:text-red-500 transition-colors rounded"
                                title="Delete task"
                                aria-label={`Delete task: ${task.title}`}
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
