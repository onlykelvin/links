export interface Link {
  name: string;
  link: string;
  short_description: string;
  keywords: string[];
}

export interface Category {
  name: string;
  links: Link[];
}

export interface LinkWithCategory extends Link {
  category: string;
}