import { Plus } from 'lucide-react';
import { ButtonHTMLAttributes } from 'react';

interface CreateTaskButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
}

export default function CreateTaskButton({ className = '', ...props }: CreateTaskButtonProps) {
    return (
        <button
            className={`
                absolute top-[173px] left-[352px]
                w-[736px] h-[52px]
                bg-[#1E6F9F] hover:bg-[#4EA8DE]
                rounded-[8px] px-4 py-3
                flex items-center justify-center gap-[8px]
                font-inter font-bold text-[14px] leading-[140%] text-[#F2F2F2]
                transition-colors
                ${className}
            `}

            {...props}
        >
            <span className="w-[82px] h-[20px] font-inter font-bold text-[14px] leading-[140%] text-[#F2F2F2] flex items-center justify-center">Create Task</span>

            <div className='w-[16px] h-[16px] bg-[#F2F2F2] rounded-sm flex items-center justify-center'>
                <Plus className='w-3 h-3 text-[#1E6F9F]' strokeWidth={2} />
            </div>
        </button>
    );
}
