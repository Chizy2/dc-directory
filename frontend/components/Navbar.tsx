'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  if (isAdminRoute) return null;

  return (
    <nav className="bg-dominion-blue shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.svg"
              alt="Dominion City"
              width={150}
              height={60}
              className="h-12 w-auto"
              priority
            />
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-white hover:text-dominion-gold transition"
            >
              Home
            </Link>
            <Link
              href="/admin/login"
              className="bg-dominion-gold text-dominion-blue px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
