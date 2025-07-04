import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const product = pgTable("product", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    unit: text("unit").notNull(),
    price: integer("price").notNull(),
    category: text("category").notNull(),
    stock: integer("stock").notNull().default(0),
    image: text("image").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
