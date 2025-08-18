# Overview

This is a kid-friendly web application called "Tied Together" that teaches children how to make friendship bracelets through interactive tutorials and video guides. The app features a colorful, playful design with a cute dog mascot and focuses on providing step-by-step bracelet-making instructions for different skill levels (beginner, intermediate, advanced). Users can browse video tutorials, view a gallery of creations, and follow detailed guides with materials lists and instructions.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing (lightweight alternative to React Router)
- **Styling**: Tailwind CSS with custom kid-friendly color variables and Shadcn/ui components
- **State Management**: TanStack Query for server state management and data fetching
- **UI Components**: Radix UI primitives with custom styling through Shadcn/ui component library
- **Typography**: Custom fonts including Fredoka One for headings and Open Sans for body text

## Backend Architecture  
- **Server Framework**: Express.js with TypeScript
- **Architecture Pattern**: RESTful API with clear separation of concerns
- **Storage Layer**: Abstract storage interface (IStorage) with in-memory implementation for development
- **Route Organization**: Centralized route registration with dedicated routes.ts file
- **Development Setup**: Vite integration for hot module replacement in development mode
- **Error Handling**: Centralized error handling middleware with proper HTTP status codes

## Data Storage Solutions
- **Database**: PostgreSQL configured through Drizzle ORM
- **Schema Management**: Type-safe database schema definitions in shared/schema.ts
- **Migration System**: Drizzle Kit for database migrations and schema changes
- **Development Data**: In-memory storage with seed data for quick development iteration
- **Connection**: Neon Database serverless PostgreSQL for production deployment

## Database Schema Design
- **Tutorials Table**: Stores tutorial information including title, description, difficulty level, video URLs, steps array, and materials list
- **Gallery Items Table**: Stores user-created bracelet photos with creator information and difficulty ratings
- **Type Safety**: Zod schemas for runtime validation and TypeScript type inference
- **UUID Primary Keys**: Auto-generated UUIDs for all database entities

## API Structure
- **RESTful Endpoints**: 
  - GET /api/tutorials - Retrieve all tutorials
  - GET /api/tutorials/:id - Get specific tutorial
  - GET /api/gallery - Get all gallery items
  - GET /api/gallery/:id - Get specific gallery item
- **Error Responses**: Consistent JSON error format with appropriate HTTP status codes
- **Request Logging**: Detailed API request/response logging for development debugging

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL hosting for production database
- **Drizzle ORM**: Type-safe database ORM with PostgreSQL dialect support
- **Connection Pooling**: Built-in connection management through Neon's serverless architecture

## UI/UX Libraries  
- **Radix UI**: Headless component primitives for accessibility and behavior
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Lucide React**: Icon library for consistent iconography throughout the app
- **Embla Carousel**: Touch-friendly carousel component for image galleries

## Development Tools
- **Vite**: Fast development server and build tool with HMR support
- **TypeScript**: Static type checking across frontend, backend, and shared code
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Autoprefixer for browser compatibility

## Asset Management
- **Static Assets**: Images stored in attached_assets directory
- **Font Loading**: Google Fonts integration for custom typography
- **Image Optimization**: Unsplash URLs for placeholder images in development

## Query and Form Management
- **TanStack Query**: Server state management with caching and background refetching
- **React Hook Form**: Form state management with validation
- **Hookform Resolvers**: Integration between React Hook Form and Zod validation

## Deployment and Hosting
- **Replit Integration**: Development environment with live preview capabilities  
- **Environment Variables**: Database URL and other config through environment variables
- **Build Process**: Two-stage build (client with Vite, server with ESBuild)