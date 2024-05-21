import './button.scss';
import { type ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';
import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

type Props = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & { to?: string };

export const CustomButton: FC<Props> = ({ children, to, ...props }) => {
  const content = to ? (
    <Link className="link" to={to}>
      {children}
    </Link>
  ) : (
    children
  );
  return (
    <button className={`common_button ${isMobile ? 'mobile' : ''}`} {...props}>
      {content}
    </button>
  );
};
