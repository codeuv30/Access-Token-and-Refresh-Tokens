import { ProductCard } from "@/components/ProductCard";
import ProtectedRoute from "@/components/ProtectedRoute";
import axios from "axios";
import React from "react";

const page = async () => {
  const products = (await axios.get("https://fakestoreapi.com/products")).data;

  return (
    <ProtectedRoute>
      <div className="min-h-screen grid grid-cols-4 gap-5">
        {products.map((product, idx) => {
          return <ProductCard product={product} key={idx} />;
        })}
      </div>
    </ProtectedRoute>
  );
};

export default page;
