import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const table = pgTable("table", {
    id: uuid("id").primaryKey().defaultRandom(),
    tableNumber: text("table_number").notNull(), // เช่น "1", "4"
    tableType: text("table_type").notNull(), // เช่น "ด้านนอก", "ด้านใน"
    isAvailable: boolean("is_available").default(true),

    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date()),
});
