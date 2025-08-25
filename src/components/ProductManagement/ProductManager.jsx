import React, { useState } from 'react';
import { 
  FaBox, FaPlus, FaEdit, FaTrash, FaEye, FaUpload, FaDownload,
  FaShoppingCart, FaTag, FaImage, FaFileAlt, FaGraduationCap,
  FaBook, FaCreditCard, FaToggleOn, FaToggleOff, FaFilter
} from 'react-icons/fa';

const ProductManager = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Curso Derecho Laboral Completo',
      type: 'digital',
      category: 'course',
      price: 299,
      status: 'active',
      stock: 999,
      image: 'https://via.placeholder.com/300x200',
      description: 'Curso completo de derecho laboral con casos prácticos',
      sales: 156
    },
    {
      id: 2,
      name: 'Ebook Derecho Civil',
      type: 'digital',
      category: 'ebook',
      price: 49,
      status: 'active',
      stock: 999,
      image: 'https://via.placeholder.com/300x200',
      description: 'Manual completo de derecho civil actualizado',
      sales: 89
    },
    {
      id: 3,
      name: 'Manual Derecho Penal Físico',
      type: 'physical',
      category: 'book',
      price: 75,
      status: 'active',
      stock: 25,
      image: 'https://via.placeholder.com/300x200',
      description: 'Libro físico de derecho penal con jurisprudencia',
      sales: 34
    }
  ]);

  const categories = [
    { id: 'all', name: 'Todos', icon: <FaBox /> },
    { id: 'course', name: 'Cursos', icon: <FaGraduationCap /> },
    { id: 'ebook', name: 'Ebooks', icon: <FaFileAlt /> },
    { id: 'book', name: 'Libros', icon: <FaBook /> },
    { id: 'service', name: 'Servicios', icon: <FaCreditCard /> }
  ];

  const GlassCard = ({ children, className = '', hover = false }) => (
    <div className={`
      backdrop-blur-lg bg-white/20 border border-white/20 rounded-2xl shadow-xl
      ${hover ? 'hover:bg-white/30 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1' : ''}
      ${className}
    `}>
      {children}
    </div>
  );

  const ProductCard = ({ product }) => (
    <GlassCard hover className="p-6">
      <div className="relative mb-4">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg"
        />
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            product.status === 'active' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {product.status === 'active' ? 'Activo' : 'Inactivo'}
          </span>
        </div>
        <div className="absolute top-2 left-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            product.type === 'digital' 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-purple-100 text-purple-800'
          }`}>
            {product.type === 'digital' ? 'Digital' : 'Físico'}
          </span>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

      <div className="flex items-center justify-between mb-4">
        <span className="text-2xl font-bold text-green-600">${product.price}</span>
        <div className="text-sm text-gray-500">
          {product.type === 'physical' ? `Stock: ${product.stock}` : 'Ilimitado'}
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FaShoppingCart className="text-blue-600" />
          <span className="text-sm text-gray-600">{product.sales} ventas</span>
        </div>
        <div className="flex items-center gap-2">
          {product.status === 'active' ? (
            <FaToggleOn className="text-green-600 text-xl" />
          ) : (
            <FaToggleOff className="text-gray-400 text-xl" />
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <button 
          onClick={() => handleEdit(product)}
          className="flex-1 py-2 px-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <FaEdit /> Editar
        </button>
        <button 
          onClick={() => handleView(product)}
          className="py-2 px-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <FaEye />
        </button>
        <button 
          onClick={() => handleDelete(product.id)}
          className="py-2 px-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <FaTrash />
        </button>
      </div>
    </GlassCard>
  );

  const ProductModal = () => {
    const [formData, setFormData] = useState({
      name: '',
      type: 'digital',
      category: 'course',
      price: '',
      description: '',
      image: '',
      stock: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      const newProduct = {
        id: Date.now(),
        ...formData,
        price: parseFloat(formData.price),
        stock: formData.type === 'digital' ? 999 : parseInt(formData.stock),
        status: 'active',
        sales: 0
      };

      if (editingProduct) {
        setProducts(products.map(p => p.id === editingProduct.id ? { ...newProduct, id: editingProduct.id } : p));
      } else {
        setProducts([...products, newProduct]);
      }

      setShowModal(false);
      setEditingProduct(null);
    };

    return (
      <div className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
        showModal ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
        <div className="relative backdrop-blur-lg bg-white/20 border border-white/20 rounded-2xl shadow-2xl p-8 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre del Producto
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Precio ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full px-4 py-2 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full px-4 py-2 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  <option value="digital">Digital</option>
                  <option value="physical">Físico</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoría
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-2 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  <option value="course">Curso</option>
                  <option value="ebook">Ebook</option>
                  <option value="book">Libro</option>
                  <option value="service">Servicio</option>
                </select>
              </div>

              {formData.type === 'physical' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stock
                  </label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: e.target.value})}
                    className="w-full px-4 py-2 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL de Imagen
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full px-4 py-2 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={4}
                className="w-full px-4 py-2 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                placeholder="Descripción detallada del producto..."
                required
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              >
                {editingProduct ? 'Actualizar' : 'Crear'} Producto
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  setEditingProduct(null);
                }}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleView = (product) => {
    alert(`Ver producto: ${product.name}`);
  };

  const handleDelete = (id) => {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Gestión de Productos
        </h2>
        <button 
          onClick={() => setShowModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
        >
          <FaPlus /> Nuevo Producto
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Productos</p>
              <p className="text-2xl font-bold text-blue-600">{products.length}</p>
            </div>
            <FaBox className="text-3xl text-blue-600 opacity-80" />
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Productos Activos</p>
              <p className="text-2xl font-bold text-green-600">
                {products.filter(p => p.status === 'active').length}
              </p>
            </div>
            <FaToggleOn className="text-3xl text-green-600 opacity-80" />
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Ventas Totales</p>
              <p className="text-2xl font-bold text-purple-600">
                {products.reduce((sum, p) => sum + p.sales, 0)}
              </p>
            </div>
            <FaShoppingCart className="text-3xl text-purple-600 opacity-80" />
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Ingresos</p>
              <p className="text-2xl font-bold text-orange-600">
                ${products.reduce((sum, p) => sum + (p.price * p.sales), 0).toLocaleString()}
              </p>
            </div>
            <FaCreditCard className="text-3xl text-orange-600 opacity-80" />
          </div>
        </GlassCard>
      </div>

      {/* Category Filter */}
      <GlassCard className="p-6">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-blue-100 text-blue-700 shadow-lg transform scale-105'
                  : 'bg-white/50 text-gray-600 hover:bg-white/70'
              }`}
            >
              {category.icon}
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl text-gray-400 mb-4">📦</div>
          <p className="text-xl text-gray-600">No hay productos en esta categoría</p>
          <p className="text-gray-500 mt-2">Agrega tu primer producto</p>
        </div>
      )}

      {/* Modal */}
      {showModal && <ProductModal />}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default ProductManager;
