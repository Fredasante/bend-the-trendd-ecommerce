"use client";
import React, { useState, useEffect } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import CustomSelect from "./CustomSelect";
import CategoryDropdown from "./CategoryDropdown";
import GenderDropdown from "./GenderDropdown";
import SizeDropdown from "./SizeDropdown";
import ColorsDropdwon from "./ColorsDropdwon";
import PriceDropdown from "./PriceDropdown";
import SingleGridItem from "../Shop/SingleGridItem";
import SingleListItem from "../Shop/SingleListItem";
import { ListBulletIcon, TableCellsIcon } from "@heroicons/react/24/solid";
import { client } from "@/sanity/client";
import { paginatedProductsQuery } from "@/sanity/groq";

const ShopWithSidebar = () => {
  const [productStyle, setProductStyle] = useState("grid");
  const [productSidebar, setProductSidebar] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(9);
  const [totalCount, setTotalCount] = useState(0);

  const handleStickyMenu = () => {
    setStickyMenu(window.scrollY >= 80);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);

    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".sidebar-content")) {
        setProductSidebar(false);
      }
    };

    if (productSidebar) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleStickyMenu);
    };
  }, [productSidebar]);

  const options = [
    { label: "Latest Products", value: "1" },
    { label: "Old Products", value: "2" },
  ];

  // 🧠 Fetch products from Sanity with pagination
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const start = (currentPage - 1) * perPage;
      const end = start + perPage;

      try {
        const data = await client.fetch(paginatedProductsQuery, { start, end });
        setProducts(data);

        const count = await client.fetch(`count(*[_type == "product"])`);
        setTotalCount(count);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, perPage]);

  const totalPages = Math.ceil(totalCount / perPage) || 1;

  return (
    <>
      <Breadcrumb title={"Explore All Products"} pages={["shop"]} />

      <section className="overflow-hidden relative pb-20 pt-5 lg:pt-12 bg-[#f3f4f6]">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex gap-7.5">
            {/* Sidebar Start */}
            <div
              className={`sidebar-content fixed xl:z-1 z-9999 left-0 top-0 xl:translate-x-0 xl:static max-w-[310px] xl:max-w-[270px] w-full ease-out duration-200 ${
                productSidebar
                  ? "translate-x-0 bg-white p-5 h-screen overflow-y-auto"
                  : "-translate-x-full"
              }`}
            >
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col gap-6">
                  <div className="bg-white shadow-1 rounded-lg py-4 px-5">
                    <div className="flex items-center justify-between">
                      <p>Filters:</p>
                      <button
                        type="button"
                        className="text-blue"
                        onClick={() => {
                          // Future: reset filters
                        }}
                      >
                        Clean All
                      </button>
                    </div>
                  </div>

                  <CategoryDropdown
                    categories={[
                      { name: "Clothing", products: 0, isRefined: false },
                      { name: "Sneakers", products: 0, isRefined: false },
                      { name: "Slippers", products: 0, isRefined: false },
                      { name: "Gadgets", products: 0, isRefined: false },
                    ]}
                  />
                  <GenderDropdown
                    genders={[
                      { name: "Women", products: 0 },
                      { name: "Men", products: 0 },
                      { name: "Unisex", products: 0 },
                    ]}
                  />
                  <SizeDropdown />
                  <ColorsDropdwon />
                  <PriceDropdown />
                </div>
              </form>
            </div>
            {/* Sidebar End */}

            {/* Content Start */}
            <div className="xl:max-w-[870px] w-full">
              <div className="rounded-lg bg-white shadow-1 pl-3 pr-2.5 py-2.5 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap items-center gap-4">
                    <CustomSelect options={options} />
                    <p>
                      Showing{" "}
                      <span className="text-dark">
                        {products.length} of {totalCount}
                      </span>{" "}
                      Products
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => setProductStyle("grid")}
                      aria-label="grid view"
                      className={`${
                        productStyle === "grid"
                          ? "bg-blue border-blue text-white"
                          : "text-dark bg-gray-1 border-gray-3"
                      } flex items-center justify-center w-10.5 h-9 rounded-[5px] border ease-out duration-200 hover:bg-blue hover:border-blue hover:text-white`}
                    >
                      <TableCellsIcon width={20} height={20} />
                    </button>

                    <button
                      onClick={() => setProductStyle("list")}
                      aria-label="list view"
                      className={`${
                        productStyle === "list"
                          ? "bg-blue border-blue text-white"
                          : "text-dark bg-gray-1 border-gray-3"
                      } flex items-center justify-center w-10.5 h-9 rounded-[5px] border ease-out duration-200 hover:bg-blue hover:border-blue hover:text-white`}
                    >
                      <ListBulletIcon width={20} height={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Grid/List */}
              <div
                className={`${
                  productStyle === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-7.5 gap-y-9"
                    : "flex flex-col gap-7.5"
                }`}
              >
                {loading ? (
                  <p className="text-center col-span-full">
                    Loading products...
                  </p>
                ) : products.length > 0 ? (
                  products.map((item, key) =>
                    productStyle === "grid" ? (
                      <SingleGridItem item={item} key={key} />
                    ) : (
                      <SingleListItem item={item} key={key} />
                    )
                  )
                ) : (
                  <p className="text-center col-span-full">
                    No products found.
                  </p>
                )}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-10">
                <div className="bg-white shadow-1 rounded-md p-2 flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded bg-gray-100 disabled:opacity-50"
                  >
                    Prev
                  </button>

                  <span className="px-3">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    onClick={() =>
                      setCurrentPage((p) => (p < totalPages ? p + 1 : p))
                    }
                    disabled={currentPage >= totalPages}
                    className="px-3 py-1 rounded bg-gray-100 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
            {/* Content End */}
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopWithSidebar;
