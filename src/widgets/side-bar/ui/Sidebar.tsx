import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import GroupIcon from '@mui/icons-material/Group'
import MovingIcon from '@mui/icons-material/Moving'
import TranslateIcon from '@mui/icons-material/Translate'
import ContactPageIcon from '@mui/icons-material/ContactPage'
import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'

export const Sidebar = () => {
  const { t } = useTranslation('common')

  const sidebarItems = [
    {
      label: t('nav.employees'),
      link: '/users',
      icon: <GroupIcon />,
    },
    {
      label: t('nav.skills'),
      link: '/skills',
      icon: <MovingIcon />,
    },
    {
      label: t('nav.languages'),
      link: '/languages',
      icon: <TranslateIcon />,
    },
    {
      label: t('nav.cvs'),
      link: '/cvs',
      icon: <ContactPageIcon />,
    },
  ]

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
        <List>
          {sidebarItems.map(({ label, link, icon }) => (
            <ListItem key={link} disablePadding>
              <ListItemButton component={Link} to={link}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>
    </Box>
  )
}
