# Content Explorer

A production-quality web application built with **Next.js 15 (App Router)**, **TypeScript**, and **Tailwind CSS**. This application is designed as a high-performance content browsing interface, fetching data from the DummyJSON API and optimized for global edge delivery.

## 🚀 Live Demo
- **URL**: [https://e6721d78.content-explorer.pages.dev](https://e6721d78.content-explorer.pages.dev) 

## 🛠 Tech Stack
- **Framework**: Next.js 15.2+ (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS 4+
- **Icons**: Lucide React
- **Testing**: Vitest + React Testing Library (ESM Optimized)
- **Deployment**: Static HTML Export (`output: export`) for Cloudflare Pages

## 📋 Features & Implementation

### F-1: Listing Page & Hybrid Rendering
- **Static First**: The home page is pre-rendered at build time with the first 20 products for an instant "First Contentful Paint."
*   **ProductExplorer**: A custom client-side grid component that takes over after the initial load to handle real-time search, category filters, and pagination without full page reloads.
- **Responsive Layout**: A fluid grid system (1 Col Mobile, 2 Col Tablet, 4 Col Desktop) using Tailwind 4's new engine.

### F-2: Detail Page
- **SSG (Static Site Generation)**: Currently pre-renders the top **100 products** at build time using `generateStaticParams`.
- **Dynamic SEO**: Each product page features unique metadata (titles, descriptions, and OpenGraph tags) generated during the build for maximum SEO impact.
- **Breadcrumbs**: Full hierarchical navigation to help users maintain context.

### F-3: Search & Search Filtering
- **URL-Driven State**: All search, category, and pagination states are synced with the browser URL. You can reload or share any filtered view, and it will just work.
- **Debounced Search**: 300ms debounce implemented to prevent API over-fetching and ensure the UI stays snappy.

### F-4: Loading & Architecture
- **Skeleton Loaders**: Custom designed component-level skeletons to minimize layout shift (CLS).
- **ESM-First**: The project has been modernized to use **Native ESM (`type: module`)**, ensuring seamless compatibility with the latest testing and build tools.

## ⚡ Performance & Engineering Decisions

1. **Static Export**: I chose `output: 'export'` to allow deployment to any static host (Cloudflare Pages, S3, etc.). This significantly reduces hosting costs and improves security while keeping the site blazing fast.
2. **Next/Image Optimization**: Since static exports don't support the default Next.js image server, I've enabled `unoptimized: true` alongside `remotePatterns` to ensure images load correctly across all environments.
3. **Trailing Slashes**: Configured `trailingSlash: true` in `next.config.ts` to ensure clean URLs (no `.html` extensions) in production.
4. **Vitest & ESM**: Resolved common Testing Library resolution issues by aligning the project's module system, specifically fixing the "missing screen export" type errors.

## 🧪 Testing

Run the suite using Vitest:
```bash
npm test
```
The test suite covers:
- `ProductCard`: Rendering accuracy and navigation link integrity.
- `Utils`: Currency formatting and Tailwind class merging.

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

3. **Build & Export**:
   ```bash
   npm run build
   # Outputs a static 'out' directory
   ```

## 🌎 Cloudflare Deployment

To deploy the static export to Cloudflare Pages:
```bash
npx wrangler pages deploy out
```
**Dashboard Settings**:
- **Framework Preset**: `Next.js (Static)`
- **Build command**: `npm run build`
- **Build output directory**: `out`
