import { pgTable, uuid, timestamp, text, integer } from "drizzle-orm/pg-core";
import { diningTable as DiningTable } from "./diningTable";

export const active = pgTable("active", {
    id: uuid("id").primaryKey().defaultRandom(),
    customerName: text("customer_name").notNull(),
    customerPhone: text("customer_phone").notNull(),
    adultNumber: integer("adult_number").notNull(),
    childNumber: integer("child_number").notNull(),
    openTime: text("open_time").notNull(),
    closeTime: text("close_time"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at"),
});

export const activeInfo = pgTable("active_info", {
    id: uuid("id").primaryKey().defaultRandom(),
    activeId: uuid("active_id")
        .references(() => active.id)
        .notNull(),
    tableId: uuid("table_id")
        .references(() => DiningTable.id)
        .notNull(),
});
