import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className='flex gap-6'>
      <Link href={"/home"}>Home</Link>
      <Link href={"/about"}>About</Link>
      <Link href={"/contact"}>Contact</Link>
    </div>
  );
};

export default Navbar;
