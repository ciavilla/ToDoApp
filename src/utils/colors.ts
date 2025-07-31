import { TASK_COLORS } from "@/types";

export const getColorClass = (color: string): string => {
    const colorObj = TASK_COLORS.find(c => c.value === color);
    return colorObj?.class || 'bg-task-blue';
};

export const getColorName = (color: string): string => {
    const colorObj = TASK_COLORS.find(c => c.value === color);
    return colorObj?.name || 'Blue';
};
