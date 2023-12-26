'use client'
import commonStore from '@/stores/CommonStore'
import React from 'react'
import { Menu } from 'react-feather'

const ToggleSidebar = () => {
    const { toggleSidebar } = commonStore;
  return (
    <button onClick={toggleSidebar} className="p-4 rounded-lg bg-primary sm:hidden z-40">
        <Menu className="text-white" />
    </button>
  )
}

export default ToggleSidebar