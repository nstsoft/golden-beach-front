import { type Event } from 'utils';
import { FC, useRef, useEffect, useState } from 'react';
import { CalendarSvg } from 'assets/svg';
import './eventItems.scss';
import { isMobile } from 'react-device-detect';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import MarkerImg from 'assets/marker.png';
import { PhotoGallery, ShadowHeader, CustomButton } from 'components';
import { useNavigate } from 'react-router-dom';
import { useGallery, useLanguage } from 'hooks';
import days from 'dayjs';

const documentWidth = window.innerWidth;
const documentHeight = window.innerHeight;

const coordinates: [number, number] = [44.32921300790015, 8.51025542024294];
const customIcon = new Icon({
  iconUrl: MarkerImg,
  iconSize: [24, 37],
});
type Props = {
  event: Event;
};

export const EventItemSection: FC<Props> = ({ event }) => {
  const navigate = useNavigate();
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const { count } = useGallery({ event: event._id, skip: 0, limit: 0 });
  const [showEnlarged, setShowEnlarged] = useState(false);
  const { language, t } = useLanguage();

  useEffect(() => {
    if (imageRef.current && !isMobile) {
      const image = imageRef.current as HTMLImageElement;
      image.onload = () => {
        if (textRef.current) {
          const text = textRef.current as HTMLDivElement;
          text.style.height = `${image.height}px`;
        }
      };
    }
  }, [imageRef]);

  return (
    <section className={`event-item-section ${isMobile ? 'mobile' : ''}`}>
      <div className="white-header-text">{event.name}</div>
      <div className="date">
        <CalendarSvg /> <a>{days(event.date).format('MMM DD | HH:mm')}</a>
      </div>
      <div className="content">
        <div className="image" onClick={() => setShowEnlarged(true)}>
          <img ref={imageRef} src={event.image} />
        </div>
        <div className="description-content" ref={textRef}>
          <div className="description">
            <div className="title white-header-text">{t('description')}</div>
            <div className="shadowed-text">
              {language === 'en' ? event.descriptionEng : event.descriptionIt}
            </div>
          </div>
          <div className="map">
            <div className="title white-header-text">{t('eventLocation')}</div>
            <MapContainer center={coordinates} zoom={17} scrollWheelZoom={false}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={coordinates} icon={customIcon}>
                <Popup>Passeggiata Eugenio Montale, 6, 17011 Albisola Superiore SV</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>

      {count > 0 && (
        <div className="gallery" onClick={() => navigate(`/gallery/${event._id}`)}>
          <ShadowHeader bigText="Photo" smallText="gallery" />
          <PhotoGallery event={event._id} limit={4} />
          <div className="gallery_button">
            <CustomButton onClick={() => navigate(`/gallery/${event._id}`)}>
              {t('viewFullAlbum')}
            </CustomButton>
          </div>
        </div>
      )}
      <div
        className={`enlarged ${showEnlarged ? 'show' : ''} ${documentWidth > documentHeight ? 'height' : 'width'}`}
        onClick={() => setShowEnlarged(false)}
      >
        <img ref={imageRef} src={event.image} />
      </div>
    </section>
  );
};
