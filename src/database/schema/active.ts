import {
    pgTable,
    uuid,
    timestamp,
    text,
    integer,
    primaryKey,
} from "drizzle-orm/pg-core";
import { table as TablesTable } from "./table";

export const active = pgTable("active", {
    id: uuid("id").primaryKey().defaultRandom(),
    customerName: text("customer_name").notNull(),
    customerPhone: text("customer_phone").notNull(),
    adultNumber: integer("adult_number").notNull(),
    childNumber: integer("child_number").notNull(),
    openTime: text("open_time").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at"),
});

export const activeTable = pgTable(
    "active_table",
    {
        activeId: uuid("active_id").references(() => active.id),
        tableId: uuid("table_id").references(() => TablesTable.id),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.activeId, t.tableId] }),
    })
);
