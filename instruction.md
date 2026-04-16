

Pagination component
SEO & Meta Tags:
Use Next.js Metadata API for dynamic page titles and descriptions
Implement Open Graph tags for social sharing
Add JSON-LD structured data for blog posts
Local Storage Caching:
As users navigate through blog pages, persist all fetched content (blog posts, user data, etc.) to browser local storage
The application should remain fully functional offline for any pages that have been previously visited and cached
Implement a cache invalidation strategy (e.g., 1-hour expiry)
Step 2: Redux Toolkit & Redux-Saga Integration
State Management
Set up the Redux store using Redux Toolkit
Create slices for:
Auth Slice - User authentication state (login, logout, token management)
Posts Slice - Blog posts data (list, single post, loading states)
Comments Slice - Comments for blog posts
UI Slice - Global UI state (modals, notifications, theme)
Side Effects with Redux-Saga
Write sagas for handling API requests:
Auth Saga:
Login user
Logout user
Persist token to localStorage
Posts Saga:
Fetch all posts (with pagination)
Fetch single post by ID
Create new post (authenticated users only)
Update existing post
Delete post
Comments Saga:
Fetch comments for a post
Add new comment
Use saga effects: takeLatest, call, put, select, fork
Implement proper error handling in sagas
Show loading, success, and error states in the UI
Redux DevTools
Integrate Redux DevTools for debugging
Ensure all actions and state changes are traceable

Step 3: Advanced Tasks
Authentication Flow
Implement login/signup forms with proper validation
Store JWT token in localStorage upon successful login
Add token to API requests automatically using Axios interceptors
Implement auto-logout on token expiration
Protect routes using Next.js middleware (App Router) or HOC (Pages Router)
Redirect to login if not authenticated
Display user info in the navbar when logged in
Persist the authentication state across page refreshes
Blog Management (Admin Dashboard)
Just display hello admin
Performance Optimization
Implement Dynamic Imports with next/dynamic for code-splitting
Use React.lazy() and Suspense where appropriate
Use memoisation (React.memo, useMemo, useCallback) where appropriate
Optimise Redux selectors with Reselect
Leverage Next.js Image Optimisation with next/image
Implement Streaming SSR for faster page loads (App Router)
Use ISR (Incremental Static Regeneration) for blog posts (optional)
Extra Features (Bonus Points)
Search functionality for blog posts
Dark mode toggle with theme persistence (use next-themes)
Toast notifications for success/error messages
Skeleton loaders for better UX
Responsive design for mobile, tablet, desktop
Add user profile page showing their posts
Implement infinite scroll instead of pagination
Next.js Specific:
Use Server Components where appropriate (App Router)
Implement proper loading.tsx and error.tsx files
Add not-found.tsx for 404 pages
Use next/image for optimized images
Implement proper caching strategies with revalidate

Data Sources
You will NOT create any backend APIs. Instead, integrate with DummyJSON APIs:
Authentication:
API Documentation: https://dummyjson.com/docs/auth
Login Endpoint: POST https://dummyjson.com/auth/login
Get Current User: GET https://dummyjson.com/auth/me
Use these test credentials:
Username: emilys
Password: emilyspass
Blog Posts:
API Documentation: https://dummyjson.com/docs/posts
Get All Posts: GET https://dummyjson.com/posts
Get Single Post: GET https://dummyjson.com/posts/{id}
Search Posts: GET https://dummyjson.com/posts/search?q={query}
Get Posts by User: GET https://dummyjson.com/posts/user/{userId}
Create Post: POST https://dummyjson.com/posts/add
Update Post: PUT https://dummyjson.com/posts/{id}
Delete Post: DELETE https://dummyjson.com/posts/{id}
Comments:
Get Comments for Post: GET https://dummyjson.com/posts/{id}/comments
Get All Comments: GET https://dummyjson.com/comments

🛠️ Technical & Design Expectations
Code Quality:
Modular & Reusable Components: Components should be reusable and clearly separated
Separation of Concerns: Maintain separate folders for components, pages, store, services, and utils
DRY Principle: Avoid repetition - abstract and reuse logic wherever applicable
Proper Naming Conventions: Use clear, descriptive names for files, components, and functions
Clean Code: Proper indentation, comments for complex logic, no console.logs in production
Error Handling & UX:
Show loading indicators when fetching data
Display user-friendly error messages
Handle edge cases (empty states, no results, network errors)
Form validation with helpful error messages
Graceful degradation when API is unavailable
Git Practices:
Meaningful commit messages
Regular commits showing your progress
Clean commit history (no unnecessary merge commits)


