# 3D Components Documentation

This document provides an overview of the 3D components implemented in the application, their features, and usage instructions.

## Components Overview

### 1. Hero3D
A professional 3D hero section with mouse tracking effects, glassmorphism, and dynamic lighting.

**Features:**
- Mouse tracking light effect
- Glassmorphism cards
- 3D hover animations
- Countdown timer with effects
- Responsive design

**Props:**
None

**Usage:**
```jsx
import Hero3D from './components/Hero3D';

function HomePage() {
  return (
    <Hero3D />
  );
}
```

### 2. Services3D
A 3D services section with interactive cards that respond to mouse movement.

**Features:**
- Mouse tracking glow effects
- 3D card hover animations
- Glassmorphism design
- Gradient borders
- Responsive grid layout

**Props:**
None

**Usage:**
```jsx
import Services3D from './components/Services3D';

function ServicesPage() {
  return (
    <Services3D />
  );
}
```

### 3. Testimonials3D
An animated testimonials section with carousel functionality and 3D effects.

**Features:**
- Auto-rotating carousel
- Mouse tracking effects
- 3D card animations
- Rating system with stars
- Statistics display

**Props:**
None

**Usage:**
```jsx
import Testimonials3D from './components/Testimonials3D';

function TestimonialsSection() {
  return (
    <Testimonials3D />
  );
}
```

### 4. AnimatedLogo3D
A 3D animated logo component with interactive effects.

**Features:**
- Mouse tracking rotation
- Glow effects
- Smooth animations
- Size variants (small, medium, large)
- Responsive design

**Props:**
- `size`: 'small' | 'medium' | 'large' (default: 'large')

**Usage:**
```jsx
import AnimatedLogo3D from './components/AnimatedLogo3D';

function Logo() {
  return (
    <AnimatedLogo3D size="medium" />
  );
}
```

### 5. Navbar3D
A 3D navigation bar with interactive dropdowns and mouse effects.

**Features:**
- Mouse tracking highlights
- 3D dropdown menus
- Responsive mobile design
- User authentication integration
- Smooth animations

**Props:**
None

**Usage:**
```jsx
import Navbar3D from './components/Navbar3D';

function Navigation() {
  return (
    <Navbar3D />
  );
}
```

### 6. Footer3D
A 3D footer with interactive elements and mouse tracking effects.

**Features:**
- Mouse tracking background effects
- 3D social media icons
- Animated links
- Responsive design
- Gradient backgrounds

**Props:**
None

**Usage:**
```jsx
import Footer3D from './components/Footer3D';

function Footer() {
  return (
    <Footer3D />
  );
}
```

### 7. AnimatedButton3D
A 3D animated button component with multiple variants.

**Features:**
- Multiple style variants (primary, secondary, success, danger, outline, ghost)
- Size options (small, medium, large)
- Mouse tracking glow effects
- 3D hover animations
- Disabled state support

**Props:**
- `variant`: 'primary' | 'secondary' | 'success' | 'danger' | 'outline' | 'ghost' (default: 'primary')
- `size`: 'small' | 'medium' | 'large' (default: 'medium')
- `disabled`: boolean (default: false)
- `className`: string (additional CSS classes)
- `icon`: ReactNode (icon to display)
- All other button props are supported

**Usage:**
```jsx
import AnimatedButton3D from './components/AnimatedButton3D';
import { FaCheck } from 'react-icons/fa';

function Button() {
  return (
    <AnimatedButton3D variant="primary" size="large" icon={<FaCheck />}>
      Click Me
    </AnimatedButton3D>
  );
}
```

### 8. Card3D
A versatile 3D card component with glassmorphism effects.

**Features:**
- Glassmorphism design
- 3D hover effects
- Border color options
- Customizable styling
- Mouse tracking highlights

**Props:**
- `className`: string (additional CSS classes)
- `hoverEffect`: boolean (default: true)
- `glassEffect`: boolean (default: true)
- `borderColor`: 'blue' | 'green' | 'red' | 'purple' | 'yellow' (default: 'blue')
- All other div props are supported

**Usage:**
```jsx
import Card3D from './components/Card3D';

function Card() {
  return (
    <Card3D glassEffect={true} borderColor="blue">
      <h3>Card Title</h3>
      <p>Card content...</p>
    </Card3D>
  );
}
```

### 9. LoadingSpinner3D
A 3D animated loading spinner component.

**Features:**
- Smooth 3D rotation animation
- Color variants
- Size options
- Customizable design

**Props:**
- `size`: 'small' | 'medium' | 'large' (default: 'medium')
- `color`: 'blue' | 'green' | 'red' | 'purple' | 'yellow' (default: 'blue')

**Usage:**
```jsx
import LoadingSpinner3D from './components/LoadingSpinner3D';

function Loading() {
  return (
    <LoadingSpinner3D size="large" color="blue" />
  );
}
```

### 10. ProcessSearch3D
A 3D process search component with interactive elements.

**Features:**
- 3D search form
- Animated results display
- Mouse tracking effects
- Status indicators
- Responsive design

**Props:**
None

