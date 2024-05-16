import './shadowHeader.scss';
import { FC } from 'react';
import { isMobile } from 'react-device-detect';

type Props = {
  bigText: string;
  smallText: string;
};

export const ShadowHeader: FC<Props> = ({ bigText, smallText }) => {
  return (
    <div className={`shadow-header ${isMobile ? 'mobile' : ''}`}>
      <div className="shadow-header_content">
        <div className="big">{bigText}</div>
        <div className="small">{smallText}</div>
      </div>
    </div>
  );
};
