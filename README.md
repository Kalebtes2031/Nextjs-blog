# Blog | Professional Engineering & Architectural Insights

A production-grade Next.js application designed for professional engineering consultants and architectural leads. This platform showcases advanced web patterns, robust state management with Redux-Saga, and a high-fidelity, dual-themed user interface.

##  Key Features

- ** Professional Architecture**: Layered structure with dedicated services, selectors, and custom hooks for maximum maintainability.
- ** High-Performance Caching**: Custom TTL-based caching layer for offline resilience and instant page loads.
- ** Advanced State Management**: Robust CRUD operations, real-time search, and session control powered by Redux-Saga.
- ** Enterprise-Grade Auth**: Secure authentication flow with persistence, protected routes, and a **5-minute auto-logout** safety mechanism.
- ** Adaptive Interface**: Premium dark/light mode transition with a polished, minimalist design language.
- ** SEO Optimized**: Dynamic metadata, OpenGraph support, and JSON-LD structured data for every insight.
- ** Community Discussion**: Authenticated comment section with optimistic UI patterns.

##  Technology Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **State**: [Redux Toolkit](https://redux-toolkit.js.org/) & [Redux-Saga](https://redux-saga.js.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Feedback**: [React Hot Toast](https://react-hot-toast.com/)
- **Theming**: [Next Themes](https://github.com/pacocoursey/next-themes)
- **API**: [DummyJSON](https://dummyjson.com/)

##  Project Structure

```text
/
├── app/                  # Next.js App Router (Pages, Layouts, Errors)
├── components/           # UI Components
│   ├── auth/             # LoginForm, SignupForm (Module-specific)
│   ├── blog/             # PostList, PostCard, PostDetail, Comments
│   └── common/           # Reusable components (Button, Navbar, Skeletons)
├── store/                # Redux State Management
│   ├── slices/           # Redux Slices (Actions & Reducers)
│   ├── sagas/            # Redux Sagas (Side Effects & Async)
│   └── selectors/        # Dedicated Selectors for State Access
├── hooks/                # Custom React Hooks (useAuth, useLocalStorage)
├── lib/                  # Service Layer (API Abstractions)
├── utils/                # Utilities (Helpers, Constants, Validators)
└── public/               # Static Assets
```

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or pnpm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

##  Standards & Best Practices

- **Strict Type Safety**: Full TypeScript integration with no `any` types.
- **Clean Code**: SOLID principles applied to the service and state layers.
- **Performance**: Memoized selectors and components to minimize re-renders.
- **Resilience**: Global error boundaries and customized skeleton loaders for all async states.

---


