'use client';
import { useGetCurrentUser } from '@/features/auth/api/use-get-current-user';
import { createContext } from 'react';

type NavbarContextType = {
    user: {
        id: string;
        firstName: string | null;
        lastName: string | null;
        email: string | null;
        picture: string | null;
    } | null;
    isAdmin: boolean;
    isOwner: boolean;
    isLoading: boolean;
};

// * context for car amount
export const NavbarContext = createContext<NavbarContextType>({
    user: null,
    isAdmin: false,
    isOwner: false,
    isLoading: false,
});

export function NavbarProvider({ children }: { children: React.ReactNode }) {
    const { data, isLoading } = useGetCurrentUser();

    return (
        <NavbarContext.Provider
            value={{
                user: data?.user ?? null,
                isAdmin: data?.isAdmin ?? false,
                isOwner: data?.isOwner ?? false,
                isLoading,
            }}
        >
            {children}
        </NavbarContext.Provider>
    );
}
