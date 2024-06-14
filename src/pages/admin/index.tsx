import './admin.scss';
import { useState } from 'react';

import { isMobile } from 'react-device-detect';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { EventsTab, GalleryTab, MenuTab } from './adminComponents';
import { CustomInput } from 'components';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const AdminPage = () => {
  const [value, setValue] = useState(0);
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div className={`admin-page page ${isMobile ? 'mobile' : ''}`}>
      <section className={`page_content ${isMobile ? 'mobile' : ''}`}>
        <div className="passcode-container">
          <CustomInput
            onChange={(ev) => {
              localStorage.setItem('passphrase', ev.target.value);
            }}
            label="Pass code"
          />{' '}
        </div>

        <Box className="main-tabs" sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Events/news" {...a11yProps(0)} />
            <Tab label="Albums" {...a11yProps(1)} />
            <Tab label="Menu" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <EventsTab />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <GalleryTab />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <MenuTab />
        </CustomTabPanel>
      </section>
    </div>
  );
};
