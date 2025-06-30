import PageLoader from "@/components/PageLoader";
import SignInForm from "@/features/auth/components/SignInForm";
import { Suspense } from "react";

function SigninPage() {
    return (
        <Suspense fallback={<PageLoader className="bg-coffee-light" />}>
            <SignInForm />
        </Suspense>
    );
}

export default SigninPage;
