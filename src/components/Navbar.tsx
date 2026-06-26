import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center transition-transform duration-300 hover:scale-105"
        >
          <Image
            src="/icon.png"
            alt="Sanram Travels"
            width={80}
            height={35}
            priority
            className="transition duration-300 group-hover:brightness-110"
          />
        </Link>
        

        {/* Navigation */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="group relative overflow-hidden rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/40 active:scale-95"
          >
            <span className="relative z-10">
              Latest News
            </span>

            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"></span>
          </Link>

          <Link
            href="/blogs"
            className="group relative overflow-hidden rounded-xl border-2 border-blue-600 bg-white px-6 py-3 font-semibold text-blue-600 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-600 hover:text-white hover:shadow-xl hover:shadow-blue-600/30 active:scale-95"
          >
            <span className="relative z-10">
              Aviation Blogs
            </span>

            <span className="absolute bottom-0 left-0 h-1 w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>
      </div>
    </nav>
  );
}