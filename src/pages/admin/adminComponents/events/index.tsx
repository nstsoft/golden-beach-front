import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import { useEvents } from 'hooks';
import { EventType } from 'utils';
import moment from 'moment';
import Button from '@mui/material/Button';
import { FullScreenDialog, UploadEvent, EditEvent } from 'components';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const columns: GridColDef[] = [
  { field: '_id', headerName: 'ID', width: 210 },
  {
    field: 'thumb',
    headerName: 'image',
    width: 50,
    renderCell: (params) => <img style={{ height: '100%' }} src={params.row.thumb} />,
  },
  {
    field: 'date',
    headerName: 'Date',
    width: 150,
    valueGetter: (_, row) => moment(row.date).format('DD.MM.YYYY HH:mm'),
  },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'descriptionEng', headerName: 'Eng description', width: 150 },
  { field: 'descriptionIt', headerName: 'It description', width: 150 },
];

export const EventsTab = () => {
  const { events, count, isLoading, execute, remove } = useEvents({
    type: EventType.event,
  });
  const [type, setType] = useState(EventType.event);
  const [isOpenDialogAdd, setIsOpenDialogAdd] = useState(false);
  const [isOpenDialogEdit, setIsOpenDialogEdit] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [confirmDeletion, setConfirmDeletion] = useState(false);

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  const onConfirmed = () => {
    setIsOpenDialogEdit(false);
    setIsOpenDialogAdd(false);
    execute({ type });
  };

  const deleteItems = () => {
    remove(selected).then(() => {
      execute({ type });
      setSelected([]);
    });
  };

  return (
    <div style={{ minHeight: 400, width: '100%' }}>
      <Button
        className={`button ${type === EventType.event ? 'active' : ''}`}
        onClick={() => {
          execute({ type: EventType.event });
          setType(EventType.event);
        }}
      >
        Event
      </Button>
      <Button
        className={`button ${type === EventType.news ? 'active' : ''}`}
        onClick={() => {
          execute({ type: EventType.news });
          setType(EventType.news);
        }}
      >
        News
      </Button>
      <Button
        className={`button`}
        onClick={() => {
          setIsOpenDialogAdd(true);
        }}
      >
        Add item
      </Button>
      <Button
        className={`button`}
        onClick={() => {
          setIsOpenDialogEdit(true);
        }}
        disabled={selected.length !== 1}
      >
        Edit selected
      </Button>
      <Button
        className={`button`}
        disabled={!selected.length}
        onClick={() => {
          setConfirmDeletion(true);
        }}
      >
        Delete selected
      </Button>
      <DataGrid
        rowCount={count}
        autoHeight
        checkboxSelection
        rows={events.map((el) => ({ ...el, id: el._id }))}
        columns={columns}
        pageSizeOptions={[10, 25, 50]}
        loading={isLoading}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setSelected(newRowSelectionModel as string[]);
        }}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
        }}
      />

      <FullScreenDialog
        name="Upload"
        onClose={() => {
          setIsOpenDialogAdd(false);
        }}
        isOpen={isOpenDialogAdd}
      >
        <UploadEvent onConfirmed={onConfirmed} />
      </FullScreenDialog>
      <FullScreenDialog
        name="Edit"
        onClose={() => {
          setIsOpenDialogEdit(false);
        }}
        isOpen={isOpenDialogEdit}
      >
        <EditEvent
          onConfirmed={onConfirmed}
          selected={events.find((el) => selected[0] === el._id) ?? events[0]}
        />
      </FullScreenDialog>
      <Modal
        open={confirmDeletion}
        onClose={() => setConfirmDeletion(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete {selected.length} items ?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Button onClick={() => setConfirmDeletion(false)}>Cancel</Button>
            <Button
              onClick={() => {
                deleteItems();
                setConfirmDeletion(false);
              }}
            >
              Delete
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};
