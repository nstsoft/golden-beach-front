import { MenuItemType, http } from 'utils';
import { useRequest } from './useRequest';
import { useCallback } from 'react';

const imagePrefix = import.meta.env.VITE_BUCKET_URL;
type ImageUrls = {
  thumb: string;
  image: string;
};

type ReturnProps = {
  menuItems: MenuItemType[];
  isLoading: boolean;
  execute: (...args: unknown[]) => void;
  remove: (id: string | string[]) => Promise<unknown>;
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
          images: res.data.images.map((el: ImageUrls) => ({
            thumb: imagePrefix + el.thumb,
            image: imagePrefix + el.image,
          })),
        },
      ];
    }

    return res.data.data.map((image: MenuItemType) => ({
      ...image,
      thumb: imagePrefix + image.thumb,
      image: imagePrefix + image.image,
      images: image.images.map((el: ImageUrls) => ({
        thumb: imagePrefix + el.thumb,
        image: imagePrefix + el.image,
      })),
    }));
  } catch (err) {
    console.log(err);
  }
};

const deleteMenu = async (id: string | string[]) => {
  return http.delete('/api/v1/menu/' + (typeof id === 'string' ? id : 'many'), {
    data: { ids: id },
  });
};

export const useMenu = (id?: string): ReturnProps => {
  const { data, isLoading, execute } = useRequest<MenuItemType[]>(() => getMenus(id));

  const remove = useCallback(async (criteria: string | string[]) => {
    return deleteMenu(criteria);
  }, []);

  return { menuItems: data ?? [], isLoading, execute, remove };
};
