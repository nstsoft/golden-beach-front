import './gallery.scss';

import { PhotoGallery } from 'components';
import { isMobile } from 'react-device-detect';
import { useState } from 'react';
import { ImageTypeEnum, useDebounce } from 'utils';
import { CustomInput } from 'elements';

export const GalleryPage = () => {
  const [type, setType] = useState<ImageTypeEnum | null>();
  const [search, setSearch] = useDebounce<string>('');

  const selectItem = (selectedType?: ImageTypeEnum | null) => (
    <div
      key={selectedType + '1'}
      className={`item ${selectedType === type ? 'active' : ''}`}
      onClick={() => setType(selectedType)}
    >
      {selectedType ?? 'all'}
    </div>
  );

  return (
    <div className={`gallery-page page ${isMobile ? 'mobile' : ''}`}>
      <div className={`page_content ${isMobile ? 'mobile' : ''}`}>
        <div className="gallery-header">
          <CustomInput onChange={(event) => setSearch(event.target.value)} />
          <div className="types">
            {[null, ...Object.values(ImageTypeEnum)].map((item) => selectItem(item))}
          </div>
        </div>
        <div className="gallery">
          <PhotoGallery search={search} showLoadMore={true} type={type} />
        </div>
      </div>
    </div>
  );
};
