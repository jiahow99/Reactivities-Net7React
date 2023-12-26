import ProfileDashboard from '@/Components/Dashboard/ProfileDashboard';
import React from 'react'

interface Props {
    children: React.ReactNode
}

const RootLayout = ({children}: Props) => {
  return (
    <div className="p-4">
        <ProfileDashboard />
        { children }

    </div>
  )
}

export default RootLayout;