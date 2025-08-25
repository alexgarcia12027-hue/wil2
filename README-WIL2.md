# Abogado Wilson - Legal Management System

A comprehensive legal management system designed for legal professionals and clients. This modern web application integrates case management, client tracking, e-commerce, course delivery, blog publishing, and administrative dashboards.

## 🚀 Features

- **Full Authentication System** with role-based access (Admin, Client, Affiliate)
- **Client & Admin Dashboards** with real-time analytics
- **Course Platform** with video playback, quizzes, progress tracking, and certificates
- **Blog Management** with full CRUD, categories, tags, rich editor, and comments
- **Multi-Payment System** (PayPal, Stripe, Crypto, QR codes)
- **Affiliate Program** with multi-level referrals and commission tracking
- **API Monitoring** with uptime alerts and logs
- **AI-Powered Legal Consultation** via Google Gemini
- **WhatsApp Integration** and notification systems
- **Responsive PWA-Ready UI** with dark mode support

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Vite 4.1+
- **Styling**: Tailwind CSS 3.2.7, PostCSS, Autoprefixer
- **Routing**: React Router DOM 6.8.1
- **State Management**: React Context
- **Animations**: Framer Motion 10.0.1, Three.js 0.150.1
- **Backend**: Supabase (PostgreSQL), Node.js
- **Database**: Prisma ORM
- **Icons**: React Icons
- **Forms**: React Beautiful DnD, FullCalendar

## 📋 Prerequisites

- Node.js 18+
- npm
- Git

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/alexgarcia12027-hue/wil2.git
   cd wil2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp env.local.example env.local
   # Edit env.local with your Supabase, Stripe, PayPal keys
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or use the quick start script
   ./quick-start.bat
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🏗️ Build & Deployment

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Alternative Local Server
```bash
python -m http.server 8000
```

### Deployment Options
- **Vercel**: `vercel --prod`
- **Netlify**: `netlify deploy --prod --dir=dist`
- **Cloudflare Pages**: `wrangler pages publish dist`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── 3D/             # Three.js and animation components
│   ├── Auth/           # Authentication components
│   ├── Dashboard/      # Dashboard layouts and widgets
│   ├── Payment/        # Payment processing UI
│   ├── Blog/           # Blog management
│   └── ...
├── pages/              # Top-level route components
├── context/            # Global state providers
├── services/           # API clients and service logic
├── types/              # TypeScript interfaces
└── data/               # Static data

functions/api/          # Backend API functions
backend/                # Node.js server
prisma/                 # Database schema and seeding
```

## 🔧 Configuration

The application uses global configuration injection in `main.jsx` instead of traditional `.env` files for localhost development.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Alex Garcia**
- Email: alexgarcia12027@gmail.com
- GitHub: [@alexgarcia12027-hue](https://github.com/alexgarcia12027-hue)

## 🙏 Acknowledgments

- Built with React and Vite
- Styled with Tailwind CSS
- Powered by Supabase
- 3D effects with Three.js