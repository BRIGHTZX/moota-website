import {
    pgTable,
    uuid,
    timestamp,
    text,
    integer,
    pgEnum,
} from "drizzle-orm/pg-core";
import { diningTable, diningTable as DiningTable } from "./diningTable";
import { relations } from "drizzle-orm";

export const activeStatus = pgEnum("active_status", [
    "open",
    "partial",
    "closed",
]);

export const active = pgTable("active", {
    id: uuid("id").primaryKey().defaultRandom(),
    customerName: text("customer_name").notNull(),
    customerPhone: text("customer_phone").notNull(),
    adultNumber: integer("adult_number").notNull(),
    childNumber: integer("child_number").notNull(),
    openTime: text("open_time").notNull(),
    status: activeStatus("status").notNull().default("open"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
    deletedAt: timestamp("deleted_at"),
});

export const activeInfo = pgTable("active_info", {
    id: uuid("id").primaryKey().defaultRandom(),
    activeId: uuid("active_id")
        .references(() => active.id, { onDelete: "cascade" })
        .notNull(),
    tableId: uuid("table_id")
        .references(() => DiningTable.id)
        .notNull(),
});

export const activeRelations = relations(active, ({ many }) => ({
    activeInfos: many(activeInfo, {
        relationName: "active-activeInfos",
    }),
}));

export const activeInfoRelations = relations(activeInfo, ({ one }) => ({
    active: one(active, {
        fields: [activeInfo.activeId],
        references: [active.id],
        relationName: "active-activeInfos",
    }),
    diningTable: one(diningTable, {
        fields: [activeInfo.tableId],
        references: [diningTable.id],
    }),
}));
