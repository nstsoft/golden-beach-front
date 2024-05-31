import { useState, useEffect, useMemo } from 'react';
import Image1 from 'assets/hardcode/dish.jpeg';
import { MenuItem, http } from 'utils';
import { useRequest } from './useRequest';
console.log(useRequest);

const description =
  'Bruschetta is a culinary dish from Italy that consists of slices of toasted bread topped with ingredients such as tomatoes, onions, basil, olive oil, and Parmesan cheese. The bread used is typically Italian bread like ciabatta or baguette, which is toasted to a crisp on the outside but still soft on the inside. Bruschetta is commonly served as an appetizer or a light dessert. It has a fresh taste with a combination of flavors and textures, ranging from the acidity and sweetness of tomatoes to the fragrant aroma of basil and the savory taste of Parmesan cheese. To make it we need, Baguette bread, Ripe tomattoes, Fresh basil leaves, Garlic cloves, Extra virgin olive oil, Balsamic Vinegar, Salt and black pepper.';

const data: MenuItem[] = [
  {
    _id: '1',
    image: Image1,
    thumb: Image1,
    labels: ['soya', 'vegan'],
    price: '10$',
    name: 'Bruschete',
    type: 'Aperitizers',
    description,
  },
  {
    _id: '2',
    image: Image1,
    thumb: Image1,
    labels: ['soya', 'vegan'],
    price: '10$',
    name: 'Bruschete',
    type: 'Aperitizers',
    description,
  },
  {
    _id: '3',
    image: Image1,
    thumb: Image1,
    labels: ['soya', 'vegan'],
    price: '10$',
    name: 'Bruschete',
    type: 'Aperitizers',
    description,
  },
  {
    _id: '4',
    image: Image1,
    thumb: Image1,
    labels: ['soya', 'vegan'],
    price: '10$',
    name: 'Bruschete',
    type: 'Aperitizers',
    description,
  },
];

let isLoadingRequest = false;

type ReturnProps = {
  menuItems: MenuItem[];
  isLoading: boolean;
};

const getMenus = async (id?: string) => {
  if (isLoadingRequest) return [];

  isLoadingRequest = true;
  try {
    const res = await http.get(`/api/v1/menu/${id ?? ''}`);
    return res.data.data;
  } catch {
    return await Promise.resolve(data.filter((el) => (id ? el._id === id : true)));
  } finally {
    isLoadingRequest = false;
  }
};

export const useMenu = (id?: string): ReturnProps => {
  const [menuItems, setItems] = useState<MenuItem[]>([]);
  const [initialized, setInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    console.log('====pppppppppp=====');
  }, []);

  useEffect(() => {
    console.log('=========', initialized, id);
    if (!initialized) {
      setInitialized(true);
      setIsLoading(true);
      getMenus(id)
        .then((items) => {
          setItems(items);
          setIsLoading(false);
        })
        .catch((err) => console.error(err));
    }
  }, [id, initialized]);

  const menu = useMemo(() => menuItems, [menuItems]);
  const loading = useMemo(() => isLoading, [isLoading]);

  return { menuItems: menu, isLoading: loading };
};
