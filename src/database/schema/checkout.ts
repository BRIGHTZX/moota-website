import {
    pgTable,
    uuid,
    timestamp,
    integer,
    text,
    real,
    pgEnum,
} from 'drizzle-orm/pg-core';
import { active } from './active';
import { product } from './product';
import { relations } from 'drizzle-orm';

export const groupType = pgEnum('group_type', ['adult', 'child']);
export const paymentMethod = pgEnum('payment_method', ['cash', 'promptpay']);

export const checkout = pgTable('checkout', {
    id: uuid('id').primaryKey().defaultRandom(),
    activeId: uuid('active_id')
        .references(() => active.id)
        .notNull(),
    customerName: text('customer_name').notNull(),
    paidAdultNumber: integer('paid_adult_number').notNull(),
    paidChildNumber: integer('paid_child_number').notNull(),
    totalOrderPrice: real('total_order_price').notNull(),
    totalDiscount: real('total_discount').notNull(),
    totalAmount: real('total_amount').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
        .defaultNow()
        .notNull()
        .$onUpdate(() => new Date()),
});

export const checkoutRelations = relations(checkout, ({ many, one }) => ({
    active: one(active, {
        fields: [checkout.activeId],
        references: [active.id],
    }),
    checkoutInfos: many(checkoutInfos),
    checkoutPaymentInfos: many(checkoutPaymentInfos),
}));

export const checkoutInfos = pgTable('checkout_infos', {
    id: uuid('id').primaryKey().defaultRandom(),
    checkoutId: uuid('checkout_id')
        .references(() => checkout.id)
        .notNull(),
    productId: uuid('product_id')
        .references(() => product.id)
        .notNull(),
    quantity: integer('quantity').notNull(),
    pricePerUnit: integer('price_per_unit').notNull().default(0),
    totalPrice: integer('total_price').notNull().default(0),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
        .defaultNow()
        .notNull()
        .$onUpdate(() => new Date()),
});

export const checkoutInfosRelations = relations(checkoutInfos, ({ one }) => ({
    checkout: one(checkout, {
        fields: [checkoutInfos.checkoutId],
        references: [checkout.id],
    }),
    product: one(product, {
        fields: [checkoutInfos.productId],
        references: [product.id],
    }),
}));

export const checkoutPaymentInfos = pgTable('checkout_payment_infos', {
    id: uuid('id').primaryKey().defaultRandom(),
    checkoutId: uuid('checkout_id')
        .references(() => checkout.id)
        .notNull(),
    groupType: groupType('group_type').notNull(),
    quantity: integer('quantity').notNull(),
    pricePerUnit: integer('price_per_unit').notNull().default(0),
    totalPrice: integer('total_price').notNull().default(0),
    paymentMethod: paymentMethod('payment_method').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const checkoutPaymentInfosRelations = relations(
    checkoutPaymentInfos,
    ({ one }) => ({
        checkout: one(checkout, {
            fields: [checkoutPaymentInfos.checkoutId],
            references: [checkout.id],
        }),
    })
);
