import React, { useState } from 'react';
import { 
  FaSave, FaEye, FaCode, FaImage, FaFont, FaSquare, 
  FaAlignLeft, FaAlignCenter, FaAlignRight, 
  FaTrash, FaCopy, FaDesktop, FaTabletAlt, FaMobileAlt, FaPlus
} from 'react-icons/fa';

const SimpleWebsiteBuilder = () => {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [viewMode, setViewMode] = useState('desktop');
  const [showCode, setShowCode] = useState(false);

  const componentTypes = {
    HEADER: 'header',
    TEXT: 'text',
    IMAGE: 'image',
    BUTTON: 'button'
  };

  const addElement = (type) => {
    const newElement = {
      id: Date.now(),
      type,
      props: getDefaultProps(type),
      styles: getDefaultStyles(type)
    };
    setElements([...elements, newElement]);
  };

  const getDefaultProps = (type) => {
    switch (type) {
      case componentTypes.HEADER:
        return { text: 'Nuevo Header', level: 'h1' };
      case componentTypes.TEXT:
        return { text: 'Texto de ejemplo...' };
      case componentTypes.IMAGE:
        return { src: 'https://via.placeholder.com/300x200', alt: 'Imagen' };
      case componentTypes.BUTTON:
        return { text: 'Botón', link: '#' };
      default:
        return {};
    }
  };

  const getDefaultStyles = () => {
    return {
      padding: '16px',
      margin: '8px 0',
      backgroundColor: 'transparent',
      color: '#000000',
      fontSize: '16px',
      textAlign: 'left'
    };
  };

  const deleteElement = (id) => {
    setElements(elements.filter(el => el.id !== id));
    if (selectedElement?.id === id) {
      setSelectedElement(null);
    }
  };

  const updateElementProp = (key, value) => {
    const updated = elements.map(el => 
      el.id === selectedElement.id 
        ? { ...el, props: { ...el.props, [key]: value } }
        : el
    );
    setElements(updated);
    setSelectedElement({ ...selectedElement, props: { ...selectedElement.props, [key]: value } });
  };

  const renderElement = (element) => {
    const isSelected = selectedElement?.id === element.id;
    const className = `cursor-pointer border-2 ${isSelected ? 'border-blue-500' : 'border-transparent'}`;

    switch (element.type) {
      case componentTypes.HEADER:
        const HeaderTag = element.props.level || 'h1';
        return (
          <HeaderTag
            className={className}
            style={element.styles}
            onClick={() => setSelectedElement(element)}
          >
            {element.props.text}
          </HeaderTag>
        );
      case componentTypes.TEXT:
        return (
          <p
            className={className}
            style={element.styles}
            onClick={() => setSelectedElement(element)}
          >
            {element.props.text}
          </p>
        );
      case componentTypes.IMAGE:
        return (
          <img
            src={element.props.src}
            alt={element.props.alt}
            className={className}
            style={element.styles}
            onClick={() => setSelectedElement(element)}
          />
        );
      case componentTypes.BUTTON:
        return (
          <button
            className={`${className} px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700`}
            style={element.styles}
            onClick={() => setSelectedElement(element)}
          >
            {element.props.text}
          </button>
        );
      default:
        return <div className={className}>Elemento desconocido</div>;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Constructor de Páginas</h1>
          
          <div className="flex items-center space-x-2">
            {/* View Mode */}
            <div className="flex border border-gray-300 rounded">
              <button
                onClick={() => setViewMode('desktop')}
                className={`p-2 ${viewMode === 'desktop' ? 'bg-blue-100 text-blue-600' : ''}`}
              >
                <FaDesktop />
              </button>
              <button
                onClick={() => setViewMode('tablet')}
                className={`p-2 ${viewMode === 'tablet' ? 'bg-blue-100 text-blue-600' : ''}`}
              >
                <FaTabletAlt />
              </button>
              <button
                onClick={() => setViewMode('mobile')}
                className={`p-2 ${viewMode === 'mobile' ? 'bg-blue-100 text-blue-600' : ''}`}
              >
                <FaMobileAlt />
              </button>
            </div>

            <button 
              onClick={() => setShowCode(!showCode)}
              className="p-2 text-gray-600 hover:text-gray-800"
            >
              <FaCode />
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              <FaSave className="mr-2" />
              Guardar
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Component Palette */}
        <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Componentes</h3>
          <div className="space-y-2">
            <button
              onClick={() => addElement(componentTypes.HEADER)}
              className="w-full p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center"
            >
              <FaFont className="mr-2 text-blue-600" />
              Header
            </button>
            <button
              onClick={() => addElement(componentTypes.TEXT)}
              className="w-full p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center"
            >
              <FaAlignLeft className="mr-2 text-blue-600" />
              Texto
            </button>
            <button
              onClick={() => addElement(componentTypes.IMAGE)}
              className="w-full p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center"
            >
              <FaImage className="mr-2 text-blue-600" />
              Imagen
            </button>
            <button
              onClick={() => addElement(componentTypes.BUTTON)}
              className="w-full p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center"
            >
              <FaSquare className="mr-2 text-blue-600" />
              Botón
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div className={`flex-1 p-8 bg-white overflow-auto ${
          viewMode === 'tablet' ? 'max-w-2xl mx-auto' : ''
        } ${viewMode === 'mobile' ? 'max-w-sm mx-auto' : ''}`}>
          {elements.length === 0 ? (
            <div className="text-center text-gray-500 py-20">
              <FaPlus className="mx-auto text-4xl mb-4" />
              <p className="text-xl mb-4">Comienza agregando componentes</p>
              <p>Haz clic en los componentes de la izquierda para agregar elementos</p>
            </div>
          ) : (
            <div className="space-y-4">
              {elements.map((element) => (
                <div key={element.id} className="relative group">
                  {renderElement(element)}
                  {selectedElement?.id === element.id && (
                    <div className="absolute top-0 right-0 flex space-x-1 bg-white shadow-lg rounded p-1">
                      <button 
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                        onClick={() => deleteElement(element.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Properties Panel */}
        <div className="w-80 bg-gray-50 border-l border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Propiedades</h3>
          
          {selectedElement ? (
            <div className="space-y-4">
              {selectedElement.type === componentTypes.HEADER && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">Texto</label>
                    <input
                      type="text"
                      value={selectedElement.props.text || ''}
                      onChange={(e) => updateElementProp('text', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Nivel</label>
                    <select
                      value={selectedElement.props.level || 'h1'}
                      onChange={(e) => updateElementProp('level', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                    >
                      <option value="h1">H1</option>
                      <option value="h2">H2</option>
                      <option value="h3">H3</option>
                    </select>
                  </div>
                </>
              )}
              
              {selectedElement.type === componentTypes.TEXT && (
                <div>
                  <label className="block text-sm font-medium mb-1">Texto</label>
                  <textarea
                    value={selectedElement.props.text || ''}
                    onChange={(e) => updateElementProp('text', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    rows={3}
                  />
                </div>
              )}
              
              {selectedElement.type === componentTypes.BUTTON && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">Texto</label>
                    <input
                      type="text"
                      value={selectedElement.props.text || ''}
                      onChange={(e) => updateElementProp('text', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Enlace</label>
                    <input
                      type="text"
                      value={selectedElement.props.link || ''}
                      onChange={(e) => updateElementProp('link', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                </>
              )}
              
              {selectedElement.type === componentTypes.IMAGE && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">URL de imagen</label>
                    <input
                      type="text"
                      value={selectedElement.props.src || ''}
                      onChange={(e) => updateElementProp('src', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Texto alternativo</label>
                    <input
                      type="text"
                      value={selectedElement.props.alt || ''}
                      onChange={(e) => updateElementProp('alt', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                </>
              )}
            </div>
          ) : (
            <p className="text-gray-500">Selecciona un elemento para editarlo</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimpleWebsiteBuilder;
