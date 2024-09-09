import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export async function getStaticProps() {
  const res = await fetch("https://dummyjson.com/products?limit=50");
  const data = await res.json();
  return {
    props: { products: data.products },
  };
}

export default function Index({ products }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const router = useRouter();
  const searchQuery = router.query.search || "";

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const currentItems = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Determine the range of page numbers to display
  const maxButtons = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxButtons - 1);

  if (endPage - startPage + 1 < maxButtons) {
    startPage = Math.max(1, endPage - maxButtons + 1);
  }

  return (
    <>
      <div className="container mx-auto mt-8 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {currentItems.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <Link href={`/products/${item.id}`} className="block">
                <Image
                  src={item.thumbnail}
                  className="w-full h-65 object-cover"
                  width={300}
                  height={200}
                  alt={item.title}
                />
                <div className="p-4 pl-4 text-left">
                  <h5 className="text-lg font-semibold text-gray-800">
                    {item.title}
                  </h5>
                  <button className="border border-red-500 text-red-500  px-2 hover:bg-red-500 hover:text-white transition duration-300">
                    ช็อปปี้ถูกชัวร์
                  </button>
                  <button className="border border-green-500 text-green-500  px-2 hover:bg-green-500 hover:text-white transition duration-300 ml-2">
                    สินค้าจัดส่งไว
                  </button>
                  <h6 className="text-lg font-semibold text-red-500">
                    ${item.price}
                  </h6>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <nav className="mt-8 mb-3">
          <ul className="flex items-center justify-center space-x-2">
            <li>
              <button
                onClick={() => handleClick(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 border rounded-lg ${
                  currentPage === 1
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-white text-blue-500 hover:bg-blue-100"
                }`}
              >
                &lt;
              </button>
            </li>
            {startPage > 1 && (
              <li>
                <button
                  onClick={() => handleClick(1)}
                  className="px-4 py-2 border rounded-lg bg-white text-blue-500 hover:bg-blue-100"
                >
                  1
                </button>
              </li>
            )}
            {startPage > 2 && (
              <li>
                <span className="px-4 py-2 border rounded-lg text-gray-500">
                  ...
                </span>
              </li>
            )}
            {Array.from(
              { length: endPage - startPage + 1 },
              (_, i) => startPage + i
            ).map((page) => (
              <li key={page}>
                <button
                  className={`px-4 py-2 border rounded-lg ${
                    currentPage === page
                      ? "bg-blue-500 text-white"
                      : "bg-white text-blue-500 hover:bg-blue-100"
                  }`}
                  onClick={() => handleClick(page)}
                >
                  {page}
                </button>
              </li>
            ))}
            {endPage < totalPages - 1 && (
              <li>
                <span className="px-4 py-2 border rounded-lg text-gray-500">
                  ...
                </span>
              </li>
            )}
            {endPage < totalPages && (
              <li>
                <button
                  onClick={() => handleClick(totalPages)}
                  className="px-4 py-2 border rounded-lg bg-white text-blue-500 hover:bg-blue-100"
                >
                  {totalPages}
                </button>
              </li>
            )}
            <li>
              <button
                onClick={() => handleClick(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 border rounded-lg ${
                  currentPage === totalPages
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-white text-blue-500 hover:bg-blue-100"
                }`}
              >
                &gt;
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
