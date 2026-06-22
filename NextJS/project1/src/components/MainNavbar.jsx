import React from 'react'
import Link from "next/link";

const MainNavbar = () => {
  return (
    <div className='flex gap-6'>
      <Link href={"/mainlayout/home"}>Home</Link>
      <Link href={"/mainlayout/about"}>About</Link>
      <Link href={"/mainlayout/contact"}>Contact</Link>
      <Link href={"/mainlayout/products"}>Products</Link>
    </div>
  )
}

export default MainNavbar