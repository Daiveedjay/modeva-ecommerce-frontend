export interface ProductResponse {
  name: string;
  id: string;
  image: string;
  price: number;
}
export interface ProductFilters {
  page?: number;
  limit?: number;

  q?: string;

  sizes?: string[]; // ?size=XS&size=S
  categories?: string[]; // ?category=id&category=id
  subcategories?: string[]; // ?subcategory=id&subcategory=id
  style?: string; // Add this line

  availability?: "in_stock" | "out_of_stock" | "inStock" | "outOfStock";
  colors?: string[]; // ?color=red&color=blue

  minPrice?: number;
  maxPrice?: number;

  sortBy?: "price" | "name" | "newest" | "popular";
  sortOrder?: "asc" | "desc";
}

// types/product.ts
export interface Variant {
  type: string;
  options: string[];
}

export interface InventoryItem {
  combo: string[];
  quantity: number;
  variant_name: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  inventory: InventoryItem[];
  media: {
    primary: { url: string };
    other: Array<{ url: string; order: number }>;
  };
  variants: Variant[];
  created_at: string;
  updated_at: string;
}

export type VariantSelection = Record<string, string | null>;

// Utility to get available options based on current selections
export function getAvailableOptions(
  variantType: string,
  currentSelections: VariantSelection,
  inventory: InventoryItem[],
  variants: Variant[],
): string[] {
  const variantIndex = variants.findIndex((v) => v.type === variantType);
  if (variantIndex === -1) return [];

  const baseOptions = variants[variantIndex].options;

  // If this is the first variant or no selections made, return all options
  if (Object.keys(currentSelections).length === 0) {
    return baseOptions;
  }

  // Filter options based on inventory availability
  return baseOptions.filter((option) => {
    // Build a test selection with this option
    const testSelection = { ...currentSelections, [variantType]: option };

    // Check if any inventory item matches this combination
    return inventory.some((item) => {
      // Check if all selected variants match this inventory item
      return Object.entries(testSelection).every(([type, value]) => {
        if (!value) return true; // Skip unselected variants

        const typeIndex = variants.findIndex((v) => v.type === type);
        if (typeIndex === -1) return true;

        return item.combo[typeIndex] === value;
      });
    });
  });
}

// Check if a specific combination is in stock
export function isInStock(
  selections: VariantSelection,
  inventory: InventoryItem[],
  variants: Variant[],
): { inStock: boolean; quantity: number } {
  // Check if all variants are selected
  const allSelected = variants.every((v) => selections[v.type]);
  if (!allSelected) {
    return { inStock: false, quantity: 0 };
  }

  // Find matching inventory item
  const inventoryItem = inventory.find((item) => {
    return variants.every((variant, index) => {
      return item.combo[index] === selections[variant.type];
    });
  });

  if (inventoryItem) {
    return {
      inStock: inventoryItem.quantity > 0,
      quantity: inventoryItem.quantity,
    };
  }

  return { inStock: false, quantity: 0 };
}

// Get color hex codes (you can expand this)
export const COLOR_MAP: Record<string, string> = {
  Black: "#000000",
  White: "#FFFFFF",
  Gray: "#808080",
  Grey: "#808080",
  Navy: "#001F3F",
  Red: "#FF0000",
  Blue: "#0000FF",
  Green: "#00A36C",
  Yellow: "#FFFF00",
  Pink: "#FFC0CB",
  Purple: "#800080",
  Brown: "#A52A2A",
  Beige: "#F5F5DC",
  Cream: "#FFFDD0",
  Olive: "#808000",
  Maroon: "#800000",
  Teal: "#008080",
  Orange: "#FFA500",
};

export function getColorHex(colorName: string): string {
  return COLOR_MAP[colorName] || "#CCCCCC";
}
