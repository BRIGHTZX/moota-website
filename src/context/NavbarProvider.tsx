"use client";
import { useGetCurrentUser } from "@/features/auth/api/use-get-current-user";
import { createContext } from "react";

type NavbarContextType = {
    user: {
        id: string;
        firstName: string | null;
        lastName: string | null;
        email: string | null;
        picture: string | null;
    } | null;
    isAdmin: boolean;
    isLoading: boolean;
};

// * context for car amount
export const NavbarContext = createContext<NavbarContextType>({
    user: null,
    isAdmin: false,
    isLoading: false,
});

export function NavbarProvider({ children }: { children: React.ReactNode }) {
    const { data, isLoading } = useGetCurrentUser();
    return (
        <NavbarContext.Provider
            value={{
                user: data?.data.user ?? null,
                isAdmin: data?.data.isAdmin ?? false,
                isLoading,
            }}
        >
            {children}
        </NavbarContext.Provider>
    );
}
