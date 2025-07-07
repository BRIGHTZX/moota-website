import { integer, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { activeInfo as ActiveInfoTable } from "./active";
import { product as ProductTable } from "./product";

export const order = pgTable("order", {
    id: uuid("id").primaryKey().defaultRandom(),
    activeInfoId: uuid("active_info_id")
        .references(() => ActiveInfoTable.id)
        .notNull(),
    totalPrice: integer("total_price").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
    deletedAt: timestamp("deleted_at"),
});

export const orderItem = pgTable("order_item", {
    id: uuid("id").primaryKey().defaultRandom(),
    orderId: uuid("order_id")
        .references(() => order.id)
        .notNull(),
    productId: uuid("product_id")
        .references(() => ProductTable.id)
        .notNull(),
    quantity: integer("quantity").notNull(),
    pricePerUnit: integer("price_per_unit").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
    deletedAt: timestamp("deleted_at"),
});
