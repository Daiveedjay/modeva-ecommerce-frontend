export interface Category {
  id: string;
  name: string;
  // If backend later adds subcategories, you can extend this
  subcategories?: { id: string; name: string }[];
}

export interface Availability {
  inStock: number;
  outOfStock: number;
}

export interface PriceRange {
  min: number;
  max: number;
}
