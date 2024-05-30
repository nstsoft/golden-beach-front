import './event-item.scss';
import { useRef } from 'react';
import { CustomButton, PhotoGallery, ShadowHeader } from 'src/components';
import Poster from 'assets/hardcode/poster1.png';
import MarkerImg from 'assets/marker.png';

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Icon } from 'leaflet';

const coordinates: [number, number] = [44.32921300790015, 8.51025542024294];

const customIcon = new Icon({
  iconUrl: MarkerImg,
  iconSize: [24, 37],
});

export const EventItem = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  return (
    <div className="event-item-wrapper">
      <div className="event-item-container">
        <div className="event-item-header">
          <h1>THE SUMMER CONTINUES</h1>
          <div className="event-item-date-range">April 29 | 11:30pm - May 30 | 4am</div>
        </div>
        <div className="event-item-content-wrapper">
          <div className="event-item-content">
            <div className="event-item-content-left">
              <div className="event-item-content-image">
                <img src={Poster} alt="Event Poster" />
              </div>
            </div>
            <div className="event-item-content-right">
              <div className="event-item-content-description">
                <h2>DESCRIPTION</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim id est laborum.
                </p>
              </div>
              <div className="event-item-content-event-location">
                <h2>EVENT LOCATION</h2>
                <div className="map" ref={mapRef}>
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
          </div>
        </div>
        <div className="event-item-button-container">
          <CustomButton>Book Now your Table</CustomButton>
        </div>
        <ShadowHeader bigText="Gallery" smallText="photo" />
        <PhotoGallery />
      </div>
    </div>
  );
};
