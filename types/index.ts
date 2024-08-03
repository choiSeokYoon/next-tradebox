

export interface CategoryType {
    id: number;
    name: string;
    img: string;
    category: string | null;
  }

  export interface CategoryProps {
    selectedCategory: string | null;
    onCategorySelect: (category: string | null) => void;
  }