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

    if (req.nextUrl.pathname.startsWith("/admin")) {
        const { getRoles } = getKindeServerSession();
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
    matcher: ["/cart", "/admin/:path*", "/profile", "/orders", "/checkout"],
};
