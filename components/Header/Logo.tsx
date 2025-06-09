import { redirect } from 'next/navigation';
import React from 'react';
import Image from 'next/image';

const Logo = () => {
  return (
    <div
      className="flex items-center cursor-pointer"
      onClick={() => {
        scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
        redirect('/');
      }}
    >
      <Image
        src="/logo/Org.png"
        alt="logo"
        width={32}
        height={32}
        className="rounded-md mx-2"
      />
      <span className="text-lg font-semibold text-primary">StudentNest</span>
    </div>
  );
};

export default Logo;
