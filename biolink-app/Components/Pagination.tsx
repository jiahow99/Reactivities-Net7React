'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Props {
    currentPage: number
    totalPages: number
}

export const Pagination = ({currentPage, totalPages}: Props) => {
    const pathname = usePathname();    

    // Helper function to get link
    const getLink = (page: number) => {
        return `${pathname}?currentPage=${page}` ;
    }

    // Max links to be displayed
    const maxLinks = 9;

    // Calculate the starting and ending page numbers for the links
    const startPage = Math.max(1, currentPage - Math.floor(maxLinks / 2));
    const endPage = Math.min(totalPages, startPage + maxLinks - 1);

    // Generate an array of pagination objects with "label" and "link"
    const paginationLinks = Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => ({
            label: startPage + i,
            link: getLink(startPage + i),
        })
    );  
    
    return (
        <div className="pagination w-full my-5 flex justify-center items center gap-3 ">
            {currentPage !== 1 && (
                <Link href={getLink(currentPage-1)} className="px-4 py-1 font-medium bg-transparent border-2 border-white rounded-lg hover:bg-white hover:text-black duration-200">
                    Prev
                </Link>
            )}

            {paginationLinks.map(link => (
                <Link key={link.label} href={link.link} className={`px-4 py-1 font-medium bg-transparent border-2 border-white rounded-lg  duration-200
                    ${link.label === currentPage ? 'bg-white text-black pointer-events-none' : 'hover:bg-white hover:text-black'}`}>
                    { link.label }
                </Link>
            ))}

            {currentPage < totalPages && (
                <Link href={getLink(currentPage + 1)} className="px-4 py-1 font-medium bg-transparent border-2 border-white rounded-lg hover:bg-white hover:text-black duration-200">
                    Next
                </Link>
            )}
        </div>
    )
}
