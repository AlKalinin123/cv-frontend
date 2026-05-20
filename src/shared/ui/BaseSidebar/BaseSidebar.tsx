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

const sidebarItems = [
  {
    label: 'Employees',
    link: '/users',
    icon: <GroupIcon />,
  },
  {
    label: 'Skills',
    link: '/skills',
    icon: <MovingIcon />,
  },
  {
    label: 'Languages',
    link: '/languages',
    icon: <TranslateIcon />,
  },
  {
    label: 'CVs',
    link: '/cvs',
    icon: <ContactPageIcon />,
  },
]

export const BaseSidebar = () => {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
        <List>
          {sidebarItems.map(({ label, link, icon }) => (
            <ListItem key={label} disablePadding>
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
