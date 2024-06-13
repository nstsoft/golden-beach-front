import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import { useGallery } from 'hooks';
import Button from '@mui/material/Button';
import { FullScreenDialog, EditGallery, UploadGallery } from 'components';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { GalleryItemType } from 'utils';

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

const albumColumns: GridColDef[] = [
  { field: 'name', headerName: 'name', width: 210 },
  {
    field: 'items',
    headerName: 'Img',
    width: 70,
    renderCell: (params) => <img style={{ height: '100%' }} src={params.row.items[0].thumb} />,
  },
  {
    field: 'count',
    headerName: 'Count',
    width: 150,
    renderCell: (params) => params.row.items.length,
  },
  {
    field: 'event',
    headerName: 'Event',
    width: 250,
    renderCell: (params) => params.row.items[0].event,
  },
];

export const GalleryTab = () => {
  const { galleryItems, execute, remove } = useGallery({ skip: 0 });
  const [isOpenDialogAdd, setIsOpenDialogAdd] = useState(false);
  const [isOpenDialogEdit, setIsOpenDialogEdit] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [confirmDeletion, setConfirmDeletion] = useState(false);

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  const albumsMap = galleryItems.reduce(
    (acc, el) => {
      if (!acc[el.album]) {
        acc[el.album] = [];
      }
      acc[el.album].push(el);
      return acc;
    },
    {} as { [key: string]: GalleryItemType[] },
  );

  const albums = Object.entries(albumsMap).map(([key, value]) => ({
    name: key,
    items: value,
    count: value.length,
    id: key,
  }));

  const deleteItems = () => {
    const ids = galleryItems.filter((el) => selected.includes(el.album)).map((el) => el._id);
    remove(ids).then(() => {
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
        rowCount={albums.length}
        autoHeight
        checkboxSelection
        rows={albums}
        columns={albumColumns}
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
        <EditGallery onConfirmed={onConfirmed} selected={albumsMap[selected[0]] ?? []} />
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
