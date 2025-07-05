import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { product as ProductTable } from "./product";

export const importExportHistory = pgTable("import_export_history", {
    id: uuid("id").primaryKey().defaultRandom(),
    productId: uuid("product_id").references(() => ProductTable.id),
    type: text("type").notNull(),
    stock: integer("stock").notNull().default(0),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
});