**Usage:**
```jsx
import ProcessSearch3D from './components/ProcessSearch3D';

function Search() {
  return (
    <ProcessSearch3D />
  );
}
```

### 11. SocialMediaIntegration3D
A 3D social media integration component with floating and default variants.

**Features:**
- Floating social media buttons
- 3D hover animations
- Mouse tracking effects
- Multiple platform support
- Responsive design

**Props:**
- `variant`: 'default' | 'floating' (default: 'default')

**Usage:**
```jsx
import SocialMediaIntegration3D from './components/SocialMediaIntegration3D';

function Social() {
  return (
    <SocialMediaIntegration3D variant="floating" />
  );
}
```

### 12. Newsletter3D
A 3D newsletter subscription component with animated feedback.

**Features:**
- 3D form design
- Animated success state
- Mouse tracking effects
- Glassmorphism background
- Responsive layout

**Props:**
None

**Usage:**
```jsx
import Newsletter3D from './components/Newsletter3D';

function Newsletter() {
  return (
    <Newsletter3D />
  );
}
```

### 13. IntelligentChatbot3D
A 3D intelligent chatbot with animated interface.

**Features:**
- 3D chat window
- Animated message transitions
- Typing indicators
- Mouse tracking effects
- Responsive design

**Props:**
None

**Usage:**
```jsx
import IntelligentChatbot3D from './components/IntelligentChatbot3D';

function Chatbot() {
  return (
    <IntelligentChatbot3D />
  );
}
```

### 14. JudicialNews3D
A 3D judicial news component with category filtering.

**Features:**
- 3D news cards
- Category filtering
- Mouse tracking effects
- Animated transitions
- Responsive grid layout

**Props:**
None

**Usage:**
```jsx
import JudicialNews3D from './components/JudicialNews3D';

function News() {
  return (
    <JudicialNews3D />
  );
}
```

## CSS Classes for 3D Effects

The application includes several CSS utility classes for creating 3D effects:

### Transform Utilities
- `.transform-3d` - Enables 3D transformations
- `.perspective-1000` - Sets 1000px perspective
- `.perspective-2000` - Sets 2000px perspective

### Depth Effects
- `.depth-1` to `.depth-5` - Progressive depth shadows

### Animation Classes
- `.hover-lift` - Lift effect on hover
- `.hover-scale` - Scale effect on hover
- `.hover-rotate` - Rotation effect on hover
- `.animated-gradient` - Animated gradient background
- `.shimmer` - Shimmer effect
- `.pulse` - Pulsing animation
- `.bounce` - Bouncing animation
- `.floating` - Floating animation

### Visual Effects
- `.glass-effect` - Glassmorphism effect
- `.text-gradient` - Gradient text effect
- `.card-3d` - 3D card effect
- `.glow` - Glowing effect
- `.neumorphism` - Neumorphism effect

## Context Providers

### Effects3DContext
Provides mouse position tracking and 3D effect controls throughout the application.

**Usage:**
```jsx
import { Effects3DProvider } from './context/Effects3DContext';
import { use3DEffects } from './context/Effects3DContext';

// Provider setup in App.jsx
function App() {
  return (
    <Effects3DProvider>
      {/* App content */}
    </Effects3DProvider>
  );
}

// Using context in components
function MyComponent() {
  const { mousePosition, is3DEnabled } = use3DEffects();
  
  return (
    <div>
      Mouse position: {mousePosition.x}, {mousePosition.y}
      3D effects: {is3DEnabled ? 'Enabled' : 'Disabled'}
    </div>
  );
}
```

## Performance Considerations

1. **Mouse Tracking Optimization**: Mouse tracking effects are optimized to minimize performance impact by:
   - Using `requestAnimationFrame` for smooth updates
   - Limiting effect updates to necessary elements
   - Providing option to disable 3D effects

2. **Animation Performance**: All animations use CSS transforms and opacity for optimal performance:
   - Hardware acceleration through `transform` and `opacity`
   - Efficient animation timing functions
   - Proper use of `will-change` property

3. **Responsive Design**: 3D effects automatically adapt to different screen sizes:
   - Reduced effects on mobile devices
   - Conditional rendering based on screen size
   - Touch-friendly interactions

## Customization

### Theme Colors
The 3D components use the existing Tailwind color palette:
- Primary: Blue shades (`blue-500`, `blue-600`, etc.)
- Secondary: Gray shades (`gray-500`, `gray-600`, etc.)
- Accent colors: Purple, green, red, yellow

### Size Variants
Most components support size variants:
- Small (`sm`): Compact elements
- Medium (`md`): Default size
- Large (`lg`): Prominent elements

### Disabling Effects
3D effects can be disabled globally through the `Effects3DContext`:
```jsx
const { setIs3DEnabled } = use3DEffects();
setIs3DEnabled(false); // Disable all 3D effects
```

## Browser Support

The 3D components are compatible with modern browsers that support:
- CSS3 transforms and transitions
- CSS custom properties
- Flexbox and Grid layouts
- Modern JavaScript (ES6+)

For older browsers, fallback styles are automatically applied.