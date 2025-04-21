import * as React from 'react';
import Stack from '@mui/material/Stack';
// import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
// import CustomDatePicker from './CustomDatePicker';
// import NavbarBreadcrumbs from './NavbarBreadcrumbs';
// import MenuButton from './MenuButton';
// import ColorModeIconDropdown from '../../shared-theme/ColorModeIconDropdown';
import { processUserProfile } from '../../utils/profile';

// import Search from './Search';
import { Typography} from '@mui/material';

export default function Header({ userProfile }) {
  const [userData, setUserData] = React.useState({
    name: ''
  });

  React.useEffect(() => {
    const processedData = processUserProfile(userProfile);

    if (processedData) {
      setUserData({
        name: processedData.name,
      });
    }
  }, [userProfile]);

  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: 'none', md: 'flex' },
        width: '100%',
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'space-between',
        maxWidth: { sm: '100%', md: '1700px' },
        pt: 3,
      }}
      spacing={2}
    >
      <Typography variant="body1">
        Welcome <b>{userData.name || 'Guest'}</b>
      </Typography>
      {/* <Stack direction="row" sx={{ gap: 1 }}>
        <Search />
        <CustomDatePicker />
        <MenuButton showBadge aria-label="Open notifications">
          <NotificationsRoundedIcon />
        </MenuButton>
        <ColorModeIconDropdown />
      </Stack> */}
    </Stack>
  );
}
