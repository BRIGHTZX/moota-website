import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@kinde-oss/kinde-auth-nextjs/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function middleware(req: NextRequest) {
    let response = NextResponse.next();

    const authConfig = {
        loginPage: "/signin",
        isReturnToCurrentPage: true,
    };

    try {
        const authMiddleware = withAuth(authConfig);
        if (typeof authMiddleware === "function") {
            response = await authMiddleware(req);

            if (response.status !== 200 && response.headers.has("Location")) {
                return response;
            }
        }
    } catch (error) {
        console.error("Auth middleware error:", error);
    }

    const { getUser, getRoles } = getKindeServerSession();

    const isAuthPage =
        req.nextUrl.pathname === "/signin" ||
        req.nextUrl.pathname === "/signup";

    if (isAuthPage) {
        try {
            const user = await getUser();

            if (user) {
                return NextResponse.redirect(new URL("/profile", req.url));
            }
        } catch (error) {
            console.error("Error checking auth page access:", error);
        }
    }

    // ✅ กำหนดว่า route อื่น ๆ ต้อง login
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

    // ✅ เฉพาะ /admin ต้องมี role เป็น admin
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
    matcher: [
        "/cart",
        "/admin/:path*",
        "/profile",
        "/orders",
        "/checkout",
        "/signin",
        "/signup",
    ],
};
