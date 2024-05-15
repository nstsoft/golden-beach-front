import './index.scss';
import Logo from '../../assets/logo.svg';
import { faMagnifyingGlass, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState, useEffect } from 'react';
import { Language } from 'utils';
import { useTranslation } from 'react-i18next';
import MenuIcon from '@mui/icons-material/Menu';

export const Header = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(Language.en);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setLanguage(event.target.value as Language);
  };

  return (
    <div className="header app-padding">
      <div className="header_content">
        <div className="logo">
          <img src={Logo} className="logo" alt="Golden beach logo" />
        </div>
        <div className="menu">
          <div className="menu_item">
            <FontAwesomeIcon className="icon" icon={faMagnifyingGlass} />
          </div>
          <div className="menu_item">
            <FontAwesomeIcon className="icon" icon={faCartShopping} />
          </div>
          <div className="menu_item">
            <FontAwesomeIcon className="icon" icon={faUser} />
          </div>

          <div className="menu_item language">
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={language}
              label="IT"
              onChange={handleChange}
              MenuProps={{
                PaperProps: { sx: { bgcolor: '#222222', color: '#ffffff' } },
              }}
            >
              <MenuItem style={{ fontSize: '0.8rem' }} defaultChecked value={Language.en}>
                ENG
              </MenuItem>
              <MenuItem style={{ fontSize: '0.8rem' }} value={Language.it}>
                IT
              </MenuItem>
            </Select>
          </div>
          <div className="menu_item">
            <MenuIcon />
          </div>
        </div>
      </div>
    </div>
  );
};
