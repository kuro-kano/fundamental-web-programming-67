import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
        <div> GearGod </div>
        <Link href='/'>Home </Link>
        <Link href="/about">About </Link>
        <Link href="/products">Product </Link>
    </nav>
  );
}
