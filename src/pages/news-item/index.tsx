import './news-item.scss';

import ClubImg from 'assets/hardcode/club.jpeg';

import { DownloadSvg, CalendarSvg } from 'assets/svg';
import moment from 'moment';
import { isMobile } from 'react-device-detect';

const posts = [
  {
    image: 'image1.jpg', // Replace with your image URLs
    title: 'Fireworks Spectacular: Lighting Up the Night Sky',
    date: 'April 29 | 11.30pm - May 30 | 4am',
  },
  {
    image: 'image2.jpg',
    title: 'Fireworks Spectacular: Lighting Up the Night Sky',
    date: 'April 29 | 11.30pm - May 30 | 4am',
  },
  {
    image: 'image3.jpg',
    title: 'Fireworks Spectacular: Lighting Up the Night Sky',
    date: 'April 29 | 11.30pm - May 30 | 4am',
  },
];

export const NewsItem = () => {
  return (
    <div className="news-page">
      <div className="news-page__header">
        <h1 className="news-page__title">Music Fest Extravaganza: A Weekend of Nonstop Fun</h1>
        <div className="date">
          <CalendarSvg /> <a>{moment(new Date()).format('MMM DD | HH:mma')}</a>
        </div>
      </div>
      <div className="news-page__content-wrapper">
        <div className="news-page__image-wrapper">
          <img src={ClubImg} alt="DJ at Music Fest" className="news-page__main-image" />
        </div>
        <div className="news-page__main-content">
          <div className="news-page__content-text-wrapper">
            <div className="news-page__content-text">
              <span className="news-page__paragraph">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur...... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur...... Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur......
              </span>
            </div>
            <button className={`news-page__promo-button ${isMobile ? 'mobile' : ''}`}>
              <DownloadSvg />
              <span>Click Here to Download Promo Code</span>
            </button>
          </div>
          <div className="recent-post">
            <h2>RECENT POST</h2>
            {posts.map((post, index) => (
              <div key={index} className="post">
                <img src={post.image} alt={post.title} />
                <div className="post-content">
                  <h3>{post.title}</h3>
                  <p>{post.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
