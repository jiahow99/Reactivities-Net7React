'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
    label: string;
    to: string;
}
const Menu = ({ label, to }: Props ) => {
  const pathname = usePathname();

  return (
    <Link 
      href={to} 
      className={`px-3 py-5 hover:bg-gray-800 border-b-4 border-transparent hover:border-purple-700 text-sm font-medium tracking-widest
      ${pathname === to && "bg-gray-800 border-purple-700"}`}
    >
        { label }
    </Link>
  )
}

export default Menu