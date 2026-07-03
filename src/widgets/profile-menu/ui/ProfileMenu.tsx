import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Link as RouterLink, useNavigate } from 'react-router'
import { useAppDispatch } from '@/app/store/hooks'
import {
  Box,
  Avatar,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Divider,
  Link,
} from '@mui/material'
import { Person, Settings, Logout } from '@mui/icons-material'
import { selectCurrentUser } from '@/features/auth/model/selectors'
import { logoutUser } from '@/features/auth/model/authActions'

export const ProfileMenu = () => {
  const { t } = useTranslation('common')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [anchorElProfile, setAnchorElProfile] = useState<null | HTMLElement>(
    null,
  )

  const currentUser = useSelector(selectCurrentUser)
  const userId = currentUser?.id

  const settings = [
    {
      label: t('profileMenu.profile'),
      value: 'profile',
      icon: <Person />,
      link: '/users/:userId/profile',
    },
    {
      label: t('profileMenu.settings'),
      value: 'settings',
      icon: <Settings />,
      link: '/settings',
    },
  ]

  const handleOpenProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElProfile(event.currentTarget)
  }

  const handleCloseProfileMenu = () => {
    setAnchorElProfile(null)
  }

  const handleLogout = () => {
    logoutUser(dispatch)
    navigate('/auth/login')
  }

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title={t('profileMenu.openSettings')}>
        <IconButton onClick={handleOpenProfileMenu} sx={{ p: 0 }}>
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/2.jpg"
            sx={{ width: 48, height: 48 }}
          />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElProfile}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElProfile)}
        onClose={handleCloseProfileMenu}
      >
        {settings.map((setting) => {
          const resolvedLink = setting.link.replace(':userId', userId || '')

          return (
            <MenuItem
              key={setting.value}
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
              onClick={handleCloseProfileMenu}
            >
              {setting.icon}
              <Typography sx={{ textAlign: 'center', textDecoration: 'none' }}>
                <Link
                  to={resolvedLink}
                  component={RouterLink}
                  underline="none"
                  color="inherit"
                >
                  {setting.label}
                </Link>
              </Typography>
            </MenuItem>
          )
        })}
        <Divider />
        <MenuItem
          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          onClick={handleLogout}
        >
          <Logout />
          <Typography sx={{ textAlign: 'center' }}>
            {t('profileMenu.logout')}
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  )
}
