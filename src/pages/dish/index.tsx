import './dish.scss';
import { isMobile } from 'react-device-detect';
import { useMenu } from 'hooks';
import { useParams } from 'react-router-dom';
import { ShadowHeader } from 'components';
import Carousel from 'react-multi-carousel';
import { cutString } from 'utils';
import { SoyaSvg, VeganSvg, GlutenSvg } from 'assets/svg';

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
  mobile: { breakpoint: { max: 579, min: 0 }, items: 2 },
};

export const DishPage = () => {
  const params = useParams();

  const { menuItems } = useMenu(params.id);
  const { menuItems: allMenus } = useMenu();

  const [item] = menuItems;
  if (!item || !allMenus.length) {
    return null;
  }

  return (
    <div className={`dish-page page ${isMobile ? 'mobile' : ''}`}>
      <div className="page_content">
        <div className="dish-page_content">
          <div className="image">
            <img src={item.image} alt="" />
          </div>
          <div className="text">
            <div className="description header">
              <h2>{item.name}</h2>
              <h2>{item.price}</h2>
            </div>
            <div className="labels">
              {item.labels.map((label) => (
                <Label label={label} />
              ))}
            </div>

            <p>{item.description}</p>
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
                <div className="description shadowed-text">{cutString(menu.description, 100)}</div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};
