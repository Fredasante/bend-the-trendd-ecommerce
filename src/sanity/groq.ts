// 🛍️ All products (newest first)
export const allProductsQuery = `
  *[_type == "product"] | order(createdAt desc) {
    _id,
    name,
    slug,
    price,
    discountPrice,
    category,
    description,
    gender,
    status,
    isFeatured,
    "mainImageUrl": mainImage.asset->url
  }
`;

// 🏷️ Single product (by slug)
export const productBySlugQuery = `
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    price,
    discountPrice,
    category,
    gender,
    sizes,
    colors,
    description,
    status,
    isFeatured,
    createdAt,
    "mainImageUrl": mainImage.asset->url,
    gallery[] {
      "imageUrl": asset->url
    }
  }
`;

// 👕 Products by Category - ADDED DESCRIPTION
export const productsByCategoryQuery = `
  *[_type == "product" && category == $category && status == "available"] | order(createdAt desc) {
    _id,
    name,
    slug,
    price,
    discountPrice,
    category,
    description,
    isFeatured,
    "mainImageUrl": mainImage.asset->url
  }
`;

// 👩 Women - ADDED DESCRIPTION
export const womenProductsQuery = `
  *[_type == "product" && gender == "women" && status == "available"] | order(createdAt desc) {
    _id,
    name,
    slug,
    price,
    discountPrice,
    category,
    description,
    "mainImageUrl": mainImage.asset->url
  }
`;

// 👨 Men - ADDED DESCRIPTION
export const menProductsQuery = `
  *[_type == "product" && gender == "men" && status == "available"] | order(createdAt desc) {
    _id,
    name,
    slug,
    price,
    discountPrice,
    category,
    description,
    "mainImageUrl": mainImage.asset->url
  }
`;

// 🌟 Featured - ADDED DESCRIPTION
export const featuredProductsQuery = `
  *[_type == "product" && isFeatured == true && status == "available"] | order(createdAt desc) {
    _id,
    name,
    slug,
    price,
    discountPrice,
    category,
    description,
    "mainImageUrl": mainImage.asset->url
  }
`;

// ✅ Fetch the 8 most recent available products (New Arrivals) - ADDED DESCRIPTION
export const newArrivalsQuery = `
  *[_type == "product" && status == "available"] | order(_createdAt desc)[0...8]{
    _id,
    name,
    slug,
    price,
    discountPrice,
    category,
    description,
    "mainImageUrl": mainImage.asset->url
  }
`;

// 🔍 Search by name - ADDED DESCRIPTION
export const searchProductsQuery = `
  *[_type == "product" && name match $search + "*"] | order(createdAt desc) {
    _id,
    name,
    slug,
    price,
    discountPrice,
    category,
    description,
    "mainImageUrl": mainImage.asset->url
  }
`;

// 🧭 Paginated products - ADDED DESCRIPTION
export const paginatedProductsQuery = `
  *[_type == "product"] | order(createdAt desc) [$start...$end] {
    _id,
    name,
    slug,
    price,
    discountPrice,
    category,
    gender,
    status,
    isFeatured,
    description,
    "mainImageUrl": mainImage.asset->url
  }
`;

// Count products with optional category filter
export const productCountQuery = `count(*[_type == "product" $categoryFilter])`;

// Categories with product count
export const categoriesWithCountQuery = `
  *[_type == "product"] {
    category
  } | {
    "name": category,
    "products": count(*[_type == "product" && category == ^.category])
  }
`;

// Genders with product count
export const gendersWithCountQuery = `
  *[_type == "product"] {
    gender
  } | {
    "name": gender,
    "products": count(*[_type == "product" && gender == ^.gender])
  }
`;

export const sizesWithCountQuery = `
  *[_type == "product" && defined(sizes)] {
    sizes
  }
`;

export const colorsWithCountQuery = `
  *[_type == "product" && defined(colors)] {
    colors
  }
`;

// 🔍 BONUS: Quick test query to verify description is working
export const testDescriptionQuery = `
  *[_type == "product"][0] {
    _id,
    name,
    description,
    "hasDescription": defined(description),
    "descriptionLength": length(description)
  }
`;
