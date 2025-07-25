import { NextRequest, NextResponse } from 'next/server';
import {
    getKindeServerSession,
    withAuth,
} from '@kinde-oss/kinde-auth-nextjs/server';

export default async function middleware(req: NextRequest) {
    let response = NextResponse.next();
    const { getUser, getRoles, getPermission } = getKindeServerSession();

    const authConfig = {
        loginPage: '/signin',
        isReturnToCurrentPage: true,
    };

    try {
        // -------LOGIN & SIGNUP---------------------------
        const isAuthPage =
            req.nextUrl.pathname === '/signin' ||
            req.nextUrl.pathname === '/signup';

        if (!isAuthPage) {
            const authMiddleware = withAuth(authConfig);
            if (typeof authMiddleware === 'function') {
                response = await authMiddleware(req);

                if (
                    response.status !== 200 &&
                    response.headers.has('Location')
                ) {
                    return response;
                }
            }
        }

        if (isAuthPage) {
            const user = await getUser();

            if (user) {
                return NextResponse.redirect(new URL('/', req.url));
            }
        }

        // -------ADMIN ROUTES---------------------------
        if (req.nextUrl.pathname.startsWith('/admin')) {
            const roles = await getRoles();

            const isAdmin = roles?.some(role => role.key === 'admin');
            const isHaveAdminPermission = await getPermission(
                process.env.KINDE_ADMIN_PERMISSION!
            );

            const isAdminPermission = isHaveAdminPermission?.isGranted ?? false;

            if (!isAdmin || !isAdminPermission) {
                return NextResponse.redirect(new URL('/', req.url));
            }
        }

        // -------OWNER ROUTES---------------------------

        if (req.nextUrl.pathname.startsWith('/owner')) {
            const roles = await getRoles();

            const isAdmin = roles?.some(role => role.key === 'admin');
            const isHaveOwnerPermission = await getPermission(
                process.env.KINDE_OWNER_PERMISSION!
            );

            const isOwnerPermission = isHaveOwnerPermission?.isGranted ?? false;

            if (!isAdmin || !isOwnerPermission) {
                return NextResponse.redirect(new URL('/', req.url));
            }
        }
    } catch (error) {
        console.log('Auth Middleware Error:', error);
        return NextResponse.redirect(new URL('/', req.url));
    }

    return response;
}

export const config = {
    matcher: [
        '/admin/:path*',
        '/reservation/:path*',
        '/signin',
        '/signup',
        '/owner/:path*',
    ],
};
