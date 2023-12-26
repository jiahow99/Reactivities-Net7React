'use client'
import React from 'react'
import SearchComponent from './SearchComponent'
import ToggleSidebar from '../ProfileSidebar/ToggleSidebar'
import { usePathname } from 'next/navigation'

const LayoutSearch = () => {
  const pathname = usePathname();

  return pathname !== '/' && (
    <div className="flex justify-between px-4 sm:px-0">
        <div className="w-10/12 sm:w-full">
            <SearchComponent />
        </div>
        <ToggleSidebar />
    </div>
  )
}

export default LayoutSearch