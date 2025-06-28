"use client";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "./ui/button";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";

function OauthButton({ redirectUrl }: { redirectUrl: string | undefined }) {
    const connectionId = process.env.NEXT_PUBLIC_KINDE_CONNECTION_GOOGLE;
    return (
        <>
            <Button asChild type="button" variant="outline" className="w-full">
                <LoginLink
                    className="flex items-center gap-4"
                    postLoginRedirectURL={redirectUrl ?? undefined}
                    authUrlParams={{
                        connection_id: connectionId!,
                    }}
                >
                    <FcGoogle className="size-6" />
                    <span className="text-sm font-bold">
                        Connect with Google
                    </span>
                </LoginLink>
            </Button>
        </>
    );
}

export default OauthButton;
