# Shaurya Spatial Labs - Futuristic Geospatial Website

## Overview

This is a modern, high-tech geospatial website for Shaurya Spatial Labs, built as a full-stack React application with a futuristic command center aesthetic. The website showcases premium GIS and geospatial solutions with immersive 3D visualizations, interactive data displays, and a sophisticated dark theme.

## Recent Enhancements (January 16, 2025)

### Advanced Interactive Components
- **Live Earthquake Map**: Real-time seismic data visualization using USGS API with fallback demo data
- **Enhanced 3D Globe**: Multi-layered Three.js globe with orbital rings, floating data points, and connection arcs
- **Parallax Star Field**: Multi-depth animated background with nebula effects for immersive depth
- **Typewriter Text Effect**: Dynamic rotating headlines in hero section with smooth animations
- **Animated Metrics Counters**: Progressive number counting with easing effects for statistics
- **Skills Radar Chart**: Interactive hexagonal radar visualization showing expertise levels
- **Interactive Timeline**: Expandable company milestones with categorized achievements
- **Floating Action Button**: Expandable contact widget with multiple communication options

### Enhanced User Experience
- **Live Data Integration**: Real earthquake data feeds demonstrate geospatial capabilities
- **Advanced Animations**: Framer Motion scroll-triggered animations and micro-interactions
- **Progressive Loading**: Smooth reveal animations as user scrolls through sections
- **Interactive Visualizations**: Hover-activated data charts within service cards
- **Responsive Design**: Optimized for all screen sizes with adaptive layouts

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for fast development and building
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: Shadcn/ui component library with Radix UI primitives
- **3D Graphics**: Three.js for interactive globe and 3D visualizations
- **Animations**: Framer Motion for smooth transitions and scroll-based animations
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management

### Backend Architecture
- **Server**: Express.js with TypeScript for the REST API
- **Development**: Hot module replacement via Vite integration
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Storage**: PostgreSQL-based session storage with connect-pg-simple

### Build System
- **Bundler**: Vite for frontend, esbuild for backend production builds
- **TypeScript**: Full TypeScript support across frontend, backend, and shared code
- **Path Aliases**: Configured for clean imports (@/, @shared/, etc.)

## Key Components

### Interactive Elements
1. **3D Globe Component**: Interactive Three.js globe with rotating data visualizations
2. **Code Rain Animation**: Cascading code snippets with real GIS/geospatial code
3. **Service Cards**: Hover-activated micro-animations and data visualizations
4. **Technology Grid**: Interactive technology showcase with hover effects
5. **Live Data Display**: Real-time data stats simulation

### Core Pages
- **Home Page**: Complete single-page application with all sections
- **404 Page**: Fallback for unmatched routes

### UI Components
- **Navigation**: Fixed navigation with glass morphism effect
- **Service Cards**: Interactive cards with embedded visualizations
- **Technology Cards**: Hover-activated technology showcase
- **Toast System**: User feedback notifications

### Shared Schema
- **User Management**: Basic user schema with authentication structure
- **Database Types**: Type-safe database operations with Drizzle

## Data Flow

1. **Client-Side Rendering**: React components render the UI with TypeScript safety
2. **API Communication**: TanStack Query manages server state and caching
3. **Database Operations**: Drizzle ORM handles PostgreSQL interactions
4. **Session Management**: Express sessions stored in PostgreSQL
5. **Asset Management**: Vite handles static assets and hot reloading

### State Management Pattern
- Server state managed by TanStack Query
- Local component state via React hooks
- Form state managed by React Hook Form with Zod validation

## External Dependencies

### Core Libraries
- **React Ecosystem**: React 18, React DOM, React Hook Form
- **UI Framework**: Radix UI primitives, Lucide React icons, React Icons
- **Styling**: Tailwind CSS, Class Variance Authority, clsx
- **3D Graphics**: Three.js with TypeScript definitions
- **Animations**: Framer Motion for fluid animations
- **Database**: Drizzle ORM, Neon Database serverless driver
- **Validation**: Zod for runtime type checking

### Development Tools
- **Build Tools**: Vite, esbuild, TypeScript compiler
- **Code Quality**: PostCSS, Autoprefixer
- **Development Utilities**: tsx for TypeScript execution, Replit integration

### Third-Party Integrations
- **Font Loading**: Google Fonts (Space Grotesk, Inter)
- **Database Hosting**: Neon Database (serverless PostgreSQL)
- **Development Platform**: Replit-specific tooling and plugins

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with HMR for frontend, tsx for backend
- **Database**: Drizzle Kit for migrations and schema management
- **Environment Variables**: DATABASE_URL for PostgreSQL connection

### Production Build
- **Frontend**: Vite builds optimized React bundle to `dist/public`
- **Backend**: esbuild compiles TypeScript Express server to `dist/index.js`
- **Database**: Drizzle migrations ensure schema consistency
- **Assets**: Static files served from the Express server

### Build Commands
- `npm run dev`: Development with hot reloading
- `npm run build`: Production build for both frontend and backend
- `npm run start`: Production server startup
- `npm run db:push`: Database schema deployment

### Architecture Decisions

**Problem**: Need for a futuristic, immersive geospatial website
**Solution**: React with Three.js for 3D visualizations and Framer Motion for animations
**Rationale**: Provides smooth 3D interactions and professional animations while maintaining performance

**Problem**: Type safety across full stack
**Solution**: TypeScript everywhere with shared types and Drizzle ORM
**Rationale**: Prevents runtime errors and improves developer experience

**Problem**: Modern UI components with consistent theming
**Solution**: Shadcn/ui with Tailwind CSS and CSS custom properties
**Rationale**: Provides professional components with full customization control

**Problem**: Database management and migrations
**Solution**: Drizzle ORM with PostgreSQL and automated migrations
**Rationale**: Type-safe database operations with excellent developer experience