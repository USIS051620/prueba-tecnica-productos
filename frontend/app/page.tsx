/* eslint-disable */
'use client'
import { useEffect, useState } from 'react';
import { useProductStore } from './store';
import { Product } from './types';
import { Search, Plus, Trash2, Edit2, Package, X, Loader2, Sparkles, ShoppingBag, AlertCircle, Image as ImageIcon } from 'lucide-react';

export default function Home() {
  const { products, loading, error, fetchProducts, addProduct, updateProduct, deleteProduct } = useProductStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [search, setSearch] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      fetchProducts();
    }
  }, [mounted, fetchProducts]);

  if (!mounted) return null;

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      price: Number(formData.get('price')),
      category: formData.get('category') as string,
      description: formData.get('description') as string,
      image: formData.get('image') as string,
    };

    if (editingProduct) {
      await updateProduct(editingProduct.id, data);
    } else {
      await addProduct(data);
    }
    
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="min-h-screen pb-20">
      <nav className="bg-white/70 backdrop-blur-xl sticky top-0 z-40 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-4 md:py-0 md:h-20 flex flex-col md:flex-row items-center justify-between gap-4 relative">
          <div className="flex items-center gap-2.5 w-full md:w-auto">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <ShoppingBag className="text-white" size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Tech<span className="text-indigo-600">CRUD</span></span>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-80">
              <input 
                type="text" 
                placeholder="Buscar colección..." 
                className="bg-slate-100 border-none rounded-2xl py-3 md:py-2.5 pl-11 pr-5 w-full text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none"
                value={search}
                onChange={(e) => { setSearch(e.target.value); fetchProducts(e.target.value); }}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            </div>
            <button 
              onClick={() => { setEditingProduct(null); setIsModalOpen(true); }} 
              className="bg-slate-900 text-white w-full md:w-auto px-5 py-3 md:py-2.5 rounded-2xl font-semibold text-sm hover:bg-indigo-600 transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <Plus size={18} /> Nuevo Producto
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-12">
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Catálogo de Productos</h1>
          <p className="text-slate-500 font-medium text-lg text-balance">Gestiona tu inventario de productos con diseño de alta gama.</p>
        </div>

        {error && (
          <div className="mb-8 bg-red-50 p-4 rounded-2xl text-red-700 flex items-center gap-3 border border-red-100">
            <AlertCircle size={20} />
            <p className="font-medium text-sm">Error al conectar con la API en la nube.</p>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-32"><Loader2 className="animate-spin text-indigo-600" size={40} /></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {Array.isArray(products) && products.map((p) => (
              <div key={p.id} className="group animate-fade-in">
                <div className="relative aspect-[4/5] mb-5 overflow-hidden rounded-[3rem] bg-slate-200 shadow-sm border border-slate-100 transition-all group-hover:shadow-2xl">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute bottom-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                    <button onClick={() => handleEditClick(p)} className="bg-white/90 backdrop-blur-md p-3 rounded-full text-blue-600 hover:bg-blue-600 hover:text-white shadow-xl transition-all"><Edit2 size={18} /></button>
                    <button onClick={() => deleteProduct(p.id)} className="bg-white/90 backdrop-blur-md p-3 rounded-full text-red-500 hover:bg-red-500 hover:text-white shadow-xl transition-all"><Trash2 size={18} /></button>
                  </div>
                </div>
                <div className="px-3">
                  <h3 className="font-bold text-xl text-slate-900 mb-1 leading-tight group-hover:text-indigo-600 transition-colors">{p.name}</h3>
                  <p className="text-slate-500 text-sm mb-3 line-clamp-2 leading-relaxed">{p.description}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <Package size={14} className="text-slate-300" />
                    <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{p.category}</span>
                  </div>
                  <span className="text-2xl font-black text-slate-900 tracking-tight">${p.price}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-lg rounded-[3rem] p-10 md:p-12 shadow-2xl relative max-h-[90vh] overflow-y-auto no-scrollbar">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-10 right-10 text-slate-300 hover:text-slate-900 transition-colors"><X size={28} /></button>
            <div className="flex items-center gap-3 mb-10 text-indigo-600">
              <Sparkles size={28} />
              <h2 className="text-3xl font-bold text-slate-900">{editingProduct ? 'Editar Producto' : 'Nuevo Producto'}</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input name="name" defaultValue={editingProduct?.name} placeholder="Nombre" className="w-full bg-slate-50 rounded-[1.5rem] p-5 outline-none focus:ring-2 focus:ring-indigo-500/20" required />
              <div className="grid grid-cols-2 gap-4">
                <input name="price" type="number" defaultValue={editingProduct?.price} placeholder="Precio" className="w-full bg-slate-50 rounded-[1.5rem] p-5 outline-none" required />
                <input name="category" defaultValue={editingProduct?.category} placeholder="Categoría" className="w-full bg-slate-50 rounded-[1.5rem] p-5 outline-none" required />
              </div>
              <input name="image" defaultValue={editingProduct?.image} placeholder="URL de Imagen (Opcional)" className="w-full bg-slate-50 rounded-[1.5rem] p-5 outline-none text-sm" />
              <textarea name="description" defaultValue={editingProduct?.description} placeholder="Descripción..." className="w-full bg-slate-50 rounded-[1.5rem] p-6 h-32 outline-none resize-none" required />
              <button type="submit" className="w-full bg-indigo-600 text-white py-5 rounded-[1.5rem] font-bold text-lg shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all">
                {editingProduct ? 'Guardar Cambios' : 'Crear Producto'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}