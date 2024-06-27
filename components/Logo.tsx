'use client';

// components/Logo.js
import Image from 'next/image';

const Logo = () => {
  return (
    <div className="flex justify-center items-center my-8 bg-white">
      <Image src="/punktaro-logo.svg" alt="Punktaro Logo" width={200} height={50} />
    </div>
  );
};

export default Logo;
