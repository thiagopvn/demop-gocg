# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + Vite application for managing equipment custody ("controle de cautela") with Firebase integration. The application manages users, materials, vehicles (viaturas), and movement tracking (movimentações) with authentication and role-based access control.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run ESLint
npm run lint

# Preview production build
npm run preview
```

## Architecture

### Tech Stack
- **Frontend**: React 19 with Vite
- **UI Library**: Material-UI (@mui/material)
- **Routing**: React Router DOM v7
- **Database**: Firebase Firestore
- **Authentication**: Custom JWT implementation using jose library
- **Charts**: Recharts
- **Excel Export**: xlsx library

### Core Structure

#### Authentication Flow
- JWT-based authentication stored in localStorage
- Token verification through `src/firebase/token.js`
- Protected routes via `PrivateRoute` context
- Role-based access (admin vs regular user)

#### Main Data Collections (Firestore)
- `users` - User accounts and profiles
- `materials` - Equipment/material inventory
- `viaturas` - Vehicle registry
- `movimentacoes` - Movement/custody tracking
- `categorias` - Material categories
- `aneis` - Ring management system

#### Context Architecture
- `MenuContext` - Navigation and menu state management, includes role-based menu rendering
- `CategoriaContext` - Category data management
- `ThemeContext` - Application theming
- `PrivateRoute` - Route protection wrapper

#### Key Components Pattern
- Search components (`UserSearch`, `MaterialSearch`, `ViaturaSearch`) - Autocomplete search functionality
- Dialog components in `src/dialogs/` - CRUD operations for each entity type
- Screen components in `src/screens/` - Main application pages with Firebase integration

### Environment Configuration

Required environment variables (create `.env` file):
```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

### Firebase Integration Points
- Database initialization: `src/firebase/db.js`
- Excel import/export: `src/firebase/xlsx.js`
- Data population utilities: `src/firebase/populate.js`

### Routing Structure
- `/` - Login screen
- `/first-access` - First access setup
- `/home` - Dashboard with statistics and recent movements
- `/usuario` - User management
- `/material` - Material management
- `/viaturas` - Vehicle management
- `/categoria` - Category management
- `/movimentacoes` - Movement tracking
- `/devolucoes` - Returns management
- `/aneis` - Ring management
- `/search` - Advanced search interface

### ESLint Configuration
- Configured for React with hooks
- React Refresh plugin for HMR
- Ignores unused variables starting with uppercase or underscore