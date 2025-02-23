import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav>
      <div className="logo">
        <Link href="/">
            <Image src="/favicon.ico" width={50} height={50} alt="logo" />
        </Link>
      </div>
      <Link href="/">Home </Link>
      <Link href="/about">About </Link>
      <Link href="/products">Product </Link>
    </nav>
  );
}
