import Link from "next/link";

interface Props {
  title: string;
  href: string;
}

export default function CategoryCard({
  title,
  href,
}: Props) {
  return (
    <Link
      href={href}
      className="rounded-xl border p-6 hover:shadow-lg"
    >
      <h3 className="text-xl font-semibold">
        {title}
      </h3>
    </Link>
  );
}