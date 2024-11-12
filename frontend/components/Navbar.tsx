"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { navRoutes } from '@/constants';
import Cookies from "js-cookie";
import { UserButton } from './auth/user-button';

const Navbar = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const tokenFromCookie = Cookies.get("token");

    if(tokenFromCookie){
      setToken(tokenFromCookie);
    }
    
  }, []);

  return (
    <header className="relative inset-x-0 top-0 z-50">
      <nav aria-label="Global" className="flex items-center justify-between p-4 lg:px-6">
        <div className='flex space-x-4'>
          <Link href="/" className="text-xl font-semibold leading-6 text-gray-900 dark:text-white hover:opacity-80">
            Cricket Predictor 🏏
          </Link >
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navRoutes.map((item) => (
            <Link key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900 dark:text-white hover:opacity-80">
              {item.name}
            </Link>
          ))}
        </div>
        <div className='flex items-center gap-x-4'>
          {token ? (
            // If token exists, show the UserButton component
            <UserButton />
          ) : (
            // If token doesn't exist, show the login link
            <Link href="/auth/login" className="text-xl font-semibold leading-6 text-gray-900 dark:text-white hover:opacity-80">
              Log in <span aria-hidden="true">&rarr;</span>
            </Link >
          )}
        </div>
      </nav >
    </header >
  );
}

export default Navbar;
