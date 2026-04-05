import { Product, ProductResponse, Category } from "@/types/product";

const BASE_URL = "https://dummyjson.com";

/**
 * Common fetch utility with error handling
 */
async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || `API error: ${res.status}`);
    }

    return res.json() as Promise<T>;
  } catch (err) {
    console.error(`Fetch failed for ${url}:`, err);
    throw err;
  }
}

/**
 * Fetch products with support for search, category, and pagination
 */
export async function getProducts({
  limit = 20,
  skip = 0,
  category,
  search,
}: {
  limit?: number;
  skip?: number;
  category?: string;
  search?: string;
} = {}): Promise<ProductResponse> {
  let endpoint = "/products";

  if (search) {
    endpoint = `/products/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`;
  } else if (category && category !== "all") {
    endpoint = `/products/category/${category}?limit=${limit}&skip=${skip}`;
  } else {
    endpoint = `/products?limit=${limit}&skip=${skip}`;
  }

  // Next.js cache options: Revalidate every hour for fresh data
  return fetchApi<ProductResponse>(endpoint, {
    next: { revalidate: 3600 },
  });
}

/**
 * Fetch a single product by ID
 */
export async function getProductById(id: string | number): Promise<Product> {
  return fetchApi<Product>(`/products/${id}`, {
    next: { revalidate: 3600 },
  });
}

/**
 * Fetch all available categories
 */
export async function getCategories(): Promise<Category[]> {
  // The response is an array of strings or objects depending on the API version
  // For DummyJSON, /products/categories returns an array of strings
  return fetchApi<Category[]>("/products/categories", {
    next: { revalidate: 86400 }, // Categories rarely change
  });
}
