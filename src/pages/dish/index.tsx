import './dish.scss';
import { isMobile } from 'react-device-detect';
import { useMenu, useLanguage } from 'hooks';
import { useParams } from 'react-router-dom';
import { ShadowHeader } from 'components';
import Carousel from 'react-multi-carousel';
import { cutString } from 'utils';
import { SoyaSvg, VeganSvg, GlutenSvg } from 'assets/svg';
import { useState } from 'react';
import meta from 'src/meta';
import { Helmet } from 'react-helmet-async';

const labels: Record<string, JSX.Element> = {
  soya: <SoyaSvg />,
  vegan: <VeganSvg />,
  gluten: <GlutenSvg />,
};

const Label = ({ label }: { label: string }) => (
  <div className="label shadowed-text">
    {labels[label] ?? ''} {label}
  </div>
);

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 1200 }, items: 4 },
  desktop: { breakpoint: { max: 1199, min: 990 }, items: 3 },
  tablet: { breakpoint: { max: 989, min: 580 }, items: 2 },
  mobile: { breakpoint: { max: 579, min: 0 }, items: 1 },
};

export const DishPage = () => {
  const params = useParams();
  const { menuItems } = useMenu(params.id);
  const { menuItems: allMenus } = useMenu();
  const { language } = useLanguage();

  const [item] = menuItems;
  const [activeImage, setActiveImage] = useState<null | string>(null);

  if (!item || !allMenus.length) {
    return null;
  }

  const handleChangePreview = (image: string) => {
    setActiveImage((prev) => (prev === image ? null : image));
  };

  return (
    <div className={`dish-page page ${isMobile ? 'mobile' : ''}`}>
      <Helmet>{meta[language].menu}</Helmet>
      <div className="page_content">
        <div className="dish-page_content">
          <div className="image-block">
            <div className="image">
              <img src={activeImage ?? item.image} alt="" />
            </div>
            <div className="images-container">
              {item.images.map((el) => (
                <div
                  onClick={() => handleChangePreview(el.image)}
                  className={`image-preview-block ${el.image === activeImage ? 'active' : 'inactive'}`}
                >
                  <img key={el.thumb} src={el.thumb} alt="" />
                </div>
              ))}
            </div>
          </div>

          <div className="text">
            <div className="description header">
              <h2>{item.name}</h2>
              <h2 className="price">{item.price}</h2>
            </div>
            <div className="labels">
              {item.labels.map((label) => (
                <Label key={label} label={label} />
              ))}
            </div>

            <p>{language === 'en' ? item.descriptionEn : item.descriptionIt}</p>
          </div>
        </div>
        <ShadowHeader bigText="Other" smallText="menu" />
        <Carousel responsive={responsive}>
          {allMenus.map((menu) => (
            <div key={menu._id} className="carusel-item">
              <div className="image">
                <img src={menu.image} />
              </div>
              <div className="carusel-text">
                <div className="name">{menu.name}</div>
                <div className="description shadowed-text">
                  {cutString(language === 'en' ? menu.descriptionEn : menu.descriptionIt, 80)}
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};
