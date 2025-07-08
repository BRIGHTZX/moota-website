import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const diningTable = pgTable("dining_table", {
    id: uuid("id").primaryKey().defaultRandom(),
    tableNumber: text("table_number").notNull(), // เช่น "1", "4"
    tableType: text("table_type").notNull(), // เช่น "ด้านนอก", "ด้านใน"
    isAvailable: boolean("is_available").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});
