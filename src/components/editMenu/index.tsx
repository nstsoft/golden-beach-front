import './editMenu.scss';

import { isMobile } from 'react-device-detect';
import { FC, useState } from 'react';
import { Button, Box, Typography, TextField } from '@mui/material';
import { http, MenuItemType } from 'utils';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

type Props = {
  selected: MenuItemType;
  onConfirmed?: () => void;
};

export const EditMenu: FC<Props> = ({ selected, onConfirmed }) => {
  const [category, setCategory] = useState(selected.category);
  const [name, setName] = useState(selected.name);
  const [price, setPrice] = useState(selected.price);
  const [descriptionEn, setDescriptionEn] = useState(selected.descriptionEn);
  const [descriptionIt, setDescriptionIt] = useState(selected.descriptionIt);
  const [file, setFile] = useState<File>();
  const [notification, setNotification] = useState<string>();
  const [checkboxes, setCheckboxes] = useState({
    vegan: selected.labels.includes('vegan'),
    soya: selected.labels.includes('soya'),
    gluten: selected.labels.includes('gluten'),
  });

  const handleAddFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setNotification(undefined);
    event.preventDefault();

    const formData = new FormData();

    const labels = Object.entries(checkboxes)
      .filter(([, value]) => value)
      .map(([key]) => key);

    if (file) {
      formData.append('file', file);
    }

    formData.append('name', name);
    formData.append('labels', labels.toString());
    formData.append('price', price);
    formData.append('category', category);
    formData.append('descriptionEn', descriptionEn);
    formData.append('descriptionIt', descriptionIt);

    try {
      await http.put('/api/v1/menu/' + selected._id, formData, {
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

  const handleChangeLabels = (el: 'vegan' | 'soya' | 'gluten') => {
    setCheckboxes({ ...checkboxes, [el]: !checkboxes[el] });
  };

  return (
    <div className={`edit-menu ${isMobile ? 'mobile' : ''}`}>
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
          {notification ?? 'Edit menu'}
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
          minRows={3}
        />
        <TextareaAutosize
          onChange={(e) => setDescriptionIt(e.target.value)}
          aria-label="minimum height"
          minRows={3}
          placeholder="Italian description"
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
            Confirm
          </Button>
        </div>
      </Box>
    </div>
  );
};
