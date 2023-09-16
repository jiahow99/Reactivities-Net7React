import Link from "next/link";

interface Props {
    label: string;
    to: string;
}
const Menu = ({ label, to }: Props ) => {
  return (
    <Link href={to} className="px-3 py-5 hover:bg-gray-800 border-b-4 border-transparent hover:border-purple-700 text-sm font-medium tracking-widest">
        { label }
    </Link>
  )
}

export default Menu