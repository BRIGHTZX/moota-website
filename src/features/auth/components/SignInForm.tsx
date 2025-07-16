'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSearchParams } from 'next/navigation';
import { useRef, useState } from 'react';
import { UserIcon } from 'lucide-react';
import Link from 'next/link';
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs';

import OauthButton from '@/components/OauthButton';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
    email: z.string().email(),
});

function SignInForm() {
    const loginButtonRef = useRef<HTMLButtonElement>(null);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
        },
    });
    const [email, setEmail] = useState<string>('');
    const searchParams = useSearchParams();
    const redirectUrl = searchParams.get('post_login_redirect_url');

    // Create a handler to update state when email changes
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        form.setValue('email', e.target.value);
    };

    const handleSubmit = () => {
        loginButtonRef.current?.click();
    };

    return (
        <div className="bg-coffee-light flex h-screen flex-col items-center justify-center pt-20">
            <div className="flex size-full flex-col items-center justify-center">
                <div className="border-coffee-dark bg-coffee-brown relative w-[90%] rounded-xl border-2 p-10 sm:w-2/3 md:w-1/2">
                    <div className="bg-coffee-dark absolute -top-20 left-1/2 -translate-x-1/2 rounded-full p-4">
                        <UserIcon className="text-coffee-light size-20" />
                    </div>
                    <div className="text-center">
                        <h1 className="text-coffee-light text-3xl font-bold sm:text-5xl">
                            เข้าสู่ระบบ 🎉
                        </h1>
                        <p className="text-coffee-light mt-4 text-xs sm:text-sm">
                            กรุณาใส่อีเมลและรหัสผ่านของคุณเพื่อเข้าสู่ระบบ
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
                                                อีเมล
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="กรุณาใส่อีเมลของคุณ"
                                                    className="text-coffee-dark bg-coffee-light"
                                                    {...field}
                                                    onChange={handleEmailChange}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="text-coffee-light w-full text-center">
                                    หรือ
                                </div>

                                {/* Oauth Button */}
                                <div>
                                    <OauthButton
                                        redirectUrl={redirectUrl ?? undefined}
                                    />
                                </div>

                                <div className="flex items-center gap-4">
                                    <Button
                                        ref={loginButtonRef}
                                        asChild
                                        type="submit"
                                        variant="coffeePrimary"
                                        className="w-full px-8"
                                    >
                                        <LoginLink
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
                                            เข้าสู่ระบบ
                                        </LoginLink>
                                    </Button>
                                </div>
                                <div>
                                    <p className="text-coffee-light text-sm">
                                        ยังไม่มีบัญชีใช่หรือไม่?{' '}
                                        <Link
                                            href="/signup"
                                            className="font-bold underline"
                                        >
                                            สมัครสมาชิก
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

export default SignInForm;
