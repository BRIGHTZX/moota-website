import PageLoader from '@/components/PageLoader';
import SignInForm from '@/features/auth/components/SignInForm';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'เข้าสู่ระบบ | นกหมูกระทะ',
    description: 'เข้าสู่ระบบที่นกหมูกระทะ',
};

function SigninPage() {
    return (
        <Suspense fallback={<PageLoader className="bg-coffee-light" />}>
            <SignInForm />
        </Suspense>
    );
}

export default SigninPage;
