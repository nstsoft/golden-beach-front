import './editEvent.scss';

import { isMobile } from 'react-device-detect';
import { FC, useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { EventType, http, type Event } from 'utils';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import moment, { Moment } from 'moment';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';

type Props = {
  selected: Event;
  onConfirmed?: () => void;
};

export const EditEvent: FC<Props> = ({ selected, onConfirmed }) => {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState<string>(selected.name);
  const [type, setType] = useState<string>(selected.type);
  const [date, setSelectedDate] = useState<Moment>(moment(selected.date));
  const [time, setSelectedTime] = useState<Moment>(moment(selected.date));

  const [descriptionIt, setDescriptionIt] = useState(selected.descriptionEng);
  const [descriptionEng, setDescriptionEng] = useState(selected.descriptionIt);

  const [notification, setNotification] = useState<string>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setNotification(undefined);
    event.preventDefault();

    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }

    formData.append('name', name);
    formData.append('descriptionIt', descriptionIt);
    formData.append('descriptionEng', descriptionEng);
    formData.append('type', type);
    const dateTime = moment(date).hour(time.hour()).minute(time.minute()).toISOString();

    formData.append('date', dateTime);

    try {
      await http.put('/api/v1/event/' + selected._id, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setNotification('File uploaded successfully!');
      setTimeout(setNotification, 3000, undefined);
    } catch (err: unknown) {
      setNotification('Error uploading file.' + err);
      setTimeout(setNotification, 3000, undefined);
    }
    onConfirmed?.();
  };
  return (
    <div className={`edit_event ${isMobile ? 'mobile' : ''}`}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '& .MuiTextField-root': { m: 1, maxWidth: '500px', width: '40%' },
          '& .MuiButton-root': { m: 2 },
        }}
      >
        <Typography variant="h5" component="h2" gutterBottom>
          {notification ?? 'Edit event'}
        </Typography>
        <div className="item">
          <TextField
            className="item-member"
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Select
            className="item-member"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type}
            label="Age"
            onChange={({ target }: SelectChangeEvent) => setType(target.value as EventType)}
          >
            <MenuItem value={EventType.event}>{EventType.event}</MenuItem>
            <MenuItem value={EventType.news}>{EventType.news}</MenuItem>
          </Select>
        </div>
        <div className="item">
          <DatePicker
            className="date-select item-member"
            label="Select Date"
            value={date}
            onChange={(newValue: Moment | null) => setSelectedDate(newValue ?? moment())}
          />
          <TimePicker
            className="date-select item-member"
            label="Select Time"
            value={time}
            onChange={(newValue: Moment | null) => setSelectedTime(newValue ?? moment())}
          />
        </div>

        <TextareaAutosize
          placeholder="English description"
          className="text-area"
          value={descriptionEng}
          onChange={(e) => setDescriptionEng(e.target.value)}
          required
          minRows={3}
        />
        <TextareaAutosize
          onChange={(e) => setDescriptionIt(e.target.value)}
          aria-label="minimum height"
          minRows={3}
          placeholder="Italian description"
          required
          className="text-area"
          value={descriptionIt}
        />
        <div className="item">
          <Button variant="contained" component="label">
            Select File
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
          {file && <Typography variant="body1">Selected file: {file.name}</Typography>}
          <Button type="submit" variant="contained" color="primary">
            Confirm
          </Button>
        </div>
      </Box>
    </div>
  );
};
