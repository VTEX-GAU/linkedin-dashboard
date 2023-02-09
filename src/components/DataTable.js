import { DataGrid } from '@mui/x-data-grid';

export default function DataTable({rows, columns, style, pageSize=5}) {
  return (
    <div style={{ ...style, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}