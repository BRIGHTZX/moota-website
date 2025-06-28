import { getCurrentUser } from "@/services/middleware-hono";
import { Hono } from "hono";

const app = new Hono().get("/user-current", getCurrentUser, async (c) => {
    try {
        const user = c.get("user");
        const isAdmin = c.get("isAdmin") as boolean;

        if (!user) {
            return c.json(
                { message: "Unauthorized", user: null, isAdmin: false },
                403
            );
        }

        const formattedUser = {
            user: {
                id: user.id,
                firstName: user.given_name,
                lastName: user.family_name,
                email: user.email,
                picture: user.picture,
            },
            isAdmin,
        };

        return c.json(
            { data: formattedUser, message: "fetch user current" },
            200
        );
    } catch (error) {
        console.log("Error during get user current: ", error);
        return c.json({ message: "Unauthorized" }, 403);
    }
});

export default app;
