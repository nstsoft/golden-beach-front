import { useState, useEffect, useCallback } from 'react';
import { GalleryItemType, ServiceType } from 'src/utils';
import { http } from 'utils';

const imagePrefix = import.meta.env.VITE_BUCKET_URL;

type Props = {
  skip: number;
  limit?: number;
  type?: ServiceType | null;
  loadMore?: boolean;
  label?: string;
  concatPages?: boolean;
  search?: string;
  album?: string;
  event?: string;
};

type ReturnProps = {
  galleryItems: GalleryItemType[];
  loadMore: () => void;
  isLoading: boolean;
  count: number;
  execute: (props: Props) => void;
  remove: (ids: string | string[]) => Promise<unknown>;
};

const getImages = async ({ skip = 0, limit = 99999, ...props }: Props) => {
  return http
    .get('/api/v1/gallery', {
      params: {
        skip,
        limit,
        ...props,
      },
    })
    .then((res) => ({
      count: res.data.count,
      items: res.data.data.map((el: GalleryItemType) => ({
        ...el,
        thumb: imagePrefix + el.thumb,
        image: imagePrefix + el.image,
      })),
    }));
};

const deleteImages = async (id: string | string[]) => {
  return http.delete('/api/v1/gallery/' + (typeof id === 'string' ? id : 'many'), {
    data: { ids: id },
  });
};

export const useGallery = (props: Props): ReturnProps => {
  const [galleryItems, setItems] = useState<GalleryItemType[]>([]);
  const [skip, setSkip] = useState(props.skip);
  const [loaded, setLoaded] = useState(skip);
  const [type, setType] = useState(props.type);
  const [initialized, setInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState(props.search);
  const [countData, setCount] = useState(0);

  const loadImages = useCallback(() => {
    getImages({ skip, limit: props.limit, type: props.type, search, event: props.event })
      .then(({ items, count }) => {
        setItems((prev) => (props.concatPages ? prev.concat(items) : items));
        setLoaded(skip);
        setCount(count);
      })
      .catch((err) => console.error(err));
  }, [skip, props.type, props.limit, props.event, props.concatPages, search]);

  const execute = useCallback(
    (criteria: Props) => {
      getImages(criteria)
        .then(({ items, count }) => {
          setItems((prev) => (props.concatPages ? prev.concat(items) : items));
          setLoaded(skip);
          setCount(count);
        })
        .catch((err) => console.error(err));
    },
    [skip, props.concatPages],
  );

  const remove = useCallback((ids: string | string[]) => {
    return deleteImages(ids);
  }, []);

  useEffect(() => {
    if (type !== props.type) {
      setItems([]);
      setType(props.type);
      setSkip(0);
      loadImages();
    }
  }, [loadImages, props.type, type]);

  useEffect(() => {
    if (initialized) return;
    setIsLoading(true);

    getImages(props)
      .then(({ items, count }) => {
        setItems(items);
        setIsLoading(false);
        setCount(count);
      })
      .catch((err) => console.error(err));

    setInitialized(true);
    setLoaded(skip);
  }, [props, setItems, setLoaded, skip, initialized, setInitialized]);

  useEffect(() => {
    if (loaded < skip) {
      loadImages();
    }
  }, [skip, loadImages, loaded]);

  useEffect(() => {
    if (props.search !== search && initialized && !isLoading) {
      setItems([]);
      setSkip(0);
      setSearch(props.search);
      loadImages();
    }
  }, [initialized, isLoading, loadImages, props.search, search]);

  const loadMore = () => {
    setSkip(skip + (props.limit || 0));
  };

  return { galleryItems, loadMore, isLoading, count: countData, execute, remove };
};
