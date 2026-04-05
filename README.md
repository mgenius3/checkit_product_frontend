# Content Explorer

A production-quality web application built with **Next.js 15 (App Router)**, **TypeScript**, and **Tailwind CSS**. This application serves as a comprehensive content browsing interface, fetching real-time data from the DummyJSON API.

## 🚀 Live Demo
- **URL**: [https://frontend-assessment-demo.pages.dev](https://frontend-assessment-demo.pages.dev) (Example placeholder)

## 🛠 Tech Stack
- **Framework**: Next.js 15.2+ (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS (Vanilla CSS & Modules approach)
- **Icons**: Lucide React
- **Testing**: Vitest + React Testing Library
- **Deployment**: Optimized for Cloudflare Workers/Pages

## 📋 Features & Implementation

### F-1: Listing Page
- **SSR/Streaming**: Leverages Server Components for data fetching with streaming Suspense boundaries for the product grid.
- **Responsive Layout**: A fluid grid system (1 Col Mobile, 2 Col Tablet, 4 Col Desktop) using Tailwind's flexible breakpoints.
- **Pagination**: URL-driven pagination (`skip` and `limit` params) for SEO-friendly and shareable navigation.

### F-2: Detail Page
- **Dynamic Routing**: Implemented using `src/app/products/[id]/page.tsx`.
- **Dynamic Metadata**: SEO optimized using `generateMetadata` to provide unique titles, descriptions, and OpenGraph tags per product.
- **Breadcrumbs**: Full hierarchical navigation for improved user orientation.

### F-3: Search & Search Filtering
- **Debounced Search**: 300ms debounce implemented using `lodash.debounce` and `useTransition` for a smooth, lag-free UI experience.
- **Category Filtering**: High-level category filtering synced directly with the browser URL.

### F-4: Loading & Error States
- **Skeleton Loaders**: Custom designed `loading.tsx` and component-level skeletons to minimize layout shift (CLS).
- **Error Boundaries**: Actionable `error.tsx` for catching runtime or network failures.
- **Empty States**: Dedicated UI for search results with zero matches.

---

## ⚡ Performance Optimizations

1. **Next/Image**: Optimized image loading with remote pattern configuration, specific `sizes`, and `priority` for above-the-fold content to achieve LCP < 2.5s.
2. **Next/Font**: Self-hosted Geist font via `next/font/google` for Zero CLS font loading.
3. **Data Caching**: Native `fetch` with `next: { revalidate: 3600 }` to balance data freshness and edge performance.
4. **Streaming**: Extracting data-heavy grid components into Suspense boundaries to allow the page shell to render instantly while data is being fetched.

---

## 🧪 Testing

Ran comprehensive unit tests for core modules:
- `ProductCard`: Verifies rendering accuracy and navigation link integrity.
- `Utils`: Ensures currency formatting and Tailwind class merging work as expected.

Run tests:
```bash
npm test
```

---

## 🌎 Cloudflare Deployment

Configured for **Cloudflare Pages** using `@cloudflare/next-on-pages`.
- Includes `wrangler.toml` for runtime configuration.
- Edge-compatible API health check at `/api/health`.

---

## 🏗 Setup & Installation

1. **Clone & Install**:
   ```bash
   git clone <repo-url>
   cd frontend
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

---

## ⚖️ Trade-offs & Engineering Decisions

- **URL-Driven State**: I chose to keep all search/filter/pagination state in the URL. While increasing complexity in parameter parsing, this ensures that every view is perfectly shareable and refreshing the page doesn't lose the user's progress.
- **DummyJSON API**: Selected for its reliability and lack of API key requirement, allowing for immediate reviewer evaluation.
- **Next.js 15 Choice**: Utilized the latest stable version to demonstrate competency with the newest App Router patterns (like promise-based `searchParams`).
