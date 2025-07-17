'use client';
import React, { useContext } from 'react';
import { ProfileNavbar } from './ProfileNavbar';
import { NavbarContext } from '@/context/NavbarProvider';

function NavbarAdmin({ textHeader }: { textHeader: string }) {
    const { user, isAdmin, isOwner } = useContext(NavbarContext);
    return (
        <div className="fixed top-0 left-0 z-50 h-14 w-full border-b border-gray-200 bg-white shadow-sm">
            <div className="container mx-auto flex h-full items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold">{textHeader}</h1>
                </div>

                <div className="flex items-center gap-2">
                    <ProfileNavbar
                        currentUser={
                            user ?? {
                                id: '',
                                firstName: '',
                                lastName: '',
                                email: '',
                                picture: null,
                            }
                        }
                        isAdmin={isAdmin}
                        isOwner={isOwner}
                        className="block!"
                    />
                </div>
            </div>
        </div>
    );
}

export default NavbarAdmin;
