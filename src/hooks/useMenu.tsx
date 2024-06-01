import { MenuItemType, http } from 'utils';
import { useRequest } from './useRequest';

const imagePrefix = import.meta.env.VITE_BUCKET_URL;

type ReturnProps = {
  menuItems: MenuItemType[];
  isLoading: boolean;
};

const getMenus = async (id?: string) => {
  try {
    const res = await http.get(`/api/v1/menu/${id ?? ''}`);
    if (!Array.isArray(res.data.data)) {
      return [
        {
          ...res.data,
          thumb: imagePrefix + res.data.thumb,
          image: imagePrefix + res.data.image,
          date: new Date(res.data.date),
        },
      ];
    }

    return res.data.data.map((el: MenuItemType) => ({
      ...el,
      thumb: imagePrefix + el.thumb,
      image: imagePrefix + el.image,
    }));
  } catch (err) {
    console.log(err);
  }
};

export const useMenu = (id?: string): ReturnProps => {
  const { data, isLoading } = useRequest<MenuItemType[]>(() => getMenus(id));
  return { menuItems: data ?? [], isLoading };
};
