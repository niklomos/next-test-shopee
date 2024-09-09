import Image from "next/image";
import { useState } from "react";


// ฟังก์ชัน getStaticPaths เพื่อกำหนดเส้นทางไดนามิก
export async function getStaticPaths() {
  const res = await fetch("https://dummyjson.com/products/?limit=50");
  const data = await res.json();
  const paths = data.products.map((item) => {
    return {
      params: { id: String(item.id) },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

// ฟังก์ชัน getStaticProps เพื่อดึงข้อมูลสำหรับแต่ละหน้า
export async function getStaticProps({ params }) {
  const id = params.id;
  const res = await fetch("https://dummyjson.com/products/" + id);
  const data = await res.json();
  return {
    props: { product: data },
  };
}

// คอมโพเนนต์ ProductDetail ที่จะแสดงรายละเอียดของผลิตภัณฑ์
export default function ProductDetail({ product }) {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(Math.max(quantity - 1, 1));

  return (
    <div className="container mx-auto my-8 px-4">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        {/* ส่วนของภาพ */}
        <div className="md:w-1/2 p-4 flex items-center justify-center">
          <Image
            src={product.thumbnail}
            width={300}
            height={300}
            alt={product.title}
            className="object-cover"
          />
        </div>
        {/* ส่วนของเนื้อหา */}
        <div className="md:w-1/2 p-4">
          <h5 className="text-2xl font-bold mb-2 text-gray-800">{product.title}</h5>
          <h6 className="text-lg font-semibold mb-4 text-gray-700">Brand: {product.brand}</h6>
          <p className="text-gray-600 mb-4">
            <strong>Detail: </strong>
            {product.description}
          </p>
          <p className="text-gray-800 mb-4">
            <strong>Price: </strong>${product.price}
          </p>
          <p className="text-gray-600 mb-4">
            <strong>Warranty Information: </strong>
            {product.warrantyInformation || "Not Available"}
          </p>
          <p className="text-gray-600 mb-4">
            <strong>Shipping Information: </strong>
            {product.shippingInformation || "Not Available"}
          </p>

          {/* Quantity Adjustment */}
          <div className="flex items-center mb-4">
            <button
              onClick={decreaseQuantity}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-l-lg border border-gray-300"
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              readOnly
              className="w-16  h-10 text-center border border-gray-300"
            />
            <button
              onClick={increaseQuantity}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-r-lg border border-gray-300"
            >
              +
            </button>
          </div>

          {/* Add to Cart and Buy Now Buttons */}
          <div className="flex space-x-4">
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
              Add to Cart
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
