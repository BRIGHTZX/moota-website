import type { AppType } from "@/app/api/[[...route]]/route";

// client.api.ts
import { hc } from "hono/client";
export const client = hc<AppType>(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
);
