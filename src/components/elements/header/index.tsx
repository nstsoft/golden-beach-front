import './index.scss';
import Logo from 'assets/logo.svg';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState, useEffect } from 'react';
import { Language } from 'utils';
import { useTranslation } from 'react-i18next';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { isMobile } from 'react-device-detect';
import { SideMenu } from './components';
import { CartSvg, UserSvg, SearchSvg } from 'assets/svg/header';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(Language.en);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const handleLanguageChange = (event: SelectChangeEvent<unknown>) => {
    setLanguage(event.target.value as Language);
  };

  const toggleDrawer = (newOpen?: boolean) => () => {
    setIsMenuOpen((prev) => newOpen ?? !prev);
  };

  return (
    <div className={`header app-padding ${isMobile ? 'mobile' : ''}`}>
      <div className="header_content">
        <div className="logo" onClick={() => navigate('/')}>
          <img src={Logo} alt="Golden beach logo" />
        </div>
        <div className="menu">
          <div className="menu_item search">
            <SearchSvg />
          </div>
          <div className="menu_item cart">
            <CartSvg />
          </div>
          <div className="menu_item profile">
            <UserSvg />
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
