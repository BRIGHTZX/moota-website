'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

function ErrorPage() {
    const router = useRouter();
    return (
        <section className="flex h-screen flex-col items-center justify-center px-4 text-center">
            <h1 className="text-[4rem] font-bold text-black sm:text-[7rem] md:text-[10rem]">
                400
            </h1>
            <h1 className="text-3xl font-bold text-black md:text-5xl">
                BAD REQUEST
            </h1>
            <p className="mt-2 text-black">เกิดการทำงานผิดพลาด</p>
            <Button
                onClick={() => router.push('/')}
                className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
            >
                กลับสู่หน้าหลัก
            </Button>
        </section>
    );
}

export default ErrorPage;
