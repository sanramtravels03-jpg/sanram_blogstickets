import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-cyan-500">
      <div className="w-full flex justify-center">
        <Image
          src="/images/BLOGS_BANNER01.jpeg"
          alt="Aviation Information Hub"
          width={1600}
          height={500}
          priority
          className="w-full h-auto object-contain"
        />
      </div>  
    </section>
  );
}