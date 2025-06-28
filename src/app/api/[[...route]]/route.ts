import { Hono } from "hono";
import { handle } from "hono/vercel";
import { logger } from "hono/logger";
import authRoute from "@/features/auth/server/route";

const app = new Hono().basePath("/api");
app.use(logger());

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app.route("/authentication", authRoute);

// Handle all HTTP methods
export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
