import { NextRequest, NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

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

    const isClientPage =
        req.nextUrl.pathname.startsWith("/reservation") ||
        req.nextUrl.pathname.startsWith("/checkout");

    // -------CLIENT ROUTES---------------------------
    if (isClientPage) {
        try {
            const user = await getUser();

            if (!user) {
                return NextResponse.redirect(
                    new URL(
                        `/signin?post_login_redirect=${req.nextUrl.pathname}`,
                        req.url
                    )
                );
            }
        } catch (error) {
            console.error("Error checking client page access:", error);
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

    return response;
}

export const config = {
    matcher: ["/admin/:path*", "/reservation/:path*", "/signin", "/signup"],
};
