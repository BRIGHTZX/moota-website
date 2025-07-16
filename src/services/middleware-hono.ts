import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { KindeRoles, KindeUser } from '@kinde-oss/kinde-auth-nextjs/types';
import { Context } from 'hono';
import { createMiddleware } from 'hono/factory';

type UserType = {
    Variables: {
        user: KindeUser;
        roles: KindeRoles;
        isAdmin: boolean;
        isOwner: boolean;
    };
};

export const getCurrentUser = createMiddleware<UserType>(
    async (c: Context, next) => {
        try {
            const { getUser, getRoles, getPermission } =
                getKindeServerSession();
            const user = await getUser();
            const roles = await getRoles();

            if (!user || user === null || !user.id) {
                return c.json(
                    {
                        message: 'Unauthorization',
                        user: null,
                        isAdmin: false,
                    },
                    401
                );
            }

            if (!roles || roles === null) {
                return c.json(
                    { message: "You don't have permission to access" },
                    403
                );
            }

            const roleHasAdmin = roles.find(
                role => role.key === process.env.KINDE_ADMIN_ROLE_KEY
            );

            const isAdmin =
                roleHasAdmin?.key === process.env.KINDE_ADMIN_ROLE_KEY
                    ? true
                    : false;

            const isOwner = await getPermission(
                process.env.KINDE_OWNER_PERMISSION!
            );

            c.set('user', user);
            c.set('roles', roles);
            c.set('isAdmin', isAdmin);
            c.set('isOwner', isOwner?.isGranted ?? false);
            await next();
        } catch (error) {
            console.log('Error during authentication: ', error);
            return c.json({ data: null, message: 'Unauthorized' }, 403);
        }
    }
);
