import preOrderRoute from '@/features/(client)/pre-orders/server/route';
import reservationRoute from '@/features/(client)/reservation/server/route';
import authRoute from '@/features/auth/server/route';
import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { handle } from 'hono/vercel';

//admin
import activesRoute from '@/features/(admin)/actives/server/route';
import checkoutHistoryRoute from '@/features/(admin)/checkout-history/server/route';
import checkoutRoute from '@/features/(admin)/checkout/server/route';
import importExportRoute from '@/features/(admin)/import-export/server/route';
import ordersRoute from '@/features/(admin)/orders/server/route';
import preOrderAdminRoute from '@/features/(admin)/pre-orders/server/route';
import stocksRoute from '@/features/(admin)/stocks/server/route';
import tablesRoute from '@/features/(admin)/tables/server/route';
import takeAwayRoute from '@/features/(admin)/take-away/server/route';

//owner
import dashboardRoute from '@/features/(owner)/dashboard/server/route';

const app = new Hono().basePath('/api');

app.use(logger());

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
    .route('/authentication', authRoute)
    .route('/reservation', reservationRoute)
    .route('/pre-orders', preOrderRoute)

    //admin
    .route('/admin/tables', tablesRoute)
    .route('/admin/pre-orders', preOrderAdminRoute)
    .route('/admin/actives', activesRoute)
    .route('/admin/orders', ordersRoute)
    .route('/admin/stocks', stocksRoute)
    .route('/admin/import-export', importExportRoute)
    .route('/admin/checkout', checkoutRoute)
    .route('/admin/checkout-history', checkoutHistoryRoute)
    .route('/admin/take-away', takeAwayRoute)

    //owner
    .route('/owner/dashboard', dashboardRoute);

// Handle all HTTP methods
export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
