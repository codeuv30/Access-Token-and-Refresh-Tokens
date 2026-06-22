import Image from "next/image";

const StarRating = ({ rate }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-3.5 h-3.5 ${
            star <= Math.round(rate) ? "text-amber-400" : "text-gray-200"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const CategoryBadge = ({ category }) => {
  const colors = {
    "men's clothing": "bg-blue-50 text-blue-600 border-blue-100",
    "women's clothing": "bg-pink-50 text-pink-600 border-pink-100",
    jewelery: "bg-amber-50 text-amber-600 border-amber-100",
    electronics: "bg-violet-50 text-violet-600 border-violet-100",
  };
  const color = colors[category] || "bg-gray-50 text-gray-500 border-gray-100";
  return (
    <span
      className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${color}`}
    >
      {category}
    </span>
  );
};

const ProductCard = ({ product }) => {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-gray-100 hover:-translate-y-1 transition-all duration-300 flex flex-col">
      {/* Image area */}
      <div className="relative bg-gray-50 flex items-center justify-center p-8 h-52">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-full object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="mb-2">
          <CategoryBadge category={product.category} />
        </div>

        <h2 className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2 mb-1 flex-1">
          {product.title}
        </h2>

        <p className="text-xs text-gray-400 line-clamp-2 mb-4 leading-relaxed">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <StarRating rate={product.rating.rate} />
          <span className="text-xs text-gray-400">
            {product.rating.rate} ({product.rating.count})
          </span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
          <span className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <button className="text-sm font-medium bg-gray-900 text-white px-4 py-2 rounded-xl hover:bg-gray-700 transition-colors duration-200">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

const Page = async () => {
  const res = await fetch("https://fakestoreapi.com/products", {
    cache: "no-store",
  });
  const data = await res.json();

  const categories = [...new Set(data.map((p) => p.category))];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <span className="text-xl font-bold tracking-tight text-gray-900">
              store
              <span className="text-violet-500">.</span>
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-500 font-medium">
            <a href="#" className="text-gray-900">
              All Products
            </a>
            {categories.map((c) => (
              <a key={c} href="#" className="hover:text-gray-900 capitalize transition-colors">
                {c}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-violet-500 rounded-full"></span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero text */}
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-500 mb-2">
            New arrivals
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            All Products
          </h1>
          <p className="text-gray-400 mt-2 text-sm">
            {data.length} items across {categories.length} categories
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <footer className="border-t border-gray-100 mt-16 py-8 text-center text-xs text-gray-300">
        © {new Date().getFullYear()} store. All rights reserved.
      </footer>
    </main>
  );
};

export default Page;