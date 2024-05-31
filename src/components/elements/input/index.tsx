import './customInput.scss';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { FC, type ChangeEvent } from 'react';
import { SearchSvg } from 'assets/svg/header';

const Adornment = (
  <InputAdornment position="end">
    <SearchSvg />
  </InputAdornment>
);

type Props = {
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  label?: string;
};

export const CustomInput: FC<Props> = ({ onChange, label }) => {
  return (
    <FormControl className="custom-input-control" fullWidth sx={{ m: 1 }} variant="standard">
      <InputLabel className="custom-label" htmlFor="standard-adornment-amount">
        {label ?? 'Search'}
      </InputLabel>
      <Input
        className="custom-input"
        onChange={onChange}
        id="standard-adornment-amount"
        endAdornment={Adornment}
      />
    </FormControl>
  );
};
