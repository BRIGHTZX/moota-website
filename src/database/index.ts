import {
    active,
    activeInfo,
    activeInfoRelations,
    activeRelations,
} from './schema/active';
import {
    checkout,
    checkoutInfos,
    checkoutInfosRelations,
    checkoutPaymentInfos,
    checkoutPaymentInfosRelations,
    checkoutRelations,
} from './schema/checkout';
import { diningTable } from './schema/diningTable';
import {
    importExportHistory,
    importExportHistoryRelations,
} from './schema/import-export-history';
import {
    order,
    orderItem,
    orderItemRelations,
    orderRelations,
} from './schema/order';
import {
    preOrder,
    preOrderInfo,
    preOrderInfoRelations,
    preOrderRelations,
} from './schema/pre-order';
import { product } from './schema/product';
import { takeAway } from './schema/takeaway';

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
    checkoutPaymentInfos,
    takeAway,
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
    checkoutPaymentInfosRelations,
};
