# Project Structure

This project follows a well-organized structure to make development and maintenance easier.

## 📁 Directory Structure

```
StudyBuddy/
├── app/                          # Next.js app directory (pages, API routes)
│   ├── api/                      # API routes
│   ├── dashboard/                # Dashboard page
│   ├── landing/                  # Landing page
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── src/                          # Source code directory
│   ├── components/              # React components
│   │   ├── ui/                  # Reusable UI components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── ...
│   │   ├── layout/              # Layout components
│   │   │   └── nav-sidebar.tsx
│   │   ├── features/            # Feature-specific components
│   │   │   ├── ai-chat/
│   │   │   ├── calendar/
│   │   │   ├── flashcards/
│   │   │   ├── matchmaking/
│   │   │   └── earnings/
│   │   └── common/              # Common/shared components
│   │       └── theme-provider.tsx
│   ├── lib/                     # Library code
│   │   ├── auth/                # Authentication logic
│   │   ├── database/            # Database related code
│   │   ├── api/                 # API utilities
│   │   └── config/              # Configuration files
│   ├── hooks/                   # Custom React hooks
│   ├── styles/                  # Global styles
│   ├── types/                   # TypeScript type definitions
│   ├── constants/               # Application constants
│   ├── utils/                   # Utility functions
│   └── assets/                  # Static assets
│       ├── images/
│       ├── icons/
│       └── sounds/
├── public/                       # Public static files
├── .gitignore                   # Git ignore file
├── package.json                 # Dependencies and scripts
├── tsconfig.json                # TypeScript configuration
└── next.config.mjs              # Next.js configuration
```

## 📦 Import Paths

All imports use the `@/src/` prefix for consistency:

```typescript
// Components
import { Button } from '@/src/components/ui/button'
import { NavSidebar } from '@/src/components/layout/nav-sidebar'

// Lib
import { useAuth } from '@/src/lib/auth/auth-context'

// Hooks
import { useToast } from '@/src/hooks/use-toast'

// Utils
import { cn } from '@/src/utils/utils'
```

## 🎯 Component Organization

### UI Components (`src/components/ui/`)
- Reusable, generic UI components
- No business logic
- Can be used across the entire application

### Layout Components (`src/components/layout/`)
- Components that structure the application layout
- Navigation, sidebars, headers, etc.

### Feature Components (`src/components/features/`)
- Components specific to application features
- Organized by feature (ai-chat, calendar, etc.)

### Common Components (`src/components/common/`)
- Shared components that don't fit in other categories
- Theme providers, context providers, etc.

## 🔧 Library Structure

### Auth (`src/lib/auth/`)
- Authentication context and middleware
- User session management

### Database (`src/lib/database/`)
- Database connections and models
- Mock data and database utilities

### API (`src/lib/api/`)
- API utilities and helpers
- Service integrations

### Config (`src/lib/config/`)
- Configuration files
- Environment variables setup

## 📱 Assets Organization

### Images
- All image files (PNG, JPG, SVG, etc.)
- Organized by usage or feature

### Icons
- Icon files and icon components
- Custom and third-party icons

### Sounds
- Audio files for notifications, feedback, etc.

## 🎨 Styling

- Global styles in `src/styles/`
- Component-specific styles using CSS modules or Tailwind
- Theme configuration in `src/components/common/theme-provider.tsx`

## 📝 Type Definitions

TypeScript definitions are organized in `src/types/`:
- Global types used across the application
- Component prop interfaces
- API response types

## 🔗 Utilities

Common utility functions in `src/utils/`:
- Helper functions
- Formatters
- Validators

## 🚀 Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## 📋 Best Practices

1. **Keep components small and focused**
2. **Use proper TypeScript typing**
3. **Follow the established naming conventions**
4. **Organize imports by type (React, third-party, local)**
5. **Use absolute imports with `@/src/` prefix**
6. **Keep business logic out of UI components**
7. **Use feature-based organization for complex components**

## 🔄 Migration Notes

This structure was reorganized from the previous scattered layout. All import paths have been updated to use the new `@/src/` prefix structure for better maintainability and consistency.
