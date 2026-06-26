import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <Image src="/icon.png" alt="Logo" width={100} height={50} />
        </Link>

        <div className="flex gap-8">
          <div className="flex gap-4">
            <Link
              href="/"
             className="px-6 py-3 border-2 blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition duration-300"
            >
              Latest News
            </Link>

            <Link
              href="/blogs"
              className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition duration-300"
            >
              Aviation Blogs
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
