import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import { useGallery } from 'hooks';
import Button from '@mui/material/Button';
import { FullScreenDialog, EditGallery, UploadGallery } from 'components';

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
    width: 70,
    renderCell: (params) => <img style={{ height: '100%' }} src={params.row.thumb} />,
  },
  { field: 'type', headerName: 'Type', width: 150 },
  { field: 'album', headerName: 'Album', width: 150 },
  { field: 'event', headerName: 'Event', width: 150 },
];

export const GalleryTab = () => {
  const { galleryItems, count, execute, remove } = useGallery({ skip: 0 });
  const [isOpenDialogAdd, setIsOpenDialogAdd] = useState(false);
  const [isOpenDialogEdit, setIsOpenDialogEdit] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [confirmDeletion, setConfirmDeletion] = useState(false);

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  const deleteItems = () => {
    remove(selected).then(() => {
      execute({ skip: 0 });
      setSelected([]);
    });
  };

  const onConfirmed = () => {
    execute({ skip: 0 });
    setIsOpenDialogAdd(false);
    setIsOpenDialogEdit(false);
  };

  return (
    <div style={{ minHeight: 400, width: '100%' }}>
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
        rows={galleryItems.map((el) => ({ ...el, id: el._id }))}
        columns={columns}
        pageSizeOptions={[10, 25, 50]}
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
        <UploadGallery onConfirmed={onConfirmed} />
      </FullScreenDialog>
      <FullScreenDialog
        name="Edit"
        onClose={() => {
          setIsOpenDialogEdit(false);
        }}
        isOpen={isOpenDialogEdit}
      >
        <EditGallery
          onConfirmed={onConfirmed}
          selected={galleryItems.find((el) => selected[0] === el._id) ?? galleryItems[0]}
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
