import './editGallery.scss';

import { isMobile } from 'react-device-detect';
import { FC, useState } from 'react';
import { Button, Box, Typography, TextField, MenuItem } from '@mui/material';
import { http, ServiceType, GalleryItemType } from 'utils';
import Select, { type SelectChangeEvent } from '@mui/material/Select';

type Props = {
  selected: GalleryItemType;
  onConfirmed?: () => void;
};

export const EditGallery: FC<Props> = ({ selected, onConfirmed }) => {
  const [album, setAlbum] = useState(selected.album);
  const [eventId, setEventId] = useState('');
  const [type, setType] = useState<string>(selected.type);

  const [notification, setNotification] = useState<string>();

  const handleSubmit = async () => {
    setNotification(undefined);

    try {
      await http.put('/api/v1/gallery/' + selected._id, {
        album,
        type,
        event: eventId,
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
    <div className={`upload_gallery ${isMobile ? 'mobile' : ''}`}>
      <Box>
        <Typography variant="h6">{notification ?? 'Upload photo to gallery'}</Typography>
        <div className="item">
          <TextField
            className="item-member"
            label="Album"
            variant="outlined"
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
          />
          <TextField
            className="item-member"
            label="Event ID"
            variant="outlined"
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
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
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Confirm
          </Button>
        </Box>
      </Box>
    </div>
  );
};
