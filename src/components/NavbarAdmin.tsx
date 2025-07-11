"use client";
import React, { useContext } from "react";
import { ProfileNavbar } from "./ProfileNavbar";
import { NavbarContext } from "@/context/NavbarProvider";

function NavbarAdmin() {
    const { user, isAdmin } = useContext(NavbarContext);
    return (
        <div className="fixed top-0 left-0 w-full h-14 border-b border-gray-200 bg-white shadow-sm z-50">
            <div className="container px-4 mx-auto h-full flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold">ADMIN MENU</h1>
                </div>

                <div className="flex items-center gap-2">
                    <ProfileNavbar
                        currentUser={
                            user ?? {
                                id: "",
                                firstName: "",
                                lastName: "",
                                email: "",
                                picture: null,
                            }
                        }
                        isAdmin={isAdmin}
                        className="block!"
                    />
                </div>
            </div>
        </div>
    );
}

export default NavbarAdmin;
