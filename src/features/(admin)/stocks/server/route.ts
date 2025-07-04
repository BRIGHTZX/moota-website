import { getCurrentUser } from "@/services/middleware-hono";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { insertStockProductSchema } from "../schemas";

const app = new Hono().post(
    "/",
    getCurrentUser,
    zValidator("form", insertStockProductSchema),
    async (c) => {
        const user = c.get("user");
        if (!user) {
            return c.json({ error: "Unauthorized" }, 401);
        }

        try {
            console.log(c.req.valid("form"));
            return c.json({ message: "Product stock added successfully" }, 200);
        } catch (error) {
            console.log(error);
            return c.json({ error: "Internal Server Error" }, 500);
        }
    }
);

export default app;
