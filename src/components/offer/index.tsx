import './offer.scss';
import Image from 'assets/pages/home/offer.jpeg';
export const Offer = () => {
  return (
    <section className="offer">
      <div className="offer_content">
        <div className="offer_text">
          <div className="item">
            <div className="white-header-text">01 party</div>
            <div className="description shadowed-text">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero dolor labore ab asperiores, pariatur
              ipsam animi quisquam inventore ea nesciunt? Magnam assumenda architecto officiis culpa veritatis, labore
              saepe sint numquam.
            </div>
          </div>
          <div className="item">
            <div className="white-header-text">01 party</div>
            <div className="description shadowed-text">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero dolor labore ab asperiores, pariatur
              ipsam animi quisquam inventore ea nesciunt? Magnam assumenda architecto officiis culpa veritatis, labore
              saepe sint numquam.
            </div>
          </div>
          <div className="item">
            <div className="white-header-text">01 party</div>
            <div className="description shadowed-text">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero dolor labore ab asperiores, pariatur
              ipsam animi quisquam inventore ea nesciunt? Magnam assumenda architecto officiis culpa veritatis, labore
              saepe sint numquam.
            </div>
          </div>
        </div>
        <div className="offer_image">
          <img src={Image} alt="offer" />
        </div>
      </div>
    </section>
  );
};
