import './App.css';
import { useTranslation } from 'react-i18next';
import logo from './assets/logo.svg';

console.log(logo);

function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    console.log(i18n.language);
  };

  return (
    <div>
      <h1>{t('HomePage.Menu.home')}</h1>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('it')}>French</button>
      <button>{t('button')}</button>
    </div>
  );
}

export default App;
