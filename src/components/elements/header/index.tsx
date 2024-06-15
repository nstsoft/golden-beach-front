import './index.scss';
import Logo from 'assets/logo.svg';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import { Language } from 'utils';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { isMobile } from 'react-device-detect';
import { SideMenu } from './components';
import { Phone2Svg } from 'assets/svg';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from 'hooks';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { change, language } = useLanguage();

  const handleLanguageChange = (event: SelectChangeEvent<unknown>) => {
    change(event.target.value as Language);
  };

  const toggleDrawer = (newOpen?: boolean) => () => {
    setIsMenuOpen((prev) => newOpen ?? !prev);
  };

  return (
    <div className={`header app-padding ${isMobile ? 'mobile' : ''}`}>
      <div className="header_content">
        <div className="logo" onClick={() => navigate(`/${language === 'it' ? '' : 'en'}`)}>
          <img src={Logo} alt="Golden beach logo" />
        </div>
        <div className="menu">
          <div className="menu_item phone">
            <a href="tel:+393475918364">
              <Phone2Svg />
            </a>
          </div>

          <div className="menu_item language">
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={language}
              label="IT"
              onChange={handleLanguageChange}
              MenuProps={{ PaperProps: { sx: { bgcolor: '#222222', color: '#ffffff' } } }}
            >
              <MenuItem style={{ fontSize: '0.8rem' }} defaultChecked value={Language.en}>
                ENG
              </MenuItem>
              <MenuItem style={{ fontSize: '0.8rem' }} value={Language.it}>
                IT
              </MenuItem>
            </Select>
          </div>
          <div className="menu_item menu_drawer">
            <Button
              id="demo-positioned-button"
              aria-controls={isMenuOpen ? 'demo-positioned-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={isMenuOpen ? 'true' : undefined}
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <MenuIcon />
            </Button>
            <Drawer
              PaperProps={{
                sx: { width: isMobile ? '100%' : '300px', background: '#212429' },
              }}
              anchor="right"
              open={isMenuOpen}
              onClose={toggleDrawer(false)}
            >
              <SideMenu toggleDrawer={() => setIsMenuOpen((prev) => !prev)} />
            </Drawer>
          </div>
        </div>
      </div>
    </div>
  );
};
