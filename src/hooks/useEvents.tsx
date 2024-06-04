import { EventType, type Event, http } from 'utils';
import { useRequest } from './useRequest';
import { useCallback } from 'react';

const imagePrefix = import.meta.env.VITE_BUCKET_URL;

type Props = {
  name?: string;
  date?: Date;
  id?: string;
  type?: EventType;
  skip?: number;
  limit?: number;
  event?: string;
};

type ReturnProps = {
  events: Event[];
  count: number;
  execute: (...args: unknown[]) => Promise<void>;
  isLoading: boolean;
  remove: (id: string | string[]) => Promise<unknown>;
};
const getEvents = async (props: Props = {}) => {
  const { id, skip = 0, limit = 999999, ...params } = props;
  try {
    const response = await http.get('/api/v1/event/' + (id ?? ''), {
      params: { skip, limit, ...params },
    });
    let data = [];
    if (!Array.isArray(response.data.data)) {
      data = [
        {
          ...response.data,
          thumb: imagePrefix + response.data.thumb,
          image: imagePrefix + response.data.image,
          date: new Date(response.data.date),
        },
      ];
    } else {
      data = response.data.data.map((el: Event) => ({
        ...el,
        thumb: imagePrefix + el.thumb,
        image: imagePrefix + el.image,
        date: new Date(el.date),
      }));
    }

    return { data, count: response.data.count ?? 0 };
  } catch (err) {
    console.error(err);
  }
};

const deleteEvents = async (id: string | string[]) => {
  return http.delete('/api/v1/event/' + (typeof id === 'string' ? id : 'many'), {
    data: { ids: id },
  });
};

export const useEvents = (props: Props): ReturnProps => {
  const { data, execute, isLoading } = useRequest<{ data: Event[]; count: number } | undefined>(
    getEvents,
    props,
  );

  const remove = useCallback(async (id: string | string[]) => {
    return deleteEvents(id);
  }, []);

  if (props.type === EventType.news) {
    return { events: data?.data ?? [], execute, count: data?.count ?? 0, isLoading, remove };
  }

  const filtered = (data?.data ?? []).filter((el) =>
    el.name.toLowerCase().includes(props?.name?.toLowerCase() || ''),
  );

  return { events: filtered, execute, count: data?.count ?? 0, isLoading, remove };
};
