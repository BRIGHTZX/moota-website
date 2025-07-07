import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import { schema } from "./index";

const sql = new Pool({ connectionString: process.env.DATABASE_URL! });
export const db = drizzle({ client: sql, schema, logger: true });
