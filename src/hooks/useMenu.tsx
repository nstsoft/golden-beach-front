import Image1 from 'assets/hardcode/dish.jpeg';
import { MenuItem, http } from 'utils';
import { useRequest } from './useRequest';

const description =
  'Bruschetta is a culinary dish from Italy that consists of slices of toasted bread topped with ingredients such as tomatoes, onions, basil, olive oil, and Parmesan cheese. The bread used is typically Italian bread like ciabatta or baguette, which is toasted to a crisp on the outside but still soft on the inside. Bruschetta is commonly served as an appetizer or a light dessert. It has a fresh taste with a combination of flavors and textures, ranging from the acidity and sweetness of tomatoes to the fragrant aroma of basil and the savory taste of Parmesan cheese. To make it we need, Baguette bread, Ripe tomattoes, Fresh basil leaves, Garlic cloves, Extra virgin olive oil, Balsamic Vinegar, Salt and black pepper.';

const imagesList: MenuItem[] = [
  {
    _id: '1',
    image: Image1,
    thumb: Image1,
    labels: ['soya', 'vegan', 'gluten'],
    price: '10$',
    name: 'Bruschete',
    type: 'Aperitizers',
    description,
  },
  {
    _id: '2',
    image: Image1,
    thumb: Image1,
    labels: ['soya', 'vegan', 'gluten'],
    price: '10$',
    name: 'Bruschete',
    type: 'Aperitizers',
    description,
  },
  {
    _id: '3',
    image: Image1,
    thumb: Image1,
    labels: ['soya', 'vegan', 'gluten'],
    price: '10$',
    name: 'Bruschete',
    type: 'Aperitizers',
    description,
  },
  {
    _id: '4',
    image: Image1,
    thumb: Image1,
    labels: ['soya', 'vegan', 'gluten'],
    price: '10$',
    name: 'Bruschete',
    type: 'Aperitizers',
    description,
  },
  {
    _id: '5',
    image: Image1,
    thumb: Image1,
    labels: ['soya', 'vegan', 'gluten'],
    price: '10$',
    name: 'Bruschete',
    type: 'Aperitizers',
    description,
  },
  {
    _id: '6',
    image: Image1,
    thumb: Image1,
    labels: ['soya', 'vegan', 'gluten'],
    price: '10$',
    name: 'Bruschete',
    type: 'Aperitizers',
    description,
  },
  {
    _id: '7',
    image: Image1,
    thumb: Image1,
    labels: ['soya', 'vegan', 'gluten'],
    price: '10$',
    name: 'Bruschete',
    type: 'Aperitizers',
    description,
  },
];

type ReturnProps = {
  menuItems: MenuItem[];
  isLoading: boolean;
};

const getMenus = async (id?: string) => {
  try {
    const res = await http.get(`/api/v1/menu/${id ?? ''}`);
    return res.data.data;
  } catch {
    return await Promise.resolve(imagesList.filter((el) => (id ? el._id === id : true)));
  }
};

export const useMenu = (id?: string): ReturnProps => {
  const { data, isLoading } = useRequest<MenuItem[]>(() => getMenus(id));

  return { menuItems: data ?? [], isLoading };
};
