import { useState, useEffect, useCallback } from 'react';
import Image1 from 'assets/hardcode/gallery/1.png';
import Image2 from 'assets/hardcode/gallery/2.png';
import Image3 from 'assets/hardcode/gallery/3.png';
import Image4 from 'assets/hardcode/gallery/4.png';
import Image5 from 'assets/hardcode/gallery/5.png';
import { GalleryItemType, ImageTypeEnum } from 'src/utils';

import { http } from 'utils';

const data: GalleryItemType[] = [
  { _id: '1', image: Image1, thumb: Image1, label: 'party', type: ImageTypeEnum.beach },
  { _id: '2', image: Image2, thumb: Image2, label: 'party', type: ImageTypeEnum.beach },
  { _id: '3', image: Image3, thumb: Image3, label: 'party', type: ImageTypeEnum.beach },
  { _id: '4', image: Image4, thumb: Image4, label: 'party', type: ImageTypeEnum.beach },
  { _id: '5', image: Image5, thumb: Image5, label: 'party', type: ImageTypeEnum.beach },
  { _id: '6', image: Image1, thumb: Image1, label: 'party', type: ImageTypeEnum.beach },
  { _id: '7', image: Image2, thumb: Image2, label: 'party', type: ImageTypeEnum.beach },
  { _id: '8', image: Image3, thumb: Image3, label: 'party', type: ImageTypeEnum.beach },
  { _id: '9', image: Image1, thumb: Image1, label: 'party', type: ImageTypeEnum.beach },
  { _id: '10', image: Image1, thumb: Image1, label: 'party', type: ImageTypeEnum.beach },
  { _id: '11', image: Image1, thumb: Image1, label: 'party', type: ImageTypeEnum.beach },
  { _id: '12', image: Image1, thumb: Image1, label: 'party', type: ImageTypeEnum.beach },
  { _id: '13', image: Image1, thumb: Image1, label: 'party', type: ImageTypeEnum.beach },
  { _id: '14', image: Image1, thumb: Image1, label: 'party', type: ImageTypeEnum.beach },
  { _id: '15', image: Image1, thumb: Image1, label: 'party', type: ImageTypeEnum.beach },
];

type Props = {
  skip: number;
  limit?: number;
  type?: ImageTypeEnum | null;
  loadMore?: boolean;
  label?: string;
  concatPages?: boolean;
  search?: string;
};

type ReturnProps = {
  galleryItems: GalleryItemType[];
  loadMore: () => void;
  isLoading: boolean;
};

const getImages = async (props: Props) => {
  try {
    const res = await http.get('/api/v1/gallery', {
      params: props,
    });
    return res.data.data;
  } catch {
    return await Promise.resolve(
      data.filter((el) => (props.type ? el.type === props.type : true)).slice(0, props.limit),
    );
  }
};

export const useGallery = (props: Props): ReturnProps => {
  const [galleryItems, setItems] = useState<GalleryItemType[]>([]);
  const [skip, setSkip] = useState(props.skip);
  const [loaded, setLoaded] = useState(skip);
  const [type, setType] = useState(props.type);
  const [initialized, setInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState(props.search);

  const loadImaged = useCallback(() => {
    getImages(props)
      .then((items) => {
        setItems((prev) => (props.concatPages ? prev.concat(items) : items));
        setLoaded(skip);
      })
      .catch((err) => console.error(err));
  }, [props, setItems, setLoaded, skip]);

  useEffect(() => {
    if (type !== props.type) {
      setItems([]);
      setType(props.type);
      setSkip(0);
      loadImaged();
    }
  }, [loadImaged, props.type, type]);

  useEffect(() => {
    if (initialized) return;
    setIsLoading(true);
    getImages(props)
      .then((items) => {
        setItems(items);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));

    setInitialized(true);
    setLoaded(skip);
  }, [props, setItems, setLoaded, skip, initialized, setInitialized]);

  useEffect(() => {
    if (loaded < skip) {
      loadImaged();
    }
  }, [skip, loadImaged, loaded]);

  useEffect(() => {
    if (props.search !== search && initialized && !isLoading) {
      setItems([]);
      setSkip(0);
      setSearch(props.search);
      loadImaged();
    }
  }, [initialized, isLoading, loadImaged, props.search, search]);

  const loadMore = () => {
    setSkip(skip + (props.limit || 0));
  };

  return { galleryItems, loadMore, isLoading };
};
