"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaShoppingBag, FaUser, FaHome, FaInfoCircle, FaPhone } from "react-icons/fa";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const [active, setActive] = useState("Home");
  const [cartCount, setCartCount] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const updateCart = () => {
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(savedCart.length);
    };

    updateCart();
    window.addEventListener("storage", updateCart);

    return () => {
      window.removeEventListener("storage", updateCart);
    };
  }, []);

  if (!isClient) return null;

  const baseMenu = [
    { name: "Home", href: "/", icon: <FaHome /> },
    { name: "Services", href: "/haute", icon: <FaInfoCircle /> },
    { name: "About", href: "/about", icon: <FaInfoCircle /> },
    { name: "Contact", href: "/contact", icon: <FaPhone /> },
  ];

  const authItem = session
    ? { name: "Profile", href: "/user", icon: <FaUser /> }
    : { name: "Register", href: "/register", icon: <FaUser /> };

  const menuItems = [...baseMenu, authItem];

  return (
    <header className="w-full fixed top-0 z-50">
      {/* Desktop Navbar (unchanged) */}
      <nav className="hidden md:flex items-center justify-between px-6 md:px-12 py-4 bg-white/60 backdrop-blur-lg shadow-lg border border-white/30 rounded-b-2xl">
        <Link
          href="/"
          className="px-4 py-2 bg-[#0d1a26] text-white font-extrabold text-xl md:text-2xl rounded-xl shadow-lg hover:scale-105 transition"
        >
          Sparky
        </Link>

        <ul className="flex items-center gap-8 font-semibold text-gray-800">
          {menuItems.map((item) => (
            <li key={item.name} className="relative group">
              <Link
                href={item.href}
                onClick={() => setActive(item.name)}
                className={`transition px-3 py-2 ${
                  active === item.name ? "text-gray-700 font-bold" : "hover:text-gray-900"
                }`}
              >
                {item.name}
              </Link>
              <span
                className={`absolute left-0 bottom-0 h-[3px] w-0 bg-gray-900 
                  group-hover:w-full transition-all duration-300 ${
                    active === item.name ? "w-full" : ""
                  }`}
              />
            </li>
          ))}

          <li className="relative">
            <Link href="/cart" className="flex items-center">
              <FaShoppingBag className="text-gray-900 text-2xl hover:scale-110 transition" />
              {cartCount > 0 && (
                <span className="ml-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full shadow-lg animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>
          </li>
        </ul>
      </nav>

      {/* Mobile Top Logo & User */}
      <div className="md:hidden fixed top-0 left-0 w-full flex justify-between items-center px-6 py-3 bg-white/80 backdrop-blur-md shadow-md z-50">
        {/* Logo */}
        <Link
          href="/"
          className="px-3 py-1 bg-[#0d1a26] text-white font-bold text-lg rounded-lg shadow-md hover:scale-105 transition"
        >
          Sparky
        </Link>

        {/* Username */}
        {session && (
          <div className="flex items-center gap-2 px-3 py-1 bg-blue-600/90 text-white rounded-full shadow-md">
            <FaUser className="text-sm" />
            <span className="text-sm font-medium truncate max-w-[100px]">
              {session.user?.name || "User"}
            </span>
          </div>
        )}
      </div>

      {/* Mobile Bottom Navbar */}
      <nav className="md:hidden fixed bottom-3 left-1/2 -translate-x-1/2 bg-white/70 backdrop-blur-xl shadow-lg border border-white/30 rounded-2xl px-6 py-3 flex justify-between items-center gap-6 w-[95%] max-w-md z-40">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={() => setActive(item.name)}
            className={`flex flex-col items-center text-sm transition ${
              active === item.name ? "text-blue-600 scale-110" : "text-gray-700 hover:text-blue-500"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            {item.name}
          </Link>
        ))}

        {/* Cart Icon */}
        {/* <Link
          href="/cart"
          onClick={() => setActive("Cart")}
          className={`relative flex flex-col items-center text-sm transition ${
            active === "Cart" ? "text-blue-600 scale-110" : "text-gray-700 hover:text-blue-500"
          }`}
        >
          <FaShoppingBag className="text-xl" />
          Cart
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full shadow-md animate-bounce">
              {cartCount}
            </span>
          )}
        </Link> */}
      </nav>
    </header>
  );
}
