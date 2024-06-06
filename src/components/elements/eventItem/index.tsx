import { type Event } from 'utils';
import { FC, useRef, useEffect, useState } from 'react';
import { CalendarSvg } from 'assets/svg';
import moment from 'moment';
import './eventItems.scss';
import { isMobile } from 'react-device-detect';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import MarkerImg from 'assets/marker.png';
import { PhotoGallery, ShadowHeader, CustomButton } from 'components';
import { useNavigate } from 'react-router-dom';
import { useGallery } from 'hooks';

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
        <CalendarSvg /> <a>{moment(event.date).format('MMM DD | HH:mma')}</a>
      </div>
      <div className="content">
        <div className="image" onClick={() => setShowEnlarged(true)}>
          <img ref={imageRef} src={event.image} />
        </div>
        <div className="description-content" ref={textRef}>
          <div className="description">
            <div className="title white-header-text">Description</div>
            <div className="shadowed-text">
              {' '}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </div>
          </div>
          <div className="map">
            <div className="title white-header-text">Event location</div>
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
              View the full album
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
