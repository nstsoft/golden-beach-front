import { http, GalleryItemType, ServiceType } from 'utils';
import { useRequest } from './useRequest';

const imagePrefix = import.meta.env.VITE_BUCKET_URL;
type DataType = { _id: string; image: GalleryItemType; count: number };
type ReturnProps = {
  albums: DataType[];
  isLoading: boolean;
  execute: (...args: unknown[]) => void;
};

type Props = {
  name?: string;
  type?: ServiceType | null;
};
const getAlbums = async (props: Props) => {
  try {
    const { data } = await http.get(`/api/v1/gallery/albums`, {
      params: props,
    });
    return data.map((el: DataType) => ({
      _id: el._id,
      count: el.count,
      image: {
        ...el.image,
        image: imagePrefix + el.image.image,
        thumb: imagePrefix + el.image.thumb,
      },
    }));
  } catch (err) {
    console.log(err);
  }
};

export const useAlbum = (props: Props): ReturnProps => {
  const { data, isLoading, execute } = useRequest<DataType[]>(() => getAlbums(props));

  const sorted = data?.sort((a, b) => (b._id > a._id ? 1 : -1));

  return { albums: sorted ?? [], isLoading, execute };
};
