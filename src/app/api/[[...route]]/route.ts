import { Hono } from "hono";
import { handle } from "hono/vercel";
import { logger } from "hono/logger";
import authRoute from "@/features/auth/server/route";
import reservationRoute from "@/features/(client)/reservation/server/route";
import preOrderRoute from "@/features/(client)/pre-orders/server/route";

//admin
import tablesRoute from "@/features/(admin)/tables/server/route";
import preOrderAdminRoute from "@/features/(admin)/pre-orders/server/route";
import activesRoute from "@/features/(admin)/actives/server/route";

const app = new Hono().basePath("/api");

app.use(logger());

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
    .route("/authentication", authRoute)
    .route("/reservation", reservationRoute)
    .route("/pre-orders", preOrderRoute)
    //admin
    .route("/admin/tables", tablesRoute)
    .route("/admin/pre-orders", preOrderAdminRoute)
    .route("/admin/actives", activesRoute);

// Handle all HTTP methods
export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
