import { client } from "@/sanity/client";

interface FetchProductsParams {
  page: number;
  perPage: number;
  category?: string;
  gender?: string;
  size?: string;
  color?: string;
}

export const fetchPaginatedProducts = async ({
  page,
  perPage,
  category,
  gender,
  size,
  color,
}: FetchProductsParams) => {
  const start = (page - 1) * perPage;
  const end = start + perPage;

  // Build filter for available products
  const filters: string[] = [];

  if (category) filters.push(`category == "${category}"`);
  if (gender) filters.push(`gender == "${gender}"`);
  if (size) filters.push(`"${size}" in sizes`);
  if (color) filters.push(`"${color}" in colors`);

  const filterString = filters.length > 0 ? `&& ${filters.join(" && ")}` : "";

  // products query
  const productsQuery = `
    *[_type == "product" ${filterString}] | order(_createdAt desc) [$start...$end] {
      _id,
      name,
      slug,
      price,
      discountPrice,
      description,
      category,
      gender,
      stockQuantity,
      sizes,
      status,
      isFeatured,
      "mainImageUrl": mainImage.asset->url
    }
  `;

  const countQuery = `count(*[_type == "product" ${filterString}])`;

  try {
    const [products, totalCount] = await Promise.all([
      client.fetch(productsQuery, { start, end }),
      client.fetch(countQuery),
    ]);

    return { products, totalCount };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [], totalCount: 0 };
  }
};

// Fixed fetchCategories - simpler approach
export const fetchCategories = async () => {
  const query = `
    *[_type == "product" && defined(category)] {
      category
    }
  `;

  try {
    const data = await client.fetch(query);
    console.log("Raw category data from Sanity:", data);

    if (!data || data.length === 0) {
      console.log("No products found in Sanity");
      return [];
    }

    // Count products per category
    const categoryMap = new Map<string, number>();

    data.forEach((product: any) => {
      const category = product.category;
      if (category) {
        categoryMap.set(category, (categoryMap.get(category) || 0) + 1);
      }
    });

    console.log("Category map:", categoryMap);

    // Convert to array format
    const categories = Array.from(categoryMap.entries()).map(
      ([name, count]) => ({
        name,
        products: count,
      })
    );

    console.log("Final categories:", categories);
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

// Fixed fetchGenders
export const fetchGenders = async () => {
  const query = `
    *[_type == "product" && defined(gender)] {
      gender
    }
  `;

  try {
    const data = await client.fetch(query);
    console.log("Raw gender data from Sanity:", data);

    if (!data || data.length === 0) {
      console.log("No products found in Sanity");
      return [];
    }

    // Count products per gender
    const genderMap = new Map<string, number>();

    data.forEach((product: any) => {
      const gender = product.gender;
      if (gender) {
        genderMap.set(gender, (genderMap.get(gender) || 0) + 1);
      }
    });

    // Convert to array format with capitalized names
    const genders = Array.from(genderMap.entries()).map(([name, count]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      products: count,
    }));

    return genders;
  } catch (error) {
    console.error("Error fetching genders:", error);
    return [];
  }
};

// sizes - only count products with stock
export const fetchSizes = async () => {
  const query = `
    *[_type == "product" && defined(sizes) && stockQuantity > 0] {
      sizes
    }
  `;

  try {
    const data = await client.fetch(query);

    if (!data || data.length === 0) {
      return [];
    }

    // Flatten and get unique sizes
    const allSizes = data.flatMap((item: any) => item.sizes || []);
    const uniqueSizes = Array.from(new Set(allSizes)).sort(
      (a, b) => Number(a) - Number(b)
    );

    // Return with counts
    return uniqueSizes.map((size: string) => ({
      name: size,
      products: data.filter((item: any) => item.sizes?.includes(size)).length,
    }));
  } catch (error) {
    console.error("Error fetching sizes:", error);
    return [];
  }
};

// colors - only count products with stock
export const fetchColors = async () => {
  const query = `
    *[_type == "product" && defined(colors) && stockQuantity > 0] {
      colors
    }
  `;

  try {
    const data = await client.fetch(query);

    if (!data || data.length === 0) {
      return [];
    }

    // Flatten and get unique colors
    const allColors = data.flatMap((item: any) => item.colors || []);
    const uniqueColors = Array.from(new Set(allColors)).sort();

    // Return with counts
    return uniqueColors.map((color: string) => ({
      name: color,
      products: data.filter((item: any) => item.colors?.includes(color)).length,
    }));
  } catch (error) {
    console.error("Error fetching colors:", error);
    return [];
  }
};
