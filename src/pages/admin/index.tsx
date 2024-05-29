import './admin.scss';

import { isMobile } from 'react-device-detect';
import { UploadEvent } from 'components';

export const AdminPage = () => {
  return (
    <div className={`admin-page page ${isMobile ? 'mobile' : ''}`}>
      <section className={`page_content ${isMobile ? 'mobile' : ''}`}>
        <div className="events">
          <UploadEvent />
        </div>
      </section>
    </div>
  );
};
