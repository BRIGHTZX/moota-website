import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { table as TableSchema } from "./table";

export const preOrder = pgTable("pre_order", {
    id: uuid("id").primaryKey().defaultRandom(),
    preOrderNumber: text("pre_order_number").notNull(),
    userKindeId: text("user_kinde_id").notNull(),
    customerName: text("customer_name").notNull(),
    phoneNumber: text("phone_number").notNull(),

    adultNumber: integer("adult_number").notNull().default(0),
    childNumber: integer("child_number").notNull().default(0),
    totalPrice: integer("total_price").notNull(),

    status: text("status").notNull(),
    paymentStatus: text("payment_status").notNull(),
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
    preOrderId: uuid("pre_order_id").references(() => preOrder.id),
    tableId: uuid("table_id").references(() => TableSchema.id),

    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date()),
});
