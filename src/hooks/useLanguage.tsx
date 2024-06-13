import { useTranslation } from 'react-i18next';
import { Language } from 'utils';
import { useLocation, useNavigate } from 'react-router-dom';

export const useLanguage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();

  return {
    change: (lang: Language) => {
      i18n.changeLanguage(lang);
      localStorage.setItem('language', JSON.stringify(lang));
      const route = pathname.split('/');
      route[1] = i18n.language;
      const path = route.join('/');
      navigate(path);
    },
    language: i18n.language as Language,
    languages: Object.values(Language),
    t: (key: string, options?: { [key: string]: string | number | boolean }) => t(key, options),
  };
};
