export type ProductDrink = {
    id: string;
    name: string;
    stock: number;
    unit: string;
    price: number;
    image: string;
};

export type OrderItem = {
    product: ProductDrink;
    quantity: number;
};
