import './eventspage.scss';
import { CustomInput, CustomButton, EventItem } from 'components';
import { type ChangeEvent, useState, useEffect } from 'react';
import { useEvents, useLanguage } from 'hooks';
import { groupItemsByMonth, EventType, Event } from 'utils';
import moment from 'moment';

export const EventsPage = () => {
  const [search, setSearch] = useState('');
  const { events, execute } = useEvents({ type: EventType.event });
  const [eventsData, setEventsData] = useState<null | Event[]>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (eventsData == null && events.length) {
      setEventsData(events);
    }
  }, [events, eventsData]);

  useEffect(() => {
    execute({ name: search, type: EventType.event }).then(() => {
      setEventsData(events);
    });
  }, [events.length, execute, search, setEventsData]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearch(e.target.value);
  };

  const handleChangeDate = (type: 'today' | 'week' | 'all') => {
    if (type === 'all') {
      setEventsData(events);
    }
    if (type === 'today') {
      setEventsData(events.filter((event) => moment(event.date).isSame(moment(), 'day')));
    }
    if (type === 'week') {
      setEventsData(events.filter((event) => moment(event.date).isSame(moment(), 'week')));
    }
  };

  const groups = Object.entries(groupItemsByMonth(eventsData ?? []));
  const sorted = groups.sort((a, b) => (moment(b[0]).isAfter(moment(a[0])) ? 1 : -1));

  return (
    <div className="page events-page">
      <div className="page_content">
        <CustomInput onChange={handleSearchChange} label={t('events.search')} />
        <div className="button-container">
          <CustomButton onClick={() => handleChangeDate('today')}>{t('events.today')}</CustomButton>{' '}
          <CustomButton onClick={() => handleChangeDate('week')}>{t('events.week')}</CustomButton>
          <CustomButton onClick={() => handleChangeDate('all')}>{t('events.all')}</CustomButton>
        </div>
        <div className="events-list">
          {sorted.map(([date, eventsItems]) => (
            <div className="event-list-container" key={date}>
              <div className="list-header">
                <div className="date">{moment(date).format('MMMM YYYY')}</div>
                <div className="line"></div>
              </div>
              {eventsItems.map((event) => (
                <EventItem key={event._id} event={event} type="event" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
