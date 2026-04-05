import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { ProductCard } from "../components/ProductCard";
import { Product } from "../types/product";

const mockProduct: Product = {
  id: 1,
  title: "Test Product",
  description: "Test Description",
  price: 99.99,
  discountPercentage: 10,
  rating: 4.5,
  stock: 50,
  brand: "Test Brand",
  category: "test-category",
  thumbnail: "https://example.com/image.jpg",
  images: ["https://example.com/image.jpg"],
};

describe("ProductCard", () => {
  it("renders product title and price correctly", () => {
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$99.99")).toBeInTheDocument();
  });

  it("renders the correct category", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText("test category")).toBeInTheDocument();
  });

  it("has a link to the correct product page", () => {
    render(<ProductCard product={mockProduct} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/products/1");
  });
});
