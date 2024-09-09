import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useState } from "react";
import { FaFacebook, FaInstagram, FaSearch, FaShoppingCart } from "react-icons/fa";
import { FiBell, FiGlobe, FiHelpCircle } from "react-icons/fi";
import { SiLine } from "react-icons/si";



export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/?search=${encodeURIComponent(searchQuery)}`);
  };


  return (
    <nav className="bg-orange-500">
      {/* Top Bar */}
      <div className="container mx-auto px-4 py-2 flex flex-col sm:flex-row justify-between items-center text-white text-sm">
        <div className="flex flex-wrap items-center space-x-2 mb-2 sm:mb-0">
          <span className="flex-shrink-0">
            seller | เริ่มต้นขายสินค้า | ดาวน์โหลด | ติดตามเราบน{" "}
          </span>
          <div className="flex space-x-2">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300"
            >
              <FaFacebook className="h-5 w-5" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300"
            >
              <FaInstagram className="h-5 w-5" />
            </a>
            <a
              href="https://line.me"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300"
            >
              <SiLine className="h-5 w-5" />
            </a>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center sm:justify-end space-y-2 sm:space-y-0 sm:space-x-4">
          <Link
            href="/notifications"
            className="flex items-center hover:underline"
          >
            <FiBell className="mr-1 h-5 w-5" />
            การแจ้งเตือน
          </Link>
          <Link href="/help" className="flex items-center hover:underline">
            <FiHelpCircle className="mr-1 h-5 w-5" />
            ช่วยเหลือ
          </Link>
          <Link href="/language" className="flex items-center hover:underline">
            <FiGlobe className="mr-1 h-5 w-5" />
            ไทย
          </Link>
          <Link href="/register" className="hover:underline">
            สมัครใหม่
          </Link>
          <Link href="/login" className="hover:underline">
            เข้าสู่ระบบ
          </Link>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row justify-between items-center ">
        {/* Logo */}
        <Link href="/" className="text-white text-2xl font-bold mr-4">
          <Image src="/logosp.png" width={230} height={230} alt="logo" />
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="block sm:hidden text-white focus:outline-none ml-5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <div className={`w-full ${isOpen ? "block" : "hidden"} sm:block`}>
          <form onSubmit={handleSearch} className="flex items-center">
        <input
          type="text"
          className="flex-grow p-2 focus:outline-none max-w-5xl sm:w-full mt-3"
          placeholder="ค้นหาสินค้า"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      <button
  type="submit"
  className="bg-orange-600 text-white px-4 py-2 h-10 mt-3 hover:bg-orange-700 border border-white border-2 flex items-center justify-center"
>
  <FaSearch className="text-white" />
</button>

      </form>
        </div>

        {/* Cart Icon */}
        <Link href="/cart" className="relative text-white ml-3 mt-3">
          <span className="">
            <FaShoppingCart className="h-8 w-8" />
          </span>
        </Link>
      </div>
      {/* Categories Section */}
      <div className="container mx-auto flex flex-wrap justify-center space-x-10">
  <Link href="/category/electronics" className="text-white mb-2 sm:mb-0">
    อิเล็กทรอนิกส์
  </Link>
  <Link href="/category/fashion" className="text-white mb-2 sm:mb-0">
    แฟชั่น
  </Link>
  <Link href="/category/home-appliances" className="text-white mb-2 sm:mb-0">
    เครื่องใช้ในบ้าน
  </Link>
  <Link href="/category/beauty" className="text-white mb-2 sm:mb-0">
    ความงาม
  </Link>
  <Link href="/category/sports" className="text-white mb-2 sm:mb-0">
    กีฬา
  </Link>
</div>

    </nav>
  );
}
