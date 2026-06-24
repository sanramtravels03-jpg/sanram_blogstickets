import Link from "next/link";
export default function NotFound() {
  return (
    <main className="container mx-auto py-20 text-center">
      {" "}
      <h1 className="text-5xl font-bold">404</h1>{" "}
      <p className="mt-4 text-gray-600">Page not found.</p>{" "}
      <Link
        href="/"
        className="mt-6 inline-block rounded-lg bg-black px-4 py-2 text-white"
      >
        {" "}
        Go Home{" "}
      </Link>{" "}
    </main>
  );
}
