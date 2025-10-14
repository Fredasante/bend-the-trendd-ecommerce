// 🛍️ All products (newest first)
export const allProductsQuery = `
  *[_type == "product"] | order(createdAt desc) {
    _id,
    name,
    slug,
    price,
    discountPrice,
    mainImage,
    category,
    gender,
    status,
    isFeatured,
    isNewArrival,
  }
`;

// 🏷️ Single product (by slug)
export const productBySlugQuery = `
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    mainImage,
    gallery,
    price,
    discountPrice,
    category,
    gender,
    sizes,
    colors,
    description,
    status,
    isFeatured,
    isNewArrival,
    createdAt
  }
`;

// 👕 Products by Category (e.g. "clothing", "sneakers", "slippers")
export const productsByCategoryQuery = `
  *[_type == "product" && category == $category && status == "available"] | order(createdAt desc) {
    _id,
    name,
    slug,
    mainImage,
    price,
    discountPrice,
    category,
    isFeatured,
    isNewArrival,
  }
`;

// 👩 Products for Women (Available only)
export const womenProductsQuery = `
  *[_type == "product" && gender == "women" && status == "available"] | order(createdAt desc) {
    _id,
    name,
    slug,
    mainImage,
    price,
    category,
    discountPrice
  }
`;

// 👨 Products for Men (Available only)
export const menProductsQuery = `
  *[_type == "product" && gender == "men" && status == "available"] | order(createdAt desc) {
    _id,
    name,
    slug,
    mainImage,
    price,
    category,
    discountPrice
  }
`;

// 🌟 Featured products (e.g. for homepage section)
export const featuredProductsQuery = `
  *[_type == "product" && isFeatured == true && status == "available"] | order(createdAt desc) {
    _id,
    name,
    slug,
    mainImage,
    price,
    discountPrice,
    category
  }
`;

// 🆕 New arrivals
export const newArrivalsQuery = `
  *[_type == "product" && isNewArrival == true && status == "available"] | order(createdAt desc) {
    _id,
    name,
    slug,
    mainImage,
    price,
    discountPrice,
    category
  }
`;

// 🔍 Search by name (case insensitive)
export const searchProductsQuery = `
  *[_type == "product" && name match $search + "*"] | order(createdAt desc) {
    _id,
    name,
    slug,
    mainImage,
    price,
    discountPrice,
    category
  }
`;

// 🧭 Paginated products
export const paginatedProductsQuery = `
  *[_type == "product"] | order(createdAt desc) [$start...$end] {
    _id,
    name,
    slug,
    mainImage,
    price,
    discountPrice,
    category,
    gender,
    status,
    isFeatured,
    isNewArrival
  }
`;
