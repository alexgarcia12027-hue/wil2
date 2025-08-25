import React, { useState, useEffect } from 'react';
import { useEcommerce } from '../../contexts/EcommerceContext';
import GlassCard from '../3D/GlassCard';
import LottieAnimation, { ProfessionalAnimations } from '../3D/LottieAnimation';
import { toast } from 'react-hot-toast';

const ProductCatalog = ({ type = 'all', category = null, featured = false }) => {
  const {
    products,
    ebooks,
    courses,
    services,
    categories,
    filteredProducts,
    filters,
    updateFilters,
    addToCart,
    addToWishlist,
    isInCart,
    isInWishlist,
    loading
  } = useEcommerce();

  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const getAllProducts = () => {
    let allProducts = [];
    
    if (type === 'all' || type === 'products') {
      allProducts = [...allProducts, ...products.map(p => ({ ...p, type: 'product' }))];
    }
    if (type === 'all' || type === 'ebooks') {
      allProducts = [...allProducts, ...ebooks.map(p => ({ ...p, type: 'ebook' }))];
    }
    if (type === 'all' || type === 'courses') {
      allProducts = [...allProducts, ...courses.map(p => ({ ...p, type: 'course' }))];
    }
    if (type === 'all' || type === 'services') {
      allProducts = [...allProducts, ...services.map(p => ({ ...p, type: 'service' }))];
    }

    // Apply category filter
    if (category) {
      allProducts = allProducts.filter(product => product.category === category);
    }

    // Apply featured filter
    if (featured) {
      allProducts = allProducts.filter(product => product.featured);
    }

    return allProducts;
  };

  const sortProducts = (products) => {
    return [...products].sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  };

  const displayProducts = sortProducts(getAllProducts());

  const ProductCard = ({ product }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleAddToCart = (e) => {
      e.stopPropagation();
      addToCart(product);
    };

    const handleAddToWishlist = (e) => {
      e.stopPropagation();
      addToWishlist(product);
    };

    const getTypeIcon = (type) => {
      switch (type) {
        case 'ebook':
          return '📚';
        case 'course':
          return '🎓';
        case 'service':
          return '⚖️';
        default:
          return '📦';
      }
    };

    const getTypeColor = (type) => {
      switch (type) {
        case 'ebook':
          return '#10b981';
        case 'course':
          return '#667eea';
        case 'service':
          return '#f59e0b';
        default:
          return '#6b7280';
      }
    };

    return (
      <GlassCard
        className="product-card h-full flex flex-col transition-all duration-300 hover:scale-105"
        glowColor={getTypeColor(product.type)}
        enableTilt={true}
        enableGlow={true}
        enableParticles={true}
      >
        <div className="relative">
          {/* Product Image */}
          <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className={`w-full h-48 object-cover transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
              />
            ) : (
              <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <span className="text-4xl">{getTypeIcon(product.type)}</span>
              </div>
            )}
            
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <LottieAnimation
                  animationData={ProfessionalAnimations.loading}
                  width={40}
                  height={40}
                  autoplay={true}
                />
              </div>
            )}
          </div>

          {/* Type Badge */}
          <div className="absolute top-2 left-2">
            <span 
              className="px-2 py-1 rounded-full text-xs font-medium text-white"
              style={{ backgroundColor: getTypeColor(product.type) }}
            >
              {product.type.charAt(0).toUpperCase() + product.type.slice(1)}
            </span>
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleAddToWishlist}
            className={`absolute top-2 right-2 p-2 rounded-full transition-colors ${
              isInWishlist(product)
                ? 'bg-red-500 text-white'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <LottieAnimation
              animationData={ProfessionalAnimations.heart}
              width={20}
              height={20}
              trigger="hover"
            />
          </button>
        </div>

        {/* Product Info */}
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
            {product.name}
          </h3>
          
          <p className="text-gray-300 text-sm mb-3 line-clamp-3 flex-1">
            {product.description}
          </p>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center mb-3">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>
                    {i < Math.floor(product.rating) ? '★' : '☆'}
                  </span>
                ))}
              </div>
              <span className="text-gray-300 text-sm ml-2">
                ({product.reviewCount || 0})
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center justify-between mb-4">
            <div>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-gray-400 text-sm line-through mr-2">
                  ${product.originalPrice}
                </span>
              )}
              <span className="text-xl font-bold text-white">
                ${product.price}
              </span>
            </div>
            
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              disabled={isInCart(product)}
              className={`flex-1 btn-3d px-4 py-2 rounded-lg font-medium transition-all ${
                isInCart(product)
                  ? 'glass border border-green-500 text-green-400'
                  : 'glass-primary text-white hover:scale-105'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <LottieAnimation
                  animationData={
                    isInCart(product) 
                      ? ProfessionalAnimations.success 
                      : ProfessionalAnimations.arrow
                  }
                  width={16}
                  height={16}
                  trigger="hover"
                />
                {isInCart(product) ? 'En Carrito' : 'Agregar'}
              </span>
            </button>
            
            <button className="btn-3d glass px-4 py-2 rounded-lg text-white border border-white/30 hover:bg-white/10">
              Ver Más
            </button>
          </div>
        </div>
      </GlassCard>
    );
  };

  const FilterBar = () => (
    <GlassCard className="p-4 mb-6">
      <div className="flex flex-wrap items-center gap-4">
        {/* Category Filter */}
        <div className="flex items-center gap-2">
          <label className="text-white text-sm font-medium">Categoría:</label>
          <select
            value={filters.category}
            onChange={(e) => updateFilters({ category: e.target.value })}
            className="px-3 py-1 bg-white/10 border border-white/20 rounded-lg text-white text-sm"
          >
            <option value="">Todas</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.slug}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div className="flex items-center gap-2">
          <label className="text-white text-sm font-medium">Precio:</label>
          <input
            type="range"
            min="0"
            max="1000"
            value={filters.priceRange[1]}
            onChange={(e) => updateFilters({ 
              priceRange: [0, parseInt(e.target.value)] 
            })}
            className="w-24"
          />
          <span className="text-white text-sm">${filters.priceRange[1]}</span>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <label className="text-white text-sm font-medium">Ordenar:</label>
          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split('-');
              setSortBy(field);
              setSortOrder(order);
            }}
            className="px-3 py-1 bg-white/10 border border-white/20 rounded-lg text-white text-sm"
          >
            <option value="name-asc">Nombre A-Z</option>
            <option value="name-desc">Nombre Z-A</option>
            <option value="price-asc">Precio Menor</option>
            <option value="price-desc">Precio Mayor</option>
            <option value="rating-desc">Mejor Valorado</option>
            <option value="createdAt-desc">Más Reciente</option>
          </select>
        </div>

        {/* View Mode */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg ${
              viewMode === 'grid' 
                ? 'bg-white/20 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            ⊞
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg ${
              viewMode === 'list' 
                ? 'bg-white/20 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            ☰
          </button>
        </div>
      </div>
    </GlassCard>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LottieAnimation
          animationData={ProfessionalAnimations.loading}
          width={80}
          height={80}
          autoplay={true}
        />
      </div>
    );
  }

  return (
    <div className="product-catalog">
      <FilterBar />
      
      {displayProducts.length === 0 ? (
        <GlassCard className="p-8 text-center">
          <LottieAnimation
            animationData={ProfessionalAnimations.error}
            width={60}
            height={60}
            className="mx-auto mb-4"
          />
          <p className="text-white text-lg">No se encontraron productos</p>
          <p className="text-gray-300 text-sm">
            Intenta ajustar los filtros de búsqueda
          </p>
        </GlassCard>
      ) : (
        <div className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'space-y-4'
        }>
          {displayProducts.map(product => (
            <ProductCard key={`${product.type}-${product.id}`} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductCatalog;
