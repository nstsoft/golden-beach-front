import './eventspage.scss';
import { CustomInput, CustomButton, EventItem } from 'components';
import { type ChangeEvent, useState } from 'react';
import { useEvents } from 'hooks';
import { groupItemsByMonth, EventType } from 'utils';
import moment from 'moment';

export const EventsPage = () => {
  const [search, setSearch] = useState('');
  const [selectedDate, setDate] = useState<Date | undefined>();
  const { events } = useEvents({ name: search, date: selectedDate, type: EventType.event });

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearch(e.target.value);
  };

  const handleChangeDate = () => {
    setDate((prev) => (prev ? undefined : new Date()));
  };

  const groups = Object.entries(groupItemsByMonth(events));

  return (
    <div className="page events-page">
      <div className="page_content">
        <CustomInput onChange={handleSearchChange} label="Search events" />
        <div className="button-container">
          <CustomButton onClick={handleChangeDate}>Today</CustomButton>
        </div>
        <div className="events-list">
          {groups.map(([date, eventsItems]) => (
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
