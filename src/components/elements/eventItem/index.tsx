import { type Event } from 'utils';
import { FC } from 'react';
import { CalendarSvg } from 'assets/svg';
import moment from 'moment';
import './eventItems.scss';
import { isMobile } from 'react-device-detect';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import MarkerImg from 'assets/marker.png';
import { PhotoGallery, ShadowHeader } from 'components';

const coordinates: [number, number] = [44.32921300790015, 8.51025542024294];
const customIcon = new Icon({
  iconUrl: MarkerImg,
  iconSize: [24, 37],
});
type Props = {
  event: Event;
};

export const EventItemSection: FC<Props> = ({ event }) => {
  return (
    <section className={`event-item-section ${isMobile ? 'mobile' : ''}`}>
      <div className="white-header-text">{event.name}</div>
      <div className="date">
        <CalendarSvg /> <a>{moment(event.date).format('MMM DD | HH:mma')}</a>
      </div>
      <div className="content">
        <div className="image">
          <img src={event.image} />
        </div>
        <div className="description-content">
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
      <div className="gallery">
        <ShadowHeader bigText="Photo" smallText="gallery" />
        <PhotoGallery />
      </div>
    </section>
  );
};
