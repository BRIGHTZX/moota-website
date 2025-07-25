import PageLoader from '@/components/PageLoader';
import SignUpForm from '@/features/auth/components/SignUpForm';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'สมัครสมาชิก | นกหมูกระทะ',
    description: 'สมัครสมาชิกที่นกหมูกระทะ',
};

function SignupPage() {
    return (
        <Suspense fallback={<PageLoader className="bg-coffee-light" />}>
            <SignUpForm />
        </Suspense>
    );
}

export default SignupPage;
