import { integer, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { activeInfo as ActiveInfoTable } from "./active";
import { product, product as ProductTable } from "./product";
import { relations } from "drizzle-orm";

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

export const orderRelations = relations(order, ({ many }) => ({
    orderItems: many(orderItem, {
        relationName: "order-orderItems",
    }),
}));

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
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
});

export const orderItemRelations = relations(orderItem, ({ one }) => ({
    order: one(order, {
        fields: [orderItem.orderId],
        references: [order.id],
        relationName: "order-orderItems",
    }),
    product: one(product, {
        fields: [orderItem.productId],
        references: [product.id],
        relationName: "orderItem-product",
    }),
}));
