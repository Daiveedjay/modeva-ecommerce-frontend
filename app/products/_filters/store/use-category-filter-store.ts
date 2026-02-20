// stores/use-category-filter-store.ts
import { create } from "zustand";

export interface Category {
  id: string;
  name: string;
  subcategories?: Subcategory[];
}

// API subcategories include parentId
export interface Subcategory {
  id: string;
  name: string;
  parentId: string;
}

// Internal tracking includes parent info
export interface SelectedSubcategory {
  id: string;
  name: string;
  parentId: string;
  parentName: string;
}

interface CategoryFilterStore {
  selectedCategories: string[];
  selectedSubcategories: SelectedSubcategory[];
  isExpanded: boolean;

  // Actions
  toggleCategory: (categoryId: string, subcategories?: Subcategory[]) => void;
  toggleSubcategory: (
    subcategoryId: string,
    subcategoryName: string,
    parentId: string,
    parentName: string
  ) => void;
  clearCategories: () => void;
  toggleExpanded: () => void;
  initializeFromUrl: (
    categoryNames: string[],
    subcategoryIds: string[],
    categoriesData?: Category[]
  ) => void;

  // Getter to compute what to send to backend
  getFiltersForQuery: () => {
    categories: string[];
    subcategories: string[];
  };
}

export const useCategoryFilterStore = create<CategoryFilterStore>(
  (set, get) => ({
    selectedCategories: [],
    selectedSubcategories: [],
    isExpanded: true,

    toggleCategory: (categoryId, subcategories = []) =>
      set((state) => {
        const isSelected = state.selectedCategories.includes(categoryId);

        if (isSelected) {
          // When deselecting parent, remove ALL its subcategories
          const subcategoryIds = subcategories.map((sub) => sub.id);
          return {
            selectedCategories: state.selectedCategories.filter(
              (id) => id !== categoryId
            ),
            selectedSubcategories: state.selectedSubcategories.filter(
              (sub) => !subcategoryIds.includes(sub.id)
            ),
          };
        } else {
          // When selecting parent, check if it has selected subcategories
          const hasSelectedSubs = state.selectedSubcategories.some(
            (sub) => sub.parentId === categoryId
          );

          // If it has subcategories selected, remove them (parent takes over)
          return {
            selectedCategories: [...state.selectedCategories, categoryId],
            selectedSubcategories: hasSelectedSubs
              ? state.selectedSubcategories.filter(
                  (sub) => sub.parentId !== categoryId
                )
              : state.selectedSubcategories,
          };
        }
      }),

    toggleSubcategory: (subcategoryId, subcategoryName, parentId, parentName) =>
      set((state) => {
        const isSelected = state.selectedSubcategories.some(
          (sub) => sub.id === subcategoryId
        );

        if (isSelected) {
          // Remove subcategory
          const newSelectedSubcategories = state.selectedSubcategories.filter(
            (sub) => sub.id !== subcategoryId
          );

          // If this was the last subcategory for this parent, remove parent too
          const hasOtherSelectedSubs = newSelectedSubcategories.some(
            (sub) => sub.parentId === parentId
          );

          return {
            selectedSubcategories: newSelectedSubcategories,
            selectedCategories: hasOtherSelectedSubs
              ? state.selectedCategories
              : state.selectedCategories.filter((id) => id !== parentId),
          };
        } else {
          // Add subcategory with full details
          const newSubcategory: SelectedSubcategory = {
            id: subcategoryId,
            name: subcategoryName,
            parentId,
            parentName,
          };

          // Remove parent category from standalone selection (subcategory takes over)
          const updatedCategories = state.selectedCategories.filter(
            (id) => id !== parentId
          );

          return {
            selectedSubcategories: [
              ...state.selectedSubcategories,
              newSubcategory,
            ],
            selectedCategories: updatedCategories,
          };
        }
      }),

    clearCategories: () =>
      set({
        selectedCategories: [],
        selectedSubcategories: [],
      }),

    toggleExpanded: () => set((state) => ({ isExpanded: !state.isExpanded })),

    initializeFromUrl: (categoryNames, subcategoryIds, categoriesData = []) => {
      if (!categoriesData.length) {
        // If no category data yet, just store empty state
        set({
          selectedCategories: [],
          selectedSubcategories: [],
        });
        return;
      }

      // Build lookup maps
      const categoryByName = new Map<string, Category>();
      const subcategoryById = new Map<string, { 
        sub: Subcategory; 
        parentId: string; 
        parentName: string; 
      }>();

      categoriesData.forEach((cat) => {
        // Case-insensitive lookup for category names
        categoryByName.set(cat.name.toLowerCase(), cat);
        
        cat.subcategories?.forEach((sub) => {
          subcategoryById.set(sub.id, {
            sub,
            parentId: cat.id,
            parentName: cat.name,
          });
        });
      });

      // Match subcategories from URL by ID
      const selectedSubcategories: SelectedSubcategory[] = subcategoryIds
        .map((id) => {
          const info = subcategoryById.get(id);
          if (!info) return null;
          return {
            id: info.sub.id,
            name: info.sub.name,
            parentId: info.parentId,
            parentName: info.parentName,
          };
        })
        .filter((sub): sub is SelectedSubcategory => sub !== null);

      // Get parent IDs from selected subcategories
      const parentIdsFromSubs = new Set(
        selectedSubcategories.map((sub) => sub.parentId)
      );

      // Match categories from URL by name (only standalone ones)
      const selectedCategories: string[] = categoryNames
        .map((name) => {
          const cat = categoryByName.get(name.toLowerCase());
          return cat?.id;
        })
        .filter((id): id is string => id !== undefined && !parentIdsFromSubs.has(id));

      set({
        selectedCategories,
        selectedSubcategories,
      });
    },

    // Compute filters to send to backend (returns IDs for both)
    getFiltersForQuery: () => {
      const state = get();
      
      // Categories that don't have any selected subcategories (standalone selections)
      const standaloneCategories = state.selectedCategories.filter((catId) => {
        return !state.selectedSubcategories.some(
          (sub) => sub.parentId === catId
        );
      });

      return {
        categories: standaloneCategories,
        subcategories: state.selectedSubcategories.map((sub) => sub.id),
      };
    },
  })
);