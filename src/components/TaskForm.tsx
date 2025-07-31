'use client';

import { useState } from "react";
import { ArrowLeft, PlusCircleIcon, Check } from 'lucide-react';
import { TASK_COLORS, CreateTaskData } from "@/types";
import { useRouter } from "next/navigation";

interface TaskFormProps {
    onSubmit: (data: CreateTaskData) => void;
    initialData?: Partial<CreateTaskData>;
    isEditing?: boolean;
    isLoading?: boolean;
}

export default function TaskForm({
    onSubmit,
    initialData,
    isEditing = false,
    isLoading = false
}: TaskFormProps) {
    const router = useRouter();
    const [title, setTitle] = useState(initialData?.title || '');
    const [selectedColor, setSelectedColor] = useState(initialData?.color || 'blue');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            onSubmit({
                title: title.trim(),
                color: selectedColor
            });
        }
    };

    const isFormValid = title.trim().length > 0;

    return (
        <div className="w-full h-full bg-[#1A1A1A] px-[352px] py-[72px]">
            <div className="mb-12">
                <button
                    onClick={() => router.back()}
                    className="flex items-center justify-center w-6 h-6 text-[#F2F2F2] hover:text-[#4EA8DE] transition-colors"
                    aria-label="Go back"
                >
                    <ArrowLeft className="w-6 h-6" strokeWidth={2} />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="max-w-[596px] w-full">
                <div className="mb-6">
                    <label className="block text-[#4EA8DE] font-inter font-bold text-sm leading-[17px] mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Ex. Brush you teeth"
                        className="w-full h-[52px] bg-[#262626] border border-[#333333] rounded-lg px-4 py-3
                                text-[#F2F2F2] font-inter font-normal text-sm leading-[140%]
                                placeholder:text-[#F2F2F2] placeholder:opacity-40 placeholder:font-inter placeholder:font-normal placeholder:text-sm
                                focus:outline-none focus:border-[#4EA8DE] focus:ring-1 focus:ring-[#4EA8DE]
                                transition-colors"
                        disabled={isLoading}
                    />
                </div>

                <div className="mb-12">
                    <label className="block text-[#4EA8DE] font-inter font-bold text-sm leading-[17px] mb-4">
                        Color
                    </label>
                    <div className="flex gap-4 w-fit">
                        {TASK_COLORS.map((color) => (
                            <button
                                key={color.value}
                                type="button"
                                onClick={() => setSelectedColor(color.value)}
                                className={`w-[52px] h-[52px] rounded-full transition-all duration-200 relative flex-shrink-0
                                    ${color.class}
                                    ${selectedColor === color.value
                                        ? 'ring-2 ring-[#F2F2F2] ring-offset-2 ring-offset-[#1A1A1A] scale-110'
                                        : 'hover:scale-105'
                                    }`}
                                disabled={isLoading}
                                aria-label={`Select ${color.name} color`}
                            />
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={!isFormValid || isLoading}
                    className={`w-full h-[52px] rounded-lg px-4 py-2 flex items-center justify-center gap-2
                            transition-all duration-200
                            ${isFormValid && !isLoading
                            ? 'bg-[#1E6F9F] hover:bg-[#4EA8DE] cursor-pointer'
                            : 'bg-[#1E6F9F] cursor-not-allowed opacity-50'
                        }`}
                    style={isFormValid && !isLoading ? { backgroundColor: '#1E6F9F' } : undefined}
                >
                    {isLoading ? (
                        <span className="text-[#F2F2F2] font-inter font-bold text-sm leading-[140%]">Loading...</span>
                    ) : (
                        <>
                            <span className="text-[#F2F2F2] font-inter font-bold text-sm leading-[140%]">
                                {isEditing ? 'Save' : 'Add Task'}</span>
                            <div className={`w-4 h-4 rounded-sm flex items-center justify-center relative transition-colors"
                                          ${isFormValid && !isLoading
                                    ? 'bg-[#1E6F9F]'
                                    : 'bg-[#1E6F9F]'
                                }`}>
                                {isEditing ? (
                                    <Check
                                        className={`w-[13.56px] h-[13.56px] absolute top-[1.22px] left-[1.22px] transition-colors
                                                  ${isFormValid && !isLoading
                                                ? 'text-[#f2f2f2]'
                                                : 'text-[#f2f2f2]'
                                            }`}
                                        strokeWidth={2}
                                    />
                                ) : (
                                    <PlusCircleIcon
                                        className={`w-[15.97px] h-[15.97px] absolute top-[0.03px] left-[0.03px] transition-colors
                                              ${isFormValid && !isLoading
                                                ? 'text-[#f2f2f2]'
                                                : 'text-[#f2f2f2]'
                                            }`}
                                        strokeWidth={2}
                                    />
                                )}
                            </div>
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
