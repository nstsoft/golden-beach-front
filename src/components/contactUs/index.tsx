import './contact.scss';
import { useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { EmailSvg, PhoneSvg, LocationSvg } from 'assets/svg/contact';
import { Icon } from 'leaflet';
import MarkerImg from 'assets/marker.png';
import { useTranslation } from 'react-i18next';

const coordinates: [number, number] = [44.32921300790015, 8.51025542024294];

const customIcon = new Icon({
  iconUrl: MarkerImg,
  iconSize: [24, 37],
});

export const ContactUs = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  return (
    <section className="contact">
      <div className="contact_content">
        <div className="text_content">
          <div className="contact_header">{t('Headers.locations.small')}</div>
          <div className="item">
            <div className="label">
              <EmailSvg />
            </div>
            <div className="text">bertugliapaolo@gmail.com</div>
          </div>
          <div className="item">
            <div className="label">
              <PhoneSvg />
            </div>
            <div className="text">
              <p>+39 347 59 18 364</p>
              <p>+39 393 33 41 734</p>
              <p>+39 340 06 55 212</p>
            </div>
          </div>
          <div className="item">
            <div className="label">
              <LocationSvg />
            </div>
            <div className="text">Passeggiata Eugenio Montale, 6, 17011 Albisola Superiore SV</div>
          </div>
        </div>
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
    </section>
  );
};
