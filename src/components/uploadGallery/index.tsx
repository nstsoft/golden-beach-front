import './uploadGallery.scss';

import { isMobile } from 'react-device-detect';
import { FC, useState, type MouseEvent } from 'react';
import {
  Button,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  MenuItem,
} from '@mui/material';
import { http, ServiceType, splitByChunks } from 'utils';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import CircularProgress from '@mui/material/CircularProgress';

type Props = {
  onConfirmed?: () => void;
};

export const UploadGallery: FC<Props> = ({ onConfirmed }) => {
  const [album, setAlbum] = useState<string>('');
  const [eventId, setEventId] = useState<string>('');
  const [type, setType] = useState<string>(ServiceType.beach);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [notification, setNotification] = useState<string>();
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFiles((prev) => prev.concat(...files));
    }
  };

  const handleSubmit = async (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    setNotification(undefined);
    event.preventDefault();

    if (!selectedFiles) {
      alert('Please select a file to upload.');
      return;
    }

    const chunks = splitByChunks(selectedFiles, 3);

    const upload = async (files: File[]) => {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('files', file);
      });
      formData.append('album', album);
      formData.append('type', type);
      formData.append('event', eventId);
      formData.append('eventId', 'eventId');

      return http.post('/api/v1/gallery', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    };

    setIsUploading(true);

    await Promise.all(chunks.map(upload))
      .then(() => {
        setNotification('File uploaded successfully!');
        setTimeout(setNotification, 3000, undefined);
        setIsUploading(false);
        onConfirmed?.();
      })
      .catch((err) => {
        setIsUploading(false);
        setNotification('Error uploading file.' + err);
        setTimeout(setNotification, 3000, undefined);
      });
  };
  return (
    <div className={`upload_gallery ${isMobile ? 'mobile' : ''}`}>
      <Box>
        <Typography variant="h6">{notification ?? 'Upload new album '}</Typography>
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
        <input
          accept="*"
          id="file-input"
          multiple
          type="file"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <label htmlFor="file-input">
          <Button variant="contained" component="span">
            Select Files
          </Button>
        </label>
        <Box mt={2}>
          <Typography className="selected-files-count" variant="body1">
            {selectedFiles.length} file(s) selected
          </Typography>

          <List>
            {selectedFiles.length > 0 &&
              Array.from(selectedFiles).map((file, index) => (
                <ListItem key={index}>
                  <ListItemText primary={file.name} />
                </ListItem>
              ))}
          </List>

          {isUploading ? (
            <CircularProgress />
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={selectedFiles.length === 0}
            >
              Upload
            </Button>
          )}
        </Box>
      </Box>
    </div>
  );
};
