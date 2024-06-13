import './menu.scss';
import { useLanguage, useMenu } from 'hooks';
import { MenuItemType, cutString } from 'utils';
import { CustomButton } from 'components';
import { DownloadSvg } from 'assets/svg';

import { Link } from 'react-router-dom';

const groupMenuItems = (items: MenuItemType[]) => {
  const groups = items.reduce(
    (acc, item) => {
      const { category } = item;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    },
    {} as Record<string, MenuItemType[]>,
  );

  return Object.entries(groups).map(([type, menus]) => ({ type, items: menus }));
};

export const SpecialMenu = () => {
  const { menuItems } = useMenu();
  const groups = groupMenuItems(menuItems);
  const { language, t } = useLanguage();

  const menusGroup = (data: { type: string; items: MenuItemType[] }) => {
    return (
      <div className="menu-group" key={data.type}>
        <h2 className="white-header-text">{data.type}</h2>
        <div className="menu-items">
          {data.items.map((item) => (
            <div className="menu-item" key={item._id}>
              <img src={item.thumb} alt={item.name} />
              <div className="text">
                <div className="header_description">
                  <div className="head">
                    <div className="name">{item.name}</div>
                    <div className="price">{item.price}</div>
                  </div>
                  <div className="description shadowed-text">
                    {cutString(language === 'en' ? item.descriptionEn : item.descriptionIt, 100)}
                  </div>
                </div>

                <div className="see-more unstyled-link">
                  <Link className="unstyled-link" to={'menu/' + item._id}>
                    {t('descriptionPage.restaurant.detailsMenu')}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="special-menu">
      <div className="groups">{groups.map(menusGroup)}</div>
      <div className="button-container">
        <a
          className="unstyled-link"
          rel="nofollow"
          href="https://i.my-all.it/goldenbeach/menu/goldenbeach"
        >
          <CustomButton>
            <DownloadSvg />
            {t('descriptionPage.restaurant.seeMenu')}
          </CustomButton>
        </a>
      </div>
    </section>
  );
};
