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
import { http, ImageTypeEnum } from 'utils';
import Select, { type SelectChangeEvent } from '@mui/material/Select';

export const UploadGallery: FC = () => {
  // const [file, setFile] = useState<File | null>(null);
  const [label, setLabel] = useState<string>('');
  const [type, setType] = useState<string>(ImageTypeEnum.beach);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const [notification, setNotification] = useState<string>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    console.log(files, selectedFiles);
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

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append('files', file);
    });
    formData.append('label', label);
    formData.append('type', type);

    try {
      await http.post('/api/v1/gallery', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setNotification('File uploaded successfully!');
      setTimeout(setNotification, 3000, undefined);
    } catch (err: unknown) {
      setNotification('Error uploading file.' + err);
      setTimeout(setNotification, 3000, undefined);
    }
  };
  return (
    <div className={`upload_gallery ${isMobile ? 'mobile' : ''}`}>
      <Box>
        <Typography variant="h6">{notification ?? 'Upload photo to gallery'}</Typography>
        <div className="item">
          <TextField
            className="item-member"
            label="Custom label"
            variant="outlined"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            required
          />
          <Select
            className="item-member"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type}
            label="Age"
            onChange={({ target }: SelectChangeEvent) => setType(target.value as ImageTypeEnum)}
          >
            <MenuItem value={ImageTypeEnum.beach}>{ImageTypeEnum.beach}</MenuItem>
            <MenuItem value={ImageTypeEnum.restaurant}>{ImageTypeEnum.restaurant}</MenuItem>
            <MenuItem value={ImageTypeEnum.club}>{ImageTypeEnum.club}</MenuItem>
          </Select>
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
          <Typography variant="body1">{selectedFiles.length} file(s) selected</Typography>
          <List>
            {selectedFiles.length > 0 &&
              Array.from(selectedFiles).map((file, index) => (
                <ListItem key={index}>
                  <ListItemText primary={file.name} />
                </ListItem>
              ))}
          </List>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={selectedFiles.length === 0}
          >
            Upload
          </Button>
        </Box>
      </Box>
    </div>
  );
};
