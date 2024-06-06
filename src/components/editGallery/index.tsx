import './editGallery.scss';

import { isMobile } from 'react-device-detect';
import { FC, useState } from 'react';
import { Button, Box, Typography, TextField, MenuItem } from '@mui/material';
import { http, ServiceType, GalleryItemType } from 'utils';
import Select, { type SelectChangeEvent } from '@mui/material/Select';

type Props = {
  selected: GalleryItemType[];
  onConfirmed?: () => void;
};

export const EditGallery: FC<Props> = ({ selected, onConfirmed }) => {
  const [album, setAlbum] = useState(selected[0]?.album ?? '');
  const [eventId, setEventId] = useState('');
  const [type, setType] = useState<string>(selected[0]?.type ?? '');

  const [notification, setNotification] = useState<string>();

  const handleSubmit = async () => {
    setNotification(undefined);

    const update = (item: GalleryItemType) => {
      return http.put('/api/v1/gallery/' + item._id, {
        album,
        type,
        event: eventId,
      });
    };

    await Promise.all(selected.map(update))
      .then(() => {
        setNotification('File uploaded successfully!');
        setTimeout(setNotification, 3000, undefined);
        onConfirmed?.();
      })
      .catch((err) => {
        setNotification('Error uploading file.' + err);
        setTimeout(setNotification, 3000, undefined);
      });
  };
  return (
    <div className={`upload_gallery ${isMobile ? 'mobile' : ''}`}>
      <Box>
        <Typography variant="h6">
          {notification ?? `Images in   ${selected[0].album} : `}
        </Typography>
        <div className="item">
          <TextField
            className="item-member"
            label="Album"
            variant="outlined"
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
          />

          <Select
            className="item-member"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type}
            label="Age"
            onChange={({ target }: SelectChangeEvent) => setType(target.value as ServiceType)}
          >
            <MenuItem value={ServiceType.beach}>{ServiceType.beach}</MenuItem>
            <MenuItem value={ServiceType.restaurant}>{ServiceType.restaurant}</MenuItem>
            <MenuItem value={ServiceType.club}>{ServiceType.club}</MenuItem>
          </Select>
        </div>
        <div className="item event">
          <TextField
            className="item-member"
            label="Event ID"
            variant="outlined"
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
          />
        </div>
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Confirm
          </Button>
        </Box>
      </Box>
    </div>
  );
};
