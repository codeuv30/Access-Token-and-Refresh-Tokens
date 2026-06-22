"use client";

import React, { useEffect, useState } from "react";

const page = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setProducts(data);
    };

    getData();
  }, []);

  return (
    <div className="p-6">
      <h1>all products lists here</h1>

      {products.map((product) => {
        return <h1>{product.title}</h1>
      })}
    </div>
  );
};

export default page;
