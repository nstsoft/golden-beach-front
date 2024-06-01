import './uploadMenu.scss';

import { isMobile } from 'react-device-detect';
import { FC, useState } from 'react';
import { Button, Box, Typography, TextField } from '@mui/material';
import { http } from 'utils';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export const UploadMenu: FC = () => {
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [descriptionIt, setDescriptionIt] = useState('');
  const [file, setFile] = useState<File>();
  const [notification, setNotification] = useState<string>();
  const [checkboxes, setCheckboxes] = useState({
    vegan: false,
    soya: false,
    gluten: false,
  });

  const handleAddFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setNotification(undefined);
    event.preventDefault();

    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();

    const labels = Object.entries(checkboxes)
      .filter(([, value]) => value)
      .map(([key]) => key);

    formData.append('file', file);
    formData.append('name', name);
    formData.append('labels', labels.toString());
    formData.append('price', price);
    formData.append('category', category);
    formData.append('descriptionEn', descriptionEn);
    formData.append('descriptionIt', descriptionIt);

    try {
      await http.post('/api/v1/menu', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setNotification('File uploaded successfully!');
      setTimeout(setNotification, 3000, undefined);
    } catch (err: unknown) {
      setNotification('Error uploading file.' + err);
      setTimeout(setNotification, 3000, undefined);
    }
  };

  const handleChangeLabels = (el: 'vegan' | 'soya' | 'gluten') => {
    setCheckboxes({ ...checkboxes, [el]: !checkboxes[el] });
  };

  return (
    <div className={`upload_menu ${isMobile ? 'mobile' : ''}`}>
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
          {notification ?? ' Add menu item'}
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
          <TextField
            className="item-member"
            label="Category"
            variant="outlined"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className="item">
          <TextField
            className="item-member"
            label="Price"
            variant="outlined"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="item">
          <FormGroup>
            <FormControlLabel
              control={<Checkbox onChange={() => handleChangeLabels('gluten')} />}
              label="Gluten"
              checked={checkboxes.gluten}
            />
            <FormControlLabel
              checked={checkboxes.soya}
              control={<Checkbox onChange={() => handleChangeLabels('soya')} />}
              label="Soya"
            />
            <FormControlLabel
              checked={checkboxes.vegan}
              control={<Checkbox onChange={() => handleChangeLabels('vegan')} />}
              label="Vegan"
            />
          </FormGroup>
        </div>

        <TextareaAutosize
          placeholder="English description"
          className="text-area"
          value={descriptionEn}
          onChange={(e) => setDescriptionEn(e.target.value)}
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
            <input type="file" hidden onChange={handleAddFile} />
          </Button>
          {file && <Typography variant="body1">Selected file: {file.name}</Typography>}
          <Button type="submit" variant="contained" color="primary">
            Upload
          </Button>
        </div>
      </Box>
    </div>
  );
};
