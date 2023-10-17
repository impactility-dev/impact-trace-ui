import { useMemo, useState } from 'react';

// material-ui
import { Button, Chip, Dialog, Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

// third-party
import { useTable, useFilters, useGlobalFilter, Column, Row, HeaderGroup, Cell } from 'react-table';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { CSVExport, EmptyTable } from 'components/third-party/ReactTable';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';

import makeData from 'data/react-table';
import {
  GlobalFilter,
  DefaultColumnFilter,
  SelectColumnFilter,
  SliderColumnFilter,
  NumberRangeColumnFilter,
  renderFilterTypes,
  filterGreaterThan
} from 'utils/react-table';
import { PlusOutlined } from '@ant-design/icons';
import { PopupTransition } from 'components/@extended/Transitions';
import { add } from 'date-fns';
import AddCustomer from 'sections/apps/customer/AddCustomer';
import AddProductionPlant from './modal';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data }: { columns: Column[]; data: [] }) {
  const filterTypes = useMemo(() => renderFilterTypes, []);
  const defaultColumn = useMemo(() => ({ Filter: DefaultColumnFilter }), []);
  const initialState = useMemo(() => ({ filters: [{ id: 'status', value: '' }] }), []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, preGlobalFilteredRows, setGlobalFilter } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState,
      filterTypes
    },
    useGlobalFilter,
    useFilters
  );

  const sortingRow = rows.slice(0, 10);

  const [add, setAdd] = useState(false);

  const handleAdd = () => {
    setAdd(!add);
  }

  return (
    <>
      <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ padding: 2 }}>
        <GlobalFilter preGlobalFilteredRows={preGlobalFilteredRows} globalFilter={state.globalFilter} setGlobalFilter={setGlobalFilter} />
        <Button variant="contained" startIcon={<PlusOutlined />} onClick={handleAdd}>
          Add Plant
        </Button>
      </Stack>

      <Table {...getTableProps()}>
        <TableHead sx={{ borderTopWidth: 2 }}>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: HeaderGroup) => (
                <TableCell {...column.getHeaderProps([{ className: column.className }])}>{column.render('Header')}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {headerGroups.map((group: HeaderGroup<{}>) => (
            <TableRow {...group.getHeaderGroupProps()}>
              {group.headers.map((column: HeaderGroup) => (
                <TableCell {...column.getHeaderProps([{ className: column.className }])}>
                  {column.canFilter ? column.render('Filter') : null}
                </TableCell>
              ))}
            </TableRow>
          ))}
          {sortingRow.length > 0 ? (
            sortingRow.map((row, i) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map((cell: Cell) => (
                    <TableCell {...cell.getCellProps([{ className: cell.column.className }])}>{cell.render('Cell')}</TableCell>
                  ))}
                </TableRow>
              );
            })
          ) : (
            <EmptyTable msg="No Data" colSpan={7} />
          )}
        </TableBody>
      </Table>

      <Dialog
        maxWidth="sm"
        TransitionComponent={PopupTransition}
        keepMounted
        fullWidth
        onClose={handleAdd}
        open={add}
        sx={{ '& .MuiDialog-paper': { p: 0 }, transition: 'transform 225ms' }}
        aria-describedby="alert-dialog-slide-description"
      >
        <AddProductionPlant onCancel={handleAdd} />
      </Dialog>
    </>
  );
}

// ==============================|| REACT TABLE - FILTERING ||============================== //

const ProductionPlantTable = () => {
  const data = useMemo(() => makeData(2000), []);

  const columns = useMemo(
    () =>
      [
        {
          Header: 'Date',
          accessor: 'firstName'
        },
        {
          Header: 'Batch No',
          accessor: 'lastName',
          filter: 'fuzzyText'
        },
        {
          Header: 'Product ID',
          accessor: 'email'
        },
        {
          Header: 'Product Name',
          accessor: 'age',
          className: 'cell-right',
          Filter: SliderColumnFilter,
          filter: 'equals'
        },
        {
          Header: 'Total Quantity',
          accessor: 'visits',
          className: 'cell-right',
          Filter: NumberRangeColumnFilter,
          filter: 'between'
        },
        // {
        //   Header: 'Status',
        //   accessor: 'status',
        //   Filter: SelectColumnFilter,
        //   filter: 'includes',
        //   Cell: ({ value }: { value: string }) => {
        //     switch (value) {
        //       case 'Complicated':
        //         return <Chip color="error" label="Complicated" size="small" variant="light" />;
        //       case 'Relationship':
        //         return <Chip color="success" label="Relationship" size="small" variant="light" />;
        //       case 'Single':
        //       default:
        //         return <Chip color="info" label="Single" size="small" variant="light" />;
        //     }
        //   }
        // },
        // {
        //   Header: 'Profile Progress',
        //   accessor: 'progress',
        //   Filter: SliderColumnFilter,
        //   filter: filterGreaterThan,
        //   Cell: ({ value }: { value: number }) => <LinearWithLabel value={value} sx={{ minWidth: 75 }} />
        // }
      ] as Column[],
    []
  );

  return (
    <MainCard content={false}>
      <ScrollX>
        <ReactTable columns={columns} data={data} />
      </ScrollX>
    </MainCard>
  );
};

export default ProductionPlantTable;
