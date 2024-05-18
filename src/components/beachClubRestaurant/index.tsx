import './beachClubRestaurant.scss';
import { isMobile } from 'react-device-detect';
import ClubImg from 'assets/hardcode/club.jpeg';
import RestaurantImg from 'assets/hardcode/restaurant.jpeg';
import BeachImg from 'assets/hardcode/beach.jpeg';
import { ArrowRightSvg } from 'assets/svg/header';
import { useRef } from 'react';
import Grow from '@mui/material/Grow';
import { useIntersectionObserver } from 'hooks';

const remove = `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum, ipsum? Sed unde, sequi nam laborum
              aliquid architecto illo autem explicabo dolore.`;

export const BeachClubRestaurant = () => {
  const componentRef = useRef(null);
  const { isIntersecting } = useIntersectionObserver(componentRef);

  return (
    <section className={`beach-club-restaurant ${isMobile ? 'mobile' : ''}`}>
      <div ref={componentRef} className="content">
        <Grow in={isIntersecting}>
          <div className="item">
            <div className="image">
              <img src={ClubImg} />
            </div>
            <div className="text">
              <div className="title white-header-text">Club</div>
              <div className="decsription shadowed-text">{remove}</div>
              <div className="footer">
                <div className="details">Details</div> <ArrowRightSvg />
              </div>
            </div>
          </div>
        </Grow>
        <Grow timeout={500} in={isIntersecting}>
          <div className="item">
            <div className="image">
              <img src={RestaurantImg} />
            </div>
            <div className="text">
              <div className="title white-header-text">Restaurant</div>
              <div className="decsription shadowed-text">{remove}</div>
              <div className="footer">
                <div className="details">Details</div> <ArrowRightSvg />
              </div>
            </div>
          </div>
        </Grow>
        <Grow in={isIntersecting} timeout={1000}>
          <div className="item">
            <div className="image">
              <img src={BeachImg} />
            </div>
            <div className="text">
              <div className="title white-header-text">Beach</div>
              <div className="decsription shadowed-text">{remove}</div>
              <div className="footer">
                <div className="details">Details</div> <ArrowRightSvg />
              </div>
            </div>
          </div>
        </Grow>
      </div>
    </section>
  );
};
