"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import HeroCarousel from "@/components/herocarosel";
import SaleSection from "@/components/salesection";
import Salemoving from "@/components/salemoving";
const games = [
  {
    title: "Kipon",
    subtitle: "Casual - Free",
    img: "/images/game1.png", // replace with your image
  },
  {
    title: "Robotrix",
    subtitle: "RPG - Free",
    img: "/images/game2.png",
  },
  {
    title: "Treasure Box",
    subtitle: "Adventure - Free",
    img: "/images/game3.png",
  },
];
const goals = [
  {
    title: "Innovation",
    text: "We aim to push the boundaries of technology, creating games that are unique, immersive, and unforgettable.",
    side: "left",
  },
  {
    title: "Community",
    text: "We believe in building a strong and passionate gaming community where everyone feels included and inspired.",
    side: "right",
  },
  {
    title: "Excellence",
    text: "From design to performance, our goal is to deliver nothing short of excellence in every experience we craft.",
    side: "left",
  },
];
const categories = [
  { id: 1, name: "Waxing", image: "/waxing.jpg" },
  { id: 2, name: "Cleanup", image: "/cleanup.jpg" },
  { id: 3, name: "Manicure", image: "/manicure.jpg" },
  { id: 4, name: "Hair care", image: "/haircare.jpg" },
   { id: 3, name: "Manicure", image: "/manicure.jpg" },
  { id: 4, name: "Hair care", image: "/haircare.jpg" },
   { id: 3, name: "Manicure", image: "/manicure.jpg" },
  { id: 4, name: "Hair care", image: "/haircare.jpg" },
];
const cleaningCategories = [
  {
    id: 1,
    name: "Home Cleaning",
    image: "/images/cleaning-home.jpg",
  },
  {
    id: 2,
    name: "Office Cleaning",
    image: "/images/cleaning-office.jpg",
  },
  {
    id: 3,
    name: "Carpet Cleaning",
    image: "/images/cleaning-carpet.jpg",
  },
  {
    id: 4,
    name: "Window Cleaning",
    image: "/images/cleaning-window.jpg",
  },
];

