import Image from "next/image";

interface EmptyStateProps {
    tasksCount?: number;
    completedCount?: number;
}

export default function EmptyState({ tasksCount = 0, completedCount = 0 }: EmptyStateProps) {
    return (
        <div className="w-full flex flex-col gap-[24px]">

            <div className="w-[736px] h-[19px] flex justify-between items-center">
                <div className="flex items-center gap-[8px]">
                    <span className="w-[41px] h-[17px] font-inter font-bold text-[14px] leading-[100%] text-[#4EA8DE] flex items-center">
                        Tasks
                    </span>
                    <div className="h-[19px] bg-[#333333] rounded-[999px] px-[8px] py-[2px] flex items-center justify-center gap-[10px]">
                        <span className="w-[9px] h-[15px] font-inter font-bold text-[12px] leading-[100%] text-[#D9D9D9] flex items-center justify-center">
                            {tasksCount}
                        </span>
                    </div>
                </div>

                <div className="w-[109px] h-[19px] flex items-center gap-[8px]">
                    <span className="w-[76px] h-[17px] font-inter font-bold text-[14px] leading-[100%] text-[#8284FA] flex items-center">
                        Completed
                    </span>
                    <div className="h-[19px] bg-[#333333] rounded-[999px] px-[8px] py-[2px] flex items-center justify-center gap-[10px]">
                        <span className="w-[9px] h-[15px] font-inter font-bold text-[12px] leading-[100%] text-[#D9D9D9] flex items-center justify-center">
                            {completedCount}
                        </span>
                    </div>
                </div>
            </div>

            <div className="w-[736px] h-[266px] flex flex-col items-center justify-center gap-[16px] border-t border-[#333333] pt-[64px] pr-[24px] pb-[64px] pl-[24px]">
                <div className="mb-4">
                    <Image
                        src="/clipboardimage.png"
                        alt="clipboard"
                        width={56}
                        height={56}
                        className="opacity-60"
                    />
                </div>

                <div className="w-[688px] h-[66px] text-center">
                <h3 className="font-inter font-bold text-[16px] leading-[140%] text-[#808080] mb-1">
                    You don&apos;t have any tasks registered yet.
                </h3>


                <p className="font-inter font-normal text-[16px] leading-[140%] text-[#808080]">
                    Create tasks and organize your to-do items.
                </p>
                </div>
            </div>
        </div>
    );
}
