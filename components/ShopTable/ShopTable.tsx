import * as React from 'react';
import {
  DataGrid,
  GridColDef,
  GridSelectionModel,
  GridToolbarContainer,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

export const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', type: 'number', width: 70 },
  {
    field: 'displayName',
    headerName: '店家名稱',
    sortable: false,
    editable: true,
    width: 90,
  },
  {
    field: 'address',
    headerName: '地址',
    sortable: false,
    editable: true,
    width: 130,
  },
  {
    field: 'phoneNumber',
    headerName: '電話',
    sortable: false,
    editable: true,
    width: 90,
  },
  {
    field: 'ownerName',
    headerName: '負責人名稱',
    sortable: false,
    width: 90,
    valueGetter: (params: GridValueGetterParams) =>
      params.row.owner?.displayName || '',
  },
  {
    field: 'ownerDescription',
    headerName: '負責人簡介',
    sortable: false,
    width: 130,
    valueGetter: (params: GridValueGetterParams) =>
      params.row.owner?.description || '',
  },
];

interface EditToolbarProps {
  onDelete?: () => void;
  deleteDisabled?: boolean;
}

function EditToolbar(props: EditToolbarProps) {
  const handleDeleteClick = () => {
    if (props.onDelete) {
      props.onDelete();
    }
  };

  return (
    <GridToolbarContainer>
      <Button
        color="primary"
        startIcon={<DeleteIcon />}
        onClick={handleDeleteClick}
        disabled={props.deleteDisabled ?? false}
      >
        刪除
      </Button>
    </GridToolbarContainer>
  );
}

export default function ShopTable({
  rows,
  loading,
  onDeleteMany,
}: {
  rows: any[];
  loading: boolean;
  onDeleteMany?: (ids: number[]) => void;
}) {
  const [selectionModel, setSelectionModel] =
    React.useState<GridSelectionModel>([]);

  const handleDeleteMany = () => {
    if (onDeleteMany) {
      onDeleteMany(selectionModel as number[]);
    }
  };

  const deleteDisabled = selectionModel.length === 0;

  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rows}
        loading={loading}
        columns={columns}
        pageSize={rows.length}
        rowsPerPageOptions={[rows.length]}
        experimentalFeatures={{ newEditingApi: false }}
        checkboxSelection
        components={{
          Toolbar: EditToolbar,
        }}
        componentsProps={{
          toolbar: { onDelete: handleDeleteMany, deleteDisabled },
        }}
        onSelectionModelChange={(nextSelectionModel) => {
          setSelectionModel(nextSelectionModel);
        }}
        selectionModel={selectionModel}
      />
    </div>
  );
}
