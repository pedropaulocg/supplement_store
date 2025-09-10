import Image from "next/image";
import BestSellingCarousel from "@/components/BestSellingCarousel";
import WhyShop from "@/components/WhyShop";
import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <>
      <section className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
            Summer Sale Up To 50% Off
          </h1>
          <p className="mt-4 text-lg sm:text-xl">
            Discover our best-selling products at unbeatable prices. Limited time offer!
          </p>
          <a
            href="/products"
            className="mt-8 inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-md"
          >
            Shop Now
          </a>
        </div>
      </section>
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Bestselling Products</h2>
        <BestSellingCarousel />
      </div>
      <WhyShop />
      <FAQ />
      
    </>
  );
}
