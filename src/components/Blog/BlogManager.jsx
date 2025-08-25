import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-hot-toast';
import { apiService } from '../../services/apiService';
import GlassCard from '../3D/GlassCard';
import LottieAnimation, { ProfessionalAnimations } from '../3D/LottieAnimation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const blogSchema = yup.object({
  title: yup.string().required('El título es requerido').min(5, 'Mínimo 5 caracteres'),
  slug: yup.string().required('El slug es requerido'),
  excerpt: yup.string().required('El resumen es requerido').max(200, 'Máximo 200 caracteres'),
  category: yup.string().required('La categoría es requerida'),
  tags: yup.string(),
  featured: yup.boolean(),
  published: yup.boolean()
});

const BlogManager = ({ isAdmin = false }) => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [content, setContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm({
    resolver: yupResolver(blogSchema),
    defaultValues: {
      title: '',
      slug: '',
      excerpt: '',
      category: '',
      tags: '',
      featured: false,
      published: false
    }
  });

  const watchTitle = watch('title');

  useEffect(() => {
    loadPosts();
    loadCategories();
  }, []);

  useEffect(() => {
    // Auto-generate slug from title
    if (watchTitle && !editingPost) {
      const slug = watchTitle
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setValue('slug', slug);
    }
  }, [watchTitle, editingPost, setValue]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await apiService.getBlogPosts();
      setPosts(data);
    } catch (error) {
      console.error('Error loading posts:', error);
      toast.error('Error al cargar las publicaciones');
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await apiService.getBlogCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const postData = {
        ...data,
        content,
        tags: data.tags ? data.tags.split(',').map(tag => tag.trim()) : [],
        authorId: 'current-user-id' // Replace with actual user ID
      };

      if (editingPost) {
        await apiService.updateBlogPost(editingPost.id, postData);
        toast.success('Publicación actualizada exitosamente');
      } else {
        await apiService.createBlogPost(postData);
        toast.success('Publicación creada exitosamente');
      }

      resetEditor();
      loadPosts();
    } catch (error) {
      console.error('Error saving post:', error);
      toast.error('Error al guardar la publicación');
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    reset({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      category: post.category,
      tags: post.tags?.join(', ') || '',
      featured: post.featured,
      published: post.published
    });
    setContent(post.content);
    setShowEditor(true);
  };

  const handleDelete = async (postId) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta publicación?')) {
      return;
    }

    try {
      await apiService.deleteBlogPost(postId);
      toast.success('Publicación eliminada exitosamente');
      loadPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Error al eliminar la publicación');
    }
  };

  const resetEditor = () => {
    setEditingPost(null);
    setShowEditor(false);
    setContent('');
    reset();
  };

  const filteredPosts = posts
    .filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !filterCategory || post.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'category') return a.category.localeCompare(b.category);
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['clean']
    ]
  };

  const PostCard = ({ post }) => (
    <GlassCard className="p-4 hover:scale-105 transition-transform">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-1">{post.title}</h3>
          <p className="text-gray-300 text-sm mb-2">{post.excerpt}</p>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>{post.category}</span>
            <span>•</span>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            {post.featured && (
              <>
                <span>•</span>
                <span className="text-yellow-400">⭐ Destacado</span>
              </>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-xs ${
            post.published 
              ? 'bg-green-500/20 text-green-400' 
              : 'bg-yellow-500/20 text-yellow-400'
          }`}>
            {post.published ? 'Publicado' : 'Borrador'}
          </span>
        </div>
      </div>

      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {post.tags.map(tag => (
            <span key={tag} className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {isAdmin && (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(post)}
            className="btn-3d glass-primary px-3 py-1 rounded text-sm text-white"
          >
            Editar
          </button>
          <button
            onClick={() => handleDelete(post.id)}
            className="btn-3d glass px-3 py-1 rounded text-sm text-red-400 border border-red-400/30"
          >
            Eliminar
          </button>
        </div>
      )}
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
    <div className="blog-manager">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white">
          {isAdmin ? 'Gestión de Blog' : 'Blog'}
        </h2>
        {isAdmin && (
          <button
            onClick={() => setShowEditor(true)}
            className="btn-3d glass-primary px-6 py-2 rounded-lg text-white font-medium flex items-center gap-2"
          >
            <LottieAnimation
              animationData={ProfessionalAnimations.success}
              width={20}
              height={20}
              trigger="hover"
            />
            Nueva Publicación
          </button>
        )}
      </div>

      {/* Filters */}
      <GlassCard className="p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-64">
            <input
              type="text"
              placeholder="Buscar publicaciones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400"
            />
          </div>
          
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
          >
            <option value="">Todas las categorías</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.slug}>{cat.name}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
          >
            <option value="createdAt">Más reciente</option>
            <option value="title">Título</option>
            <option value="category">Categoría</option>
          </select>
        </div>
      </GlassCard>

      {/* Posts Grid */}
      {filteredPosts.length === 0 ? (
        <GlassCard className="p-8 text-center">
          <LottieAnimation
            animationData={ProfessionalAnimations.info}
            width={60}
            height={60}
            className="mx-auto mb-4"
          />
          <p className="text-white text-lg">No se encontraron publicaciones</p>
        </GlassCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {/* Editor Modal */}
      {showEditor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-white">
                  {editingPost ? 'Editar Publicación' : 'Nueva Publicación'}
                </h3>
                <button
                  onClick={resetEditor}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Título *
                    </label>
                    <input
                      {...register('title')}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                      placeholder="Título de la publicación"
                    />
                    {errors.title && (
                      <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Slug *
                    </label>
                    <input
                      {...register('slug')}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                      placeholder="url-amigable"
                    />
                    {errors.slug && (
                      <p className="text-red-400 text-sm mt-1">{errors.slug.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Resumen *
                  </label>
                  <textarea
                    {...register('excerpt')}
                    rows={3}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                    placeholder="Breve descripción de la publicación"
                  />
                  {errors.excerpt && (
                    <p className="text-red-400 text-sm mt-1">{errors.excerpt.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Categoría *
                    </label>
                    <select
                      {...register('category')}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                    >
                      <option value="">Seleccionar categoría</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.slug}>{cat.name}</option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="text-red-400 text-sm mt-1">{errors.category.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Tags (separados por comas)
                    </label>
                    <input
                      {...register('tags')}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                      placeholder="derecho, legal, consulta"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Contenido
                  </label>
                  <div className="bg-white rounded-lg">
                    <ReactQuill
                      theme="snow"
                      value={content}
                      onChange={setContent}
                      modules={modules}
                      style={{ height: '300px', marginBottom: '50px' }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      {...register('featured')}
                      className="rounded"
                    />
                    <span className="text-white">Destacado</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      {...register('published')}
                      className="rounded"
                    />
                    <span className="text-white">Publicado</span>
                  </label>
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="btn-3d glass-primary px-6 py-2 rounded-lg text-white font-medium"
                  >
                    {editingPost ? 'Actualizar' : 'Crear'} Publicación
                  </button>
                  <button
                    type="button"
                    onClick={resetEditor}
                    className="btn-3d glass px-6 py-2 rounded-lg text-white border border-white/30"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogManager;
