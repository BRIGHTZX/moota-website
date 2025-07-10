import {
    active,
    activeInfo,
    activeInfoRelations,
    activeRelations,
} from "./schema/active";
import { diningTable } from "./schema/diningTable";
import {
    order,
    orderItem,
    orderItemRelations,
    orderRelations,
} from "./schema/order";
import {
    preOrder,
    preOrderInfo,
    preOrderInfoRelations,
    preOrderRelations,
} from "./schema/pre-order";
import {
    importExportHistory,
    importExportHistoryRelations,
} from "./schema/import-export-history";
import { product } from "./schema/product";
import {
    checkout,
    checkoutInfos,
    checkoutInfosRelations,
    checkoutRelations,
} from "./schema/checkout";

export const schema = {
    active,
    activeInfo,
    diningTable,
    order,
    orderItem,
    preOrder,
    preOrderInfo,
    importExportHistory,
    product,
    checkout,
    checkoutInfos,
    //relations
    activeRelations,
    activeInfoRelations,
    importExportHistoryRelations,
    orderRelations,
    orderItemRelations,
    preOrderRelations,
    preOrderInfoRelations,
    checkoutRelations,
    checkoutInfosRelations,
};
