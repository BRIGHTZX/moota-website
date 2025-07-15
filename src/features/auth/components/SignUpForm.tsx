"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { UserIcon } from "lucide-react";
import Link from "next/link";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs";

import OauthButton from "@/components/OauthButton";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
    email: z.string().email(),
});

function SignUpForm() {
    const registerButtonRef = useRef<HTMLButtonElement>(null);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });
    const [email, setEmail] = useState<string>("");
    const searchParams = useSearchParams();
    const redirectUrl = searchParams.get("post_login_redirect_url");

    // Create a handler to update state when email changes
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        form.setValue("email", e.target.value);
    };

    const handleSubmit = () => {
        registerButtonRef.current?.click();
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen pt-20 bg-coffee-light">
            <div className="flex size-full flex-col items-center justify-center">
                <div className="relative w-[90%] sm:w-2/3 md:w-1/2 rounded-xl border-2 border-coffee-dark bg-coffee-brown p-10">
                    <div className="absolute -top-20 left-1/2 -translate-x-1/2 rounded-full bg-coffee-dark p-4">
                        <UserIcon className="size-20 text-coffee-light" />
                    </div>
                    <div className="text-center">
                        <h1 className="text-3xl sm:text-5xl font-bold text-coffee-light">
                            REGISTER 🎉
                        </h1>
                        <p className="mt-4 text-xs sm:text-s text-coffee-light">
                            Please enter your email and password to register.
                        </p>
                    </div>

                    <div className="mt-8">
                        <Form {...form}>
                            <form
                                className="mt-10 space-y-4"
                                onSubmit={form.handleSubmit(handleSubmit)}
                            >
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-coffee-light">
                                                Email
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter your email"
                                                    className="text-coffee-dark bg-coffee-light"
                                                    {...field}
                                                    onChange={handleEmailChange}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="w-full text-center">Or</div>

                                {/* Oauth Button */}
                                <div>
                                    <OauthButton
                                        redirectUrl={redirectUrl ?? undefined}
                                    />
                                </div>

                                <div className="flex items-center gap-4">
                                    <Button
                                        ref={registerButtonRef}
                                        asChild
                                        type="submit"
                                        variant="coffeePrimary"
                                        className="w-full px-8 font-bold"
                                    >
                                        <RegisterLink
                                            postLoginRedirectURL={
                                                redirectUrl ?? undefined
                                            }
                                            authUrlParams={{
                                                connection_id:
                                                    process.env
                                                        .NEXT_PUBLIC_KINDE_CONNECTION_EMAIL_PASSWORD!,
                                                login_hint: email,
                                            }}
                                        >
                                            Register
                                        </RegisterLink>
                                    </Button>
                                </div>
                                <div>
                                    <p className="text-sm text-coffee-light">
                                        Don&apos;t have an account?{" "}
                                        <Link
                                            href="/signin"
                                            className="font-bold underline"
                                        >
                                            Sign in
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUpForm;
