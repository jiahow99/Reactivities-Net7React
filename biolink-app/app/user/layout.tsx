import ProfileDashboard from '@/Components/User/ProfileDashboard'

interface Props {
  children: React.ReactNode
}

const RootLayout = ({ children }: Props) => {
  return (
    <div className="p-4">
        <ProfileDashboard />
        { children }
    </div>
  )
}

export default RootLayout