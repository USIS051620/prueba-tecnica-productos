export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    image: string;
    createdAt: string;
    updatedAt: string;
}

// Esto es para cuando creamos uno nuevo (sin ID ni fechas)
export type NewProduct = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;