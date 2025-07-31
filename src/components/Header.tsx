import { Rocket } from 'lucide-react';

export default function Header() {
    return (
        <header className='w-full bg-[#0D0D0D] h-[200px] flex items-center justify-center relative'>
            <div className='absolute top-[72px] left-[657px] w-[226px] h-[48px] flex items-center gap-3'>
                <div className='w-[22px] h-[36px] flex items-center justify-center'>
                    <Rocket
                        className='w-[22px] h-[36px] text-[#5E60CE]'
                        strokeWidth={1.5}
                    />
                </div>

                <h1 className='w-[192px] h-[48px] font-inter font-black text-[40px] leading-[100%] tracking-[0%] flex items-center'>
                    <span className='text-[#4EA8DE] font-inter font-black text-[40px] leading-[100%]'>Todo</span>
                    <span className='text-[#5E60CE] font-inter font-black text-[40px] leading-[100%]'> App</span>
                </h1>
            </div>
        </header>
    );
}
