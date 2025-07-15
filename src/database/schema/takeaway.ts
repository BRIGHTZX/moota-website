import { pgTable, real, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const takeAway = pgTable('take-away', {
    id: uuid('id').primaryKey().defaultRandom(),
    totalAmount: real('total_amount').notNull(),
    paymentMethod: text('payment_method').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
        .defaultNow()
        .notNull()
        .$onUpdate(() => new Date()),
});
