import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const preOrder = pgTable("pre_order", {
    id: uuid("id").primaryKey().defaultRandom(),
    userKindeId: text("user_kinde_id").notNull(),
    customerName: text("customer_name").notNull(),
    phoneNumber: text("phone_number").notNull(),
    email: text("email"),

    tableNumber: text("table_number").notNull(),
    tableType: text("table_type").notNull(),
    adultNumber: integer("adult_number").notNull().default(0),
    childNumber: integer("child_number").notNull().default(0),
    totalPrice: integer("total_price").notNull(),

    status: text("status").notNull(),
    paymentStatus: text("payment_status").notNull(),

    reservationDate: timestamp("reservation_date").notNull(),
    reservationTime: text("reservation_time").notNull(),

    deletedAt: timestamp("deleted_at"),

    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date()),
});
