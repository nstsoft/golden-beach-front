import './admin.scss';

import { isMobile } from 'react-device-detect';
import { UploadEvent, UploadGallery } from 'components';

export const AdminPage = () => {
  return (
    <div className={`admin-page page ${isMobile ? 'mobile' : ''}`}>
      <section className={`page_content ${isMobile ? 'mobile' : ''}`}>
        <div className="events control-panel">
          <UploadEvent />
        </div>
        <div className="gallery control-panel">
          <UploadGallery />
        </div>
      </section>
    </div>
  );
};