export default function Home() {
  const {data:session}=useSession();
  const router=useRouter();
  const [services, setServices] = useState([]);
  const [loading, setloading] = useState(true);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", message: "" });
  // const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        setSuccess("Message sent successfully 🎉");
        setForm({ firstName: "", lastName: "", email: "", message: "" });
      } else {
        setSuccess("Something went wrong ❌");
      }
    } catch (error) {
      setSuccess("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function fetchServices() {
      setloading(true)
      const res = await fetch("/api/services");
      const data = await res.json();
      setTimeout(() => {
        setloading(false);
        setServices(data);
      }, 1000);
     console.log(services)    }
    fetchServices();
  }, []);
  

  return (
    <>
    <div className="relative mt-[65px] w-[99vw] mb-4 z-0">
        <HeroCarousel />
      </div>
    
      

     
      <div className="relative max-w-7xl mx-auto px-4 py-12">
      {/* Background Glow */}
      {/* <div className="absolute -z-10 top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/20 via-pink-400/20 to-orange-300/20 blur-3xl rounded-full opacity-70 animate-pulse"></div> */}

      {/* Title */}
      <div className="text-center flex-row">

      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-[#5d7afc]  drop-shadow-lg">
         Salon for Women 
      </h1>
      
      </div>
      
      <p className="text-center text-gray-500 mt-3 text-lg">
        Pick a category & step into luxury 💖
      </p>

      {/* Grid */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((cat) => (
          <Link href={`/services/${cat.name.toLowerCase()}`}>
          <div
            // key={cat.id }
            className="group relative bg-white/30 backdrop-blur-xl rounded-3xl shadow-xl 
                       border border-white/20 overflow-hidden 
                       hover:scale-105 hover:shadow-2xl transition-all duration-500 ease-out cursor-pointer"
          >
            {/* Glow Border Effect */}
            {/* <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 opacity-0 group-hover:opacity-100 blur-lg transition duration-500"></div> */}

            {/* Image */}
            <div className="relative w-full h-56 overflow-hidden rounded-t-3xl">
              <Image
                src={cat.image}
                alt={cat.name}
                width={500}
                height={400}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
            </div>

            {/* Floating Badge */}
            {/* <div className="absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-md group-hover:scale-110 transition-transform duration-300">
              NEW
            </div> */}

            {/* Text Section */}
            <div className="p-6 text-center relative z-10">
              <h3 className="text-xl font-bold text-gray-800 group-hover:text-purple-700 transition">
                {cat.name}
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                Experience world-class {cat.name.toLowerCase()}
              </p>
             
  


            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
     <div className="relative max-w-7xl mx-auto px-4 py-12">
      {/* Title */}
      <div className="text-center flex-row">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-[#5d7afc] drop-shadow-lg">
          Cleaning Services
        </h1>
      </div>

      <p className="text-center text-gray-500 mt-3 text-lg">
        Pick a service & make your space shine ✨
      </p>

      {/* Grid */}

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {cleaningCategories.map((cat) => (
            <Link href={`/services/${cat.name.toLowerCase()}`}>
          <div
            key={cat.id}
            className="group relative bg-white/30 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 overflow-hidden hover:scale-105 hover:shadow-2xl transition-all duration-500 ease-out cursor-pointer"
          >
            {/* Image */}
            <div className="relative w-full h-56 overflow-hidden rounded-t-3xl">
              <Image
                src={cat.image}
                alt={cat.name}
                width={500}
                height={400}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
            </div>

            {/* Text Section */}
            <div className="p-6 text-center relative z-10">
              <h3 className="text-xl font-bold text-gray-800 group-hover:text-[#5d7afc] transition">
                {cat.name}
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                Professional {cat.name.toLowerCase()} for spotless results
              </p>
              
  

            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
<section className="relative py-24 bg-gray-100">
  <div className="max-w-6xl mx-auto px-6 lg:px-12">
    {/* Section Title */}
    <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16">
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#5d7afc] via-blue-500 to-indigo-600">
        Our Goals
      </span>
    </h2>

    {/* Goals List */}
    <div className="flex flex-col gap-20">
      {goals.map((goal, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: goal.side === "left" ? -150 : 150 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`flex flex-col md:flex-row items-center gap-10 ${
            goal.side === "right" ? "md:flex-row-reverse" : ""
          }`}
        >
          {/* Decorative Number Badge */}
          <div className="relative w-24 h-24 rounded-full bg-gradient-to-r from-[#5d7afc] via-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-gray-400/40">
            <span className="text-white text-2xl font-bold">{i + 1}</span>
          </div>

          {/* Goal Card */}
          <div className="flex-1 p-10 rounded-2xl bg-white/60 backdrop-blur-md border border-gray-200 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-500">
            <h3 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-[#5d7afc] to-blue-500">
              {goal.title}
            </h3>
            <p className="text-gray-900 leading-relaxed">{goal.text}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>


<section className="relative py-28 bg-gradient-to-r from-gray-100 via-white to-gray-100 overflow-hidden">
  {/* Floating Background Shapes */}
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute w-40 h-40 bg-[#5d7afc]/20 rounded-full blur-3xl top-10 left-20 animate-pulse"></div>
    <div className="absolute w-56 h-56 bg-gray-400/20 rounded-full blur-3xl bottom-20 right-32 animate-pulse"></div>
    <div className="absolute w-28 h-28 bg-[#5d7afc]/30 rounded-full blur-2xl top-1/3 left-1/2 animate-bounce"></div>
  </div>

  <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
    {/* Title */}
    <h2 className="text-5xl md:text-6xl font-extrabold text-center mb-16 bg-clip-text text-transparent bg-[#5d7afc] drop-shadow-sm">
      Let’s Connect
    </h2>

    <div className="grid md:grid-cols-2 gap-10">
      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-lg border border-gray-200"
      >
        <h3 className="text-2xl font-bold mb-6 text-gray-900">Get in Touch</h3>
        <form
          className="flex flex-col gap-5"
          onSubmit={async (e) => {
            e.preventDefault();
            const firstName = e.target.firstName.value;
            const lastName = e.target.lastName.value;
            const email = e.target.email.value;
            const message = e.target.message.value;

            try {
              const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ firstName, lastName, email, message }),
              });

              const data = await res.json();
              if (data.success) {
                alert("Message sent successfully 🎉");
                e.target.reset();
              } else {
                alert(data.message || "Something went wrong ❌");
              }
            } catch (err) {
              alert("Server error ❌");
            }
          }}
        >
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              required
              className="w-full p-3 rounded-xl bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#5d7afc] focus:ring-2 focus:ring-[#5d7afc]/40 outline-none"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              required
              className="w-full p-3 rounded-xl bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#5d7afc] focus:ring-2 focus:ring-[#5d7afc]/40 outline-none"
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full p-3 rounded-xl bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#5d7afc] focus:ring-2 focus:ring-[#5d7afc]/40 outline-none"
          />
          <textarea
            name="message"
            placeholder="Your Message..."
            rows={4}
            required
            className="w-full p-3 rounded-xl bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#5d7afc] focus:ring-2 focus:ring-[#5d7afc]/40 outline-none"
          />
          <button className="mt-2 bg-gradient-to-r from-[#5d7afc] to-blue-600 text-white font-semibold py-3 rounded-xl hover:scale-105 transition-transform shadow-md">
            Submit
          </button>
        </form>
      </motion.div>

      {/* Newsletter */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="bg-gray-900 p-10 rounded-3xl shadow-lg border border-gray-700"
      >
        <h3 className="text-2xl font-bold mb-6 text-white">
          Subscribe to Our Newsletter
        </h3>
        <form
          className="flex flex-col gap-4"
          onSubmit={async (e) => {
            e.preventDefault();
            const email = e.target.email.value;
            const subscribed = e.target.subscribed.checked;

            try {
              const res = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, subscribed }),
              });

              const data = await res.json();
              if (data.success) {
                alert("Subscribed successfully 🎉");
                e.target.reset();
              } else {
                alert(data.message || "Something went wrong ❌");
              }
            } catch (err) {
              alert("Server error ❌");
            }
          }}
        >
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="w-full p-3 rounded-xl bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#5d7afc] focus:ring-2 focus:ring-[#5d7afc]/40 outline-none"
          />
          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <input
              type="checkbox"
              name="subscribed"
              defaultChecked
              className="w-4 h-4 accent-[#5d7afc]"
            />
            <span>Yes, subscribe me to your newsletter.</span>
          </div>
          <button className="mt-2 bg-gradient-to-r from-[#5d7afc] to-blue-600 text-white font-semibold py-3 rounded-xl hover:scale-105 transition-transform shadow-md">
            Join
          </button>
        </form>
      </motion.div>
    </div>
  </div>
</section>


    </>
  );
}
