import { NextRequest, NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { checkIfActiveClosed } from "./services/checkIfActiveClosed";

export default async function middleware(req: NextRequest) {
    const response = NextResponse.next();
    const { getUser, getRoles } = getKindeServerSession();

    // -------LOGIN & SIGNUP---------------------------
    const isAuthPage =
        req.nextUrl.pathname === "/signin" ||
        req.nextUrl.pathname === "/signup";

    if (isAuthPage) {
        try {
            const user = await getUser();

            if (user) {
                return NextResponse.redirect(new URL("/", req.url));
            }
        } catch (error) {
            console.error("Error checking auth page access:", error);
        }
    }

    // -------PROTECTED ROUTES---------------------------
    if (req.nextUrl) {
        try {
            const user = await getUser();

            if (!user) {
                return NextResponse.redirect(new URL("/signin", req.url));
            }
        } catch (error) {
            console.error("Error checking user:", error);
            return NextResponse.redirect(new URL("/signin", req.url));
        }
    }

    // -------ADMIN ROUTES---------------------------
    if (req.nextUrl.pathname.startsWith("/admin")) {
        try {
            const roles = await getRoles();

            const isAdmin = roles?.some((role) => role.key === "admin");

            if (!isAdmin) {
                return NextResponse.redirect(new URL("/", req.url));
            }
        } catch (error) {
            console.error("Error checking roles:", error);
            return NextResponse.redirect(new URL("/", req.url));
        }
    }

    // -------ACTIVE ROUTES---------------------------
    if (req.nextUrl.pathname.startsWith("/admin/actives/checkout")) {
        console.log("call active checkout");
        try {
            const url = req.nextUrl.pathname.split("/");
            const activeId = url[4];

            const isActiveClosed = await checkIfActiveClosed(activeId);

            if (isActiveClosed) {
                return NextResponse.redirect(
                    new URL("/admin/actives", req.url)
                );
            }
        } catch (error) {
            console.error("Error checking active:", error);
            return NextResponse.redirect(new URL("/admin/actives", req.url));
        }
    }

    return response;
}

export const config = {
    matcher: ["/admin/:path*", "/reservation/:path*", "/signin", "/signup"],
};