📁 Recommended Project Structure

my-nextjs-blog/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                    # Home page
│   ├── about/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── blog/
│   │   ├── page.tsx                # Blog list
│   │   └── [id]/
│   │       └── page.tsx            # Blog detail
│   ├── login/
│   │   └── page.tsx
│   ├── signup/
│   │   └── page.tsx
│   ├── dashboard/
│   │   └── page.tsx                # Protected route
│   ├── api/                        # Optional API routes (not needed for this project)
│   ├── globals.css
│   └── providers.tsx               # Redux Provider wrapper
├── components/
│   ├── common/
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Loader/
│   │   ├── Navbar/
│   │   └── ErrorMessage/
│   ├── blog/
│   │   ├── PostCard/
│   │   ├── PostList/
│   │   ├── PostDetail/
│   │   └── CommentSection/
│   └── auth/
│       ├── LoginForm/
│       └── SignupForm/
├── store/
│   ├── index.ts                    # Store configuration
│   ├── slices/
│   │   ├── authSlice.ts
│   │   ├── postsSlice.ts
│   │   ├── commentsSlice.ts
│   │   └── uiSlice.ts
│   ├── sagas/
│   │   ├── authSaga.ts
│   │   ├── postsSaga.ts
│   │   ├── commentsSaga.ts
│   │   └── index.ts                # Root saga
│   └── selectors/
│       ├── authSelectors.ts
│       └── postsSelectors.ts
├── lib/
│   ├── api.ts                      # Axios instance with interceptors
│   ├── authService.ts
│   ├── postsService.ts
│   └── commentsService.ts
├── utils/
│   ├── constants.ts
│   ├── helpers.ts
│   └── validators.ts
├── hooks/
│   ├── useAuth.ts
│   └── useLocalStorage.ts
├── middleware.ts                   # Next.js middleware for route protection
├── public/
│   └── images/
├── .env.local
├── .gitignore
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md



🎯 Submission Guidelines
💬 How to Submit
Create a copy of this Google Doc: 
Add your details at the top:
Full Name
Phone Number
Email Address
LinkedIn Profile (optional)
GitHub Username
Provide a point-by-point reply addressing:
✅ What you have implemented
🚧 What you partially implemented (with explanation)
❌ What you couldn't implement (with reasons)
Include the following:
GitHub Repository Link (make sure it's private, will ask access if needed)
Live Demo Link deployed on:
Vercel (recommended)
Netlify
GitHub Pages
Any other hosting platform
Add to your README.md:
Project description
Setup instructions (how to install and run locally)
Technologies used
Features implemented (checklist format)
Screenshots or GIFs demonstrating key features
Any challenges you faced and how you solved them
Future improvements you would make
Share the Google Doc with "Commenter" permission to: info@thevirtualcto.in, thevirtualcto.in@gmail.com 


💬 A Note From Me (Read This Before You Begin)
⚡ I understand this assignment may look a bit overwhelming at first glance—especially if you're used to building simple CRUD applications or following tutorials. But here's the point:
The real difference between tutorial projects and production-grade applications lies in architecture, state management, and scalability.
This assignment has been carefully crafted to mirror real-world expectations. Through it, you'll learn what it takes to work on live projects—just like you would during the internship.
Important Points:
Don't worry about perfection - Focus on learning and doing your best
You don't need to implement EVERYTHING - But try to cover the core requirements (Step 1 & Step 2)
Quality over quantity - A well-implemented core feature is better than many half-done features
Ask questions if you're stuck - But try to Google and debug first, or take help of any AI
Take your time - 2-3 days is recommended, but understanding is more important than speed
Enjoy the process - This is a learning opportunity
Tips for Success:
Choose your routing approach first (App Router vs Pages Router)
Set up Next.js project with TypeScript (recommended)
Configure the Redux store with proper TypeScript types
Implement Redux-Saga for API calls
Build the UI components with Tailwind CSS
Add authentication flow with middleware/HOC
Implement SSR/SSG for blog pages
Polish the UI and add advanced features
Test thoroughly before submission
Deploy to Vercel (built-in Next.js support)
