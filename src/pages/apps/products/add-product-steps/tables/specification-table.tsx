import { useMemo } from 'react';

// material-ui
import { Button, Chip, Grid, Stack, Table, TableBody, TableCell, TableFooter, TableHead, TableRow, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// third-party
import { useTable, Column, HeaderGroup, Cell } from 'react-table';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';

// types
import { ThemeMode } from 'types/config';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data }: { columns: Column[]; data: [] }) {
  const { getTableProps, getTableBodyProps, headerGroups, footerGroups, rows, prepareRow } = useTable({
    columns,
    data
  });

  const theme = useTheme();

  return (
    <>
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup: HeaderGroup<{}>) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: HeaderGroup<{}>) => (
                <TableCell {...column.getHeaderProps([{ className: column.className }])}>{column.render('Header')}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell: Cell<{}, any>) => (
                  <TableCell {...cell.getCellProps([{ className: cell.column.className }])}>{cell.render('Cell')}</TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter sx={{ backgroundColor: 'white' }}>
          {footerGroups.map((group) => (
            <TableRow {...group.getFooterGroupProps()}>
              {group.headers.map((column: HeaderGroup) => (
                <TableCell {...column.getFooterProps([{ className: column.className }])}>
                  <TextField
                    placeholder={column.Footer?.toString()}
                    name="userInfo"
                    onChange={(e) => {

                    }}
                    sx={{
                      '& .MuiOutlinedInput-input': {
                        py: 0.75,
                        px: 1,
                        backgroundColor: theme.palette.mode === ThemeMode.DARK ? 'inherit' : 'common.white'
                      }
                    }}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableFooter>
      </Table>
      <Grid item xs={12}>
        <Stack direction="row" spacing={2} justifyContent="right" alignItems="center" sx={{ m: 4 }}>
          <Button variant="outlined" color="secondary">
            + Specification
          </Button>
        </Stack>
      </Grid>
    </>
  );
}

// ==============================|| REACT TABLE - FOOTER ||============================== //

const SpecificationTable = ({ data }: { data: [] }) => {
  const columns = useMemo(
    () => [
      {
        Header: 'Specification Name',
        Footer: 'Specification Name',
        accessor: 'specificationname'
      },
      {
        Header: 'Value',
        Footer: 'Value',
        accessor: 'value'
      },
      {
        Header: 'Unit',
        Footer: 'Unit',
        accessor: 'unit'
      }
    ],
    []
  );

  return (
    <MainCard content={false} >
      <ScrollX>
        <ReactTable columns={columns} data={data} />
      </ScrollX>
    </MainCard>
  );
};

export default SpecificationTable;
