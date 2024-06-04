import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import { useMenu } from 'hooks';
import Button from '@mui/material/Button';
import { FullScreenDialog, EditMenu, UploadMenu } from 'components';

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
    width: 100,
    renderCell: (params) => <img style={{ height: '100%' }} src={params.row.thumb} />,
  },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'category', headerName: 'Category', width: 150 },
  { field: 'labels', headerName: 'labels', width: 150 },
  { field: 'price', headerName: 'Price', width: 70 },
  { field: 'descriptionEn', headerName: 'Eng description', width: 150 },
  { field: 'descriptionIt', headerName: 'It description', width: 150 },
];

export const MenuTab = () => {
  const { menuItems, isLoading, execute, remove } = useMenu();
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
      execute();
      setSelected([]);
    });
  };

  const onConfirmed = () => {
    setIsOpenDialogEdit(false);
    setIsOpenDialogAdd(false);
    execute();
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
        autoHeight
        checkboxSelection
        rows={menuItems.map((el) => ({ ...el, id: el._id }))}
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
        <UploadMenu onConfirmed={onConfirmed} />
      </FullScreenDialog>
      <FullScreenDialog
        name="Edit"
        onClose={() => {
          setIsOpenDialogEdit(false);
        }}
        isOpen={isOpenDialogEdit}
      >
        <EditMenu
          onConfirmed={onConfirmed}
          selected={menuItems.find((el) => selected[0] === el._id) ?? menuItems[0]}
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
