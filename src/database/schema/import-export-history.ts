import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { product, product as ProductTable } from "./product";
import { relations } from "drizzle-orm";

export const importExportHistory = pgTable("import_export_history", {
    id: uuid("id").primaryKey().defaultRandom(),
    productId: uuid("product_id")
        .references(() => ProductTable.id)
        .notNull(),
    type: text("type").notNull(),
    stock: integer("stock").notNull().default(0),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
});

export const importExportHistoryRelations = relations(
    importExportHistory,
    ({ one }) => ({
        product: one(product, {
            fields: [importExportHistory.productId],
            references: [product.id],
        }),
    })
);
