export type Product = {
  _id: string;
  name: string;
  slug: { current: string };
  price: number;
  discountPrice?: number;
  category: string;
  gender?: "men" | "women";
  status?: "available" | "unavailable" | string;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  mainImageUrl?: string;
  gallery?: { imageUrl: string }[];
  description?: string;
  sizes?: string[];
  colors?: string[];
  createdAt?: string;
};
