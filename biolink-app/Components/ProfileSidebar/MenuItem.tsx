'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Url } from 'next/dist/shared/lib/router/router';
import commonStore from '@/stores/CommonStore';

interface Props {
    label: string,
    href: Url,
    children: React.ReactNode
}

const MenuItem = ({ label, href, children }: Props) => {
  // Pathname
  const path = usePathname();

  const { toggleSidebar } = commonStore;
    
  return (
    <Link href={href} onClick={toggleSidebar} className={`flex items-center gap-4 text-tertiary py-2 px-8 duration-200 hover:text-white ${path === href && 'text-white'}`}>
        { children }
        <p className='text-sm font-medium'>{ label }</p>
    </Link>
  )
}

export default MenuItem