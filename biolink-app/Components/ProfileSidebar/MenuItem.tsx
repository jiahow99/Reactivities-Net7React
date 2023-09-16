import Image from 'next/image';
import icon from '@/public/home-icon.svg';
import { Home } from 'react-feather';
import Link from 'next/link';

interface Props {
    label: string,
    href?: string,
    children: React.ReactNode
}

const MenuItem = ({ label, href, children }: Props) => {
  return (
    <Link href="" className="flex items-center gap-4 text-tertiary py-2 px-8 duration-200 hover:text-white">
        { children }
        <p className='text-sm font-medium'>{ label }</p>
    </Link>
  )
}

export default MenuItem