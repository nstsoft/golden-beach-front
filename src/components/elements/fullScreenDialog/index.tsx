import './dialog.scss';
import { Fragment, FC, ReactNode } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Transition } from './transition';

type Props = {
  onClose: () => void;
  name: string;
  children: ReactNode;
  isOpen?: boolean;
  className?: string;
};

export const FullScreenDialog: FC<Props> = ({ children, onClose, isOpen, className }) => {
  return (
    <Fragment>
      <Dialog
        style={{ background: '#222222' }}
        className={`custom_dialog ${className}`}
        fullScreen
        open={!!isOpen}
        onClose={onClose}
        TransitionComponent={Transition}
        classes={{ paper: 'dialog_paper' }}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar className="toolbar">
            <Button autoFocus color="inherit" onClick={onClose}>
              close
            </Button>
          </Toolbar>
        </AppBar>
        <div className="dialog_content">{children}</div>
      </Dialog>
    </Fragment>
  );
};
