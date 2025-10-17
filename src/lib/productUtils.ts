// lib/productUtils.ts or utils/productUtils.ts
import { client } from "@/sanity/client";

interface FetchProductsParams {
  page: number;
  perPage: number;
  category?: string;
  gender?: string;
}

export const fetchPaginatedProducts = async ({
  page,
  perPage,
  category,
  gender, // ✅ Make sure to destructure this
}: FetchProductsParams) => {
  const start = (page - 1) * perPage;
  const end = start + perPage;

  // Build filters dynamically
  const filters: string[] = [];
  if (category) filters.push(`category == "${category}"`);
  if (gender) filters.push(`gender == "${gender}"`);

  const filterString = filters.length > 0 ? `&& ${filters.join(" && ")}` : "";

  const productsQuery = `
    *[_type == "product" ${filterString}] | order(_createdAt desc) [$start...$end] {
      _id,
      name,
      slug,
      price,
      discountPrice,
      category,
      gender,
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

export const fetchCategories = async () => {
  const query = `
    *[_type == "product"] {
      category
    } | {
      "name": category,
      "products": count(*[_type == "product" && category == ^.category])
    }
  `;

  try {
    const data = await client.fetch(query);
    // Remove duplicates
    const unique = Array.from(
      new Map(data.map((c: any) => [c.name, c])).values()
    );
    return unique;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const fetchGenders = async () => {
  const query = `
    *[_type == "product"] {
      gender
    } | {
      "name": gender,
      "products": count(*[_type == "product" && gender == ^.gender])
    }
  `;

  try {
    const data = await client.fetch(query);
    // Remove duplicates and capitalize names
    const unique = Array.from(
      new Map(data.map((g: any) => [g.name, g])).values()
    ).map((item: any) => ({
      ...item,
      name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
    }));
    return unique;
  } catch (error) {
    console.error("Error fetching genders:", error); // ✅ Fixed typo here too
    return [];
  }
};
