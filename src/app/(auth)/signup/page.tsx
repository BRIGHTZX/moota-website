import PageLoader from "@/components/PageLoader";
import SignUpForm from "@/features/auth/components/SignUpForm";
import { Suspense } from "react";

function SignupPage() {
    return (
        <Suspense fallback={<PageLoader className="bg-coffee-light" />}>
            <SignUpForm />
        </Suspense>
    );
}

export default SignupPage;
