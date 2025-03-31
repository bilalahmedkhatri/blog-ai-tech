import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PersonIcon from '@mui/icons-material/Person';

const mainListItems = [
  { text: 'Dashboard', icon: <HomeRoundedIcon />, url: '/dashboard' },
  { text: 'Create Post', icon: <AddCircleIcon />, url: '/dashboard/create-post' },
  // { text: 'Analytics', icon: <AnalyticsRoundedIcon />, url: '/dashboard/analytics' },
  // { text: 'Clients', icon: <PeopleRoundedIcon />, url: '/dashboard/clients' },
  // { text: 'Tasks', icon: <AssignmentRoundedIcon />, url: '/dashboard/tasks' },
  { text: 'Profile', icon: <PersonIcon />, url: '/user-profile' },
];

const secondaryListItems = [
  { text: 'Settings', icon: <SettingsRoundedIcon />, url: '/dashboard/settings' },
  { text: 'About', icon: <InfoRoundedIcon />, url: '/dashboard/about' },
  { text: 'Feedback', icon: <HelpRoundedIcon />, url: '/dashboard/feedback' },
];

export default function MenuContent() {
  const location = useLocation();
  
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              component={Link}
              to={item.url}
              selected={location.pathname === item.url}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              component={Link}
              to={item.url}
              selected={location.pathname === item.url}
            >
              {/* <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} /> */}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
