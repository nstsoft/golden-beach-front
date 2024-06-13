import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const useCustomNavigate = (root = false) => {
  const { i18n } = useTranslation();

  const navigate = useNavigate();
  return (url: string) => {
    navigate(root ? url : `/${i18n.language}/${url}`);
  };
};
