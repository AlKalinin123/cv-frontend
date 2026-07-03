import { ProfileMenu } from '@/widgets/profile-menu'

export const Header = () => {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        height: '64px',
        padding: '0 16px',
      }}
    >
      <ProfileMenu />
    </header>
  )
}
