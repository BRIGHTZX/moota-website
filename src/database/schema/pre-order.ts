import {
    integer,
    pgEnum,
    pgTable,
    text,
    timestamp,
    uuid,
} from "drizzle-orm/pg-core";
import { diningTable as DiningTable } from "./diningTable";
import { relations } from "drizzle-orm";

export const preOrderStatus = pgEnum("pre_order_status", [
    "pending",
    "confirmed",
    "canceled",
]);

export const preOrderPaymentStatus = pgEnum("pre_order_payment_status", [
    "paid",
    "unpaid",
]);

export const preOrder = pgTable("pre_order", {
    id: uuid("id").primaryKey().defaultRandom(),
    preOrderNumber: text("pre_order_number").notNull(),
    userKindeId: text("user_kinde_id").notNull(),
    customerName: text("customer_name").notNull(),
    phoneNumber: text("phone_number").notNull(),

    adultNumber: integer("adult_number").notNull().default(0),
    childNumber: integer("child_number").notNull().default(0),
    totalPrice: integer("total_price").notNull(),

    status: preOrderStatus("status").notNull(),
    paymentStatus: preOrderPaymentStatus("payment_status").notNull(),
    paymentImage: text("payment_image"),

    reservationDate: timestamp("reservation_date").notNull(),
    reservationTime: text("reservation_time").notNull(),

    deletedAt: timestamp("deleted_at"),

    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date()),
});

export const preOrderInfo = pgTable("pre_order_info", {
    id: uuid("id").primaryKey().defaultRandom(),
    preOrderId: uuid("pre_order_id")
        .references(() => preOrder.id, { onDelete: "cascade" })
        .notNull(),
    tableId: uuid("table_id")
        .references(() => DiningTable.id)
        .notNull(),

    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date()),
});

export const preOrderRelations = relations(preOrder, ({ many }) => ({
    preOrderInfo: many(preOrderInfo),
}));

export const preOrderInfoRelations = relations(preOrderInfo, ({ one }) => ({
    preOrder: one(preOrder, {
        fields: [preOrderInfo.preOrderId],
        references: [preOrder.id],
    }),
    table: one(DiningTable, {
        fields: [preOrderInfo.tableId],
        references: [DiningTable.id],
    }),
}));
