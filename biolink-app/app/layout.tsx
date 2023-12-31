import ProfileSidebar from '@/Components/ProfileSidebar/ProfileSidebar'
import './globals.css'
import type { Metadata } from 'next'
import { Orbitron  } from 'next/font/google'
import ChatSidebar from '@/Components/ChatSidebar/ChatSidebar'
import LoginModal from '@/Components/User/LoginModal'
import { Provider } from '@/Provider/NavbarProvider'
import { getServerSession } from 'next-auth'
import { SessionProvider } from '@/Provider/SessionProvider'
import SearchPage from '@/Components/Search/SearchPage'
import LayoutSearch from '@/Components/Search/LayoutSearch'
import Loading from '@/Components/Loading'
import { Toaster } from 'react-hot-toast'
import { poppins } from '@/font/Poppins'
import { authOptions } from './api/auth/[...nextauth]/route'

const orbitron = Orbitron({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BioLink',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions);  
  
  return (
    <html lang="en">    
      <body className={`${orbitron.className} text-white`} suppressHydrationWarning={true}>
        <SessionProvider session={session}>
          <div className={`${poppins.className} text-sm`}>
            <Toaster/>
          </div>
          
          <Provider>
            <LoginModal />

            <SearchPage />

            <div className="flex min-h-screen duration-300">
              <ProfileSidebar />
              <div className="w-full sm:w-8/12 mx-auto">
                <LayoutSearch />
                {children}
              </div>
              <ChatSidebar />
            </div>

            <Loading />
          </Provider>
        </SessionProvider>
      </body>
    </html>
  )
}
