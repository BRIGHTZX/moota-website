export type ProductDrink = {
    id: string;
    name: string;
    stock: number;
    unit: string;
    price: number;
    image: string;
};

export type OrderProduct = {
    id: string;
    name: string;
    price: number;
};

export type OrderItem = {
    product: OrderProduct;
    quantity: number;
};

export type OrderItemDB = {
    id: string;
    orderId: string;
    productId: string;
    quantity: number;
    pricePerUnit: number;
    productName: string;
};

export type OrderHistory = {
    id: string;
    totalPrice: number;
    updatedAt: string;
    orderItems: OrderItemDB[];
};
