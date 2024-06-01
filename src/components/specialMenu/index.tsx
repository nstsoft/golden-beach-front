import './menu.scss';
import { useMenu } from 'hooks';
import { MenuItemType, cutString } from 'utils';
import { CustomButton } from 'components';
import { DownloadSvg } from 'assets/svg';
import menuPdf from 'assets/menu.pdf';

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

const menusGroup = (data: { type: string; items: MenuItemType[] }) => {
  return (
    <div className="menu-group" key={data.type}>
      <h2>{data.type}</h2>
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
                  {cutString(item.descriptionEn, 100)}
                </div>
              </div>

              <div className="see-more unstyled-link">
                <Link className="unstyled-link" to={'menu/' + item._id}>
                  Details menu
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const SpecialMenu = () => {
  const { menuItems } = useMenu();
  const groups = groupMenuItems(menuItems);

  const handleDownload = () => {
    const pdfUrl = `${window.location.origin}${menuPdf}`;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'menu.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="special-menu">
      <div className="groups">{groups.map(menusGroup)}</div>
      <div className="button-container">
        <CustomButton onClick={handleDownload}>
          <DownloadSvg />
          Download menu
        </CustomButton>
      </div>
    </section>
  );
};
