import { DataGrid } from '@mui/x-data-grid';

export default function DataTable({rows, columns, style}) {
  return (
    <div style={{ ...style, height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}