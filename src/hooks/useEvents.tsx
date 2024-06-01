import { EventType, type Event, http } from 'utils';
import moment from 'moment';
import { useRequest } from './useRequest';

const imagePrefix = import.meta.env.VITE_BUCKET_URL;

type Props = {
  name?: string;
  date?: Date;
  id?: string;
  type?: EventType;
};
const getEvents = async (props: Props = {}) => {
  const { id, ...params } = props;

  return http.get('/api/v1/event/' + (id ?? ''), { params }).then((res) => {
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

    return res.data.data.map((el: Event) => ({
      ...el,
      thumb: imagePrefix + el.thumb,
      image: imagePrefix + el.image,
      date: new Date(el.date),
    }));
  });
};

export const useEvents = (props: Props): { events: Event[] } => {
  const { data } = useRequest<Event[]>(() => getEvents(props));

  if (props.type === EventType.news) {
    return { events: data ?? [] };
  }

  let filtered = (data ?? []).filter((el) =>
    el.name.toLowerCase().includes(props?.name?.toLowerCase() || ''),
  );

  if (props.date) {
    filtered = filtered.filter((el) => moment(el.date).isSame(props.date, 'day'));
  }

  return { events: filtered };
};
