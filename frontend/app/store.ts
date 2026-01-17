import { create } from 'zustand';
import axios from 'axios';
import { Product, NewProduct } from './types';

const API = 'http://localhost:3001/api/products';

interface ProductStore {
    products: Product[];
    loading: boolean;
    error: string | null;
    fetchProducts: (search?: string) => Promise<void>;
    addProduct: (product: NewProduct) => Promise<void>;
    updateProduct: (id: string, product: NewProduct) => Promise<void>; // <--- Nueva función
    deleteProduct: (id: string) => Promise<void>;
}

export const useProductStore = create<ProductStore>((set, get) => ({
    products: [],
    loading: false,
    error: null,
    fetchProducts: async (search) => {
        set({ loading: true, error: null });
        try {
            const { data } = await axios.get(search ? `${API}?search=${search}` : API);
            set({ products: data, loading: false });
        } catch (err) {
            set({ error: 'Error de conexión', loading: false });
        }
    },
    addProduct: async (newProd) => {
        try {
            const { data } = await axios.post(API, newProd);
            set({ products: [data, ...get().products] });
        } catch (err) { console.error(err); }
    },
    updateProduct: async (id, updatedProd) => { // <--- Lógica para editar
        try {
            const { data } = await axios.put(`${API}/${id}`, updatedProd);
            set({
                products: get().products.map(p => p.id === id ? data : p)
            });
        } catch (err) { console.error(err); }
    },
    deleteProduct: async (id) => {
        try {
            await axios.delete(`${API}/${id}`);
            set({ products: get().products.filter(p => p.id !== id) });
        } catch (err) { console.error(err); }
    }
}));