import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Hero3D from '../components/Hero3D';
import Services3D from '../components/Services3D';
import Testimonials3D from '../components/Testimonials3D';
import AnimatedLogo3D from '../components/AnimatedLogo3D';
import AnimatedButton3D from '../components/AnimatedButton3D';
import Card3D from '../components/Card3D';

// Mock framer-motion since it's not compatible with JSDOM
jest.mock('framer-motion', () => {
  const actual = jest.requireActual('framer-motion');
  return {
    ...actual,
    motion: {
      div: ({ children, ...props }) => <div {...props}>{children}</div>,
      button: ({ children, ...props }) => <button {...props}>{children}</button>,
      span: ({ children, ...props }) => <span {...props}>{children}</span>,
      a: ({ children, ...props }) => <a {...props}>{children}</a>,
      section: ({ children, ...props }) => <section {...props}>{children}</section>,
      h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
      h2: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
      h3: ({ children, ...props }) => <h3 {...props}>{children}</h3>,
      p: ({ children, ...props }) => <p {...props}>{children}</p>,
      ul: ({ children, ...props }) => <ul {...props}>{children}</ul>,
      li: ({ children, ...props }) => <li {...props}>{children}</li>,
    },
    AnimatePresence: ({ children }) => <div>{children}</div>,
  };
});

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  Link: ({ children, ...props }) => <a {...props}>{children}</a>,
  useLocation: () => ({ pathname: '/' }),
}));

// Mock react-icons
jest.mock('react-icons/fa', () => ({
  FaWhatsapp: () => <div>WhatsApp Icon</div>,
  FaCalendarAlt: () => <div>Calendar Icon</div>,
  FaArrowRight: () => <div>Arrow Icon</div>,
  FaUserTie: () => <div>User Icon</div>,
  FaLock: () => <div>Shield Icon</div>,
  FaFileContract: () => <div>Contract Icon</div>,
  FaClock: () => <div>Clock Icon</div>,
  FaGavel: () => <div>Gavel Icon</div>,
  FaBalanceScale: () => <div>Balance Icon</div>,
  FaCar: () => <div>Car Icon</div>,
  FaBuilding: () => <div>Building Icon</div>,
  FaPassport: () => <div>Passport Icon</div>,
  FaUniversity: () => <div>University Icon</div>,
  FaStar: () => <div>Star Icon</div>,
  FaQuoteLeft: () => <div>Quote Icon</div>,
  FaSearch: () => <div>Search Icon</div>,
  FaFileAlt: () => <div>File Icon</div>,
  FaUserAlt: () => <div>User Icon</div>,
  FaFacebookF: () => <div>Facebook Icon</div>,
  FaTwitter: () => <div>Twitter Icon</div>,
  FaInstagram: () => <div>Instagram Icon</div>,
  FaLinkedinIn: () => <div>LinkedIn Icon</div>,
  FaEnvelope: () => <div>Envelope Icon</div>,
  FaPhone: () => <div>Phone Icon</div>,
  FaMapMarkerAlt: () => <div>Map Icon</div>,
  FaComments: () => <div>Comments Icon</div>,
  FaTimes: () => <div>Times Icon</div>,
  FaPaperPlane: () => <div>Paper Plane Icon</div>,
  FaRobot: () => <div>Robot Icon</div>,
  FaUser: () => <div>User Icon</div>,
  FaSpinner: () => <div>Spinner Icon</div>,
  FaNewspaper: () => <div>Newspaper Icon</div>,
  FaChevronRight: () => <div>Chevron Icon</div>,
}));

// Mock react-hot-toast
jest.mock('react-hot-toast', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock the AuthContext
jest.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    user: null,
    logout: jest.fn(),
  }),
}));

describe('3D Components', () => {
  test('renders Hero3D component', () => {
    render(<Hero3D />);
    expect(screen.getByText('Abg. Wilson Alexander Ipiales Guerron')).toBeInTheDocument();
  });

  test('renders Services3D component', () => {
    render(<Services3D />);
    expect(screen.getByText('Nuestros Servicios Legales')).toBeInTheDocument();
  });

  test('renders Testimonials3D component', () => {
    render(<Testimonials3D />);
    expect(screen.getByText('Testimonios de Clientes')).toBeInTheDocument();
  });

  test('renders AnimatedLogo3D component', () => {
    render(<AnimatedLogo3D />);
    expect(screen.getByText('Abogado Wilson')).toBeInTheDocument();
  });

  test('renders AnimatedButton3D component', () => {
    render(<AnimatedButton3D>Click Me</AnimatedButton3D>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  test('renders Card3D component', () => {
    render(<Card3D>Card Content</Card3D>);
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });
});