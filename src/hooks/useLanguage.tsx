import { useTranslation } from 'react-i18next';
import { Language } from 'utils';
import { useLocation, useNavigate } from 'react-router-dom';
import daysjs from 'dayjs';

export const useLanguage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();

  daysjs.locale(i18n.language);

  return {
    change: (lang: Language) => {
      i18n.changeLanguage(lang);
      localStorage.setItem('language', JSON.stringify(lang));
      const origin = pathname.replace('/en/', '/');

      const path = lang === 'it' ? origin : '/en' + origin;
      daysjs.locale(i18n.language);

      navigate(path);
    },
    language: i18n.language as Language,
    languages: Object.values(Language),
    t: (key: string, options?: { [key: string]: string | number | boolean }) => t(key, options),
  };
};
