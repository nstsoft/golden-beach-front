import './gallery.scss';

import { PhotoGallery, Albums } from 'components';
import { isMobile } from 'react-device-detect';
import { useState } from 'react';
import { useDebounce, ServiceType } from 'utils';
import { CustomInput } from 'elements';
import { ArrowLeftSvg } from 'assets/svg';
import { useParams } from 'react-router-dom';

export const GalleryPage = () => {
  const params = useParams();
  const [type, setType] = useState<ServiceType | null>();
  const [album, setAlbum] = useState<string | null>();
  const [search, setSearch] = useDebounce<string>('', 400);

  const showImages = album || album === '' || params.id;

  const selectItem = (selectedType?: ServiceType | null) => (
    <div
      style={{ display: showImages ? 'none' : 'flex' }}
      key={selectedType + '1'}
      className={`item ${selectedType === type ? 'active' : ''}`}
      onClick={() => setType(selectedType)}
    >
      {selectedType ?? 'all'}
    </div>
  );

  const renderContent = () => {
    if (showImages) {
      return (
        <div className="gallery">
          <PhotoGallery
            infinityScroll
            event={params.id}
            search={search}
            showLoadMore={true}
            album={album ?? undefined}
            type={type}
          />
        </div>
      );
    } else {
      return (
        <div className="albums">
          <Albums type={type} name={search} onAlbumSelect={setAlbum} />
        </div>
      );
    }
  };

  return (
    <div className={`gallery-page page ${isMobile ? 'mobile' : ''}`}>
      <div className={`page_content ${isMobile ? 'mobile' : ''}`}>
        <div className="gallery-header">
          <CustomInput
            style={{ display: showImages ? 'none' : 'flex' }}
            onChange={(event) => setSearch(event.target.value)}
          />

          <div className="types">
            {showImages ? (
              <div
                className="back"
                style={{ display: showImages ? 'flex' : 'none', cursor: 'pinter' }}
                onClick={() => setAlbum(null)}
              >
                <ArrowLeftSvg />
              </div>
            ) : null}{' '}
            {[null, ...Object.values(ServiceType)].map((item) => selectItem(item))}
          </div>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};
