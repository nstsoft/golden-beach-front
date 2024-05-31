import './dish.scss';
import { isMobile } from 'react-device-detect';
import { useMenu } from 'hooks';
import { useParams } from 'react-router-dom';

export const DishPage = () => {
  const params = useParams();

  const { menuItems } = useMenu();
  console.log(params, menuItems);
  // console.log(params, menuItems);

  return (
    <div className={`dish-page page ${isMobile ? 'mobile' : ''}`}>
      <div className="page_content"></div>
      <h1>Dish</h1>
    </div>
  );
};
