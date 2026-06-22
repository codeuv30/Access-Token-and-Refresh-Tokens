import Link from 'next/link'
import React from 'react'
import { ModeToggle } from './toggleTheme'

const Navbar = () => {
  return (
    <div className='flex justify-between px-8 py-4 items-center'>
        <h1 className='text-xl font-bold'>Ecommerce</h1>

        <div className='flex space-x-16 font-semibold'>
            <Link href={"/home"}>Home</Link>
            <Link href={"/products"}>Product</Link>
        </div>

        <div><ModeToggle /></div>
    </div>
  )
}

export default Navbar