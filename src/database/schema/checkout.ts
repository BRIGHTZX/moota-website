import { pgTable, uuid, timestamp, integer, text } from "drizzle-orm/pg-core";
import { active } from "./active";
import { product } from "./product";

export const checkout = pgTable("checkout", {
    id: uuid("id").primaryKey().defaultRandom(),
    activeId: uuid("active_id")
        .references(() => active.id)
        .notNull(),
    paidAdultNumber: integer("paid_adult_number").notNull(),
    paidChildNumber: integer("paid_child_number").notNull(),
    totalOrderPrice: integer("total_order_price").notNull(),
    totalDiscount: integer("total_discount").notNull(),
    totalAmount: integer("total_amount").notNull(),
    paymentMethod: text("payment_method").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .notNull()
        .$onUpdate(() => new Date()),
});

export const checkoutInfos = pgTable("checkout_infos", {
    id: uuid("id").primaryKey().defaultRandom(),
    checkoutId: uuid("checkout_id")
        .references(() => checkout.id)
        .notNull(),
    productId: uuid("product_id")
        .references(() => product.id)
        .notNull(),
    quantity: integer("quantity").notNull(),
    pricePerUnit: integer("price_per_unit").notNull().default(0),
    totalPrice: integer("total_price").notNull().default(0),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .notNull()
        .$onUpdate(() => new Date()),
});
