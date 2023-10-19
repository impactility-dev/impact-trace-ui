import { useMemo, useEffect, Fragment, useState, useRef, ChangeEvent } from 'react';
import { useNavigate } from 'react-router';

// material-ui
import {
  Box,
  Chip,
  LinearProgress,
  LinearProgressProps,
  Tabs,
  Tab,
  Grid,
  Typography,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useMediaQuery,
  Tooltip,
  Button,
  Dialog
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

// third-party
import {
  useExpanded,
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
  Column,
  HeaderGroup,
  Row,
  Cell,
  HeaderProps
} from 'react-table';
import { DeleteTwoTone, EditTwoTone, EyeTwoTone, FileDoneOutlined, InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import Avatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';
import InvoiceCard from 'components/cards/invoice/InvoiceCard';
import InvoiceChart from 'components/cards/invoice/InvoiceChart';
import { CSVExport, HeaderSort, IndeterminateCheckbox, TablePagination, TableRowSelection } from 'components/third-party/ReactTable';
import AlertColumnDelete from 'sections/apps/kanban/Board/AlertColumnDelete';

import { dispatch, useSelector } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { alertPopupToggle, getInvoiceDelete, getInvoiceList } from 'store/reducers/invoice';
import { renderFilterTypes, GlobalFilter, DateColumnFilter } from 'utils/react-table';

// types
import { InvoiceList } from 'types/invoice';
import { PaletteColor } from '@mui/material';
import { PopupTransition } from 'components/@extended/Transitions';
import AddCustomer from 'sections/apps/customer/AddCustomer';

interface InvoiceWidgets {
  title: string;
  count: string;
  percentage: number;
  isLoss: boolean;
  invoice: string;
  color: PaletteColor;
  chartData: number[];
}

const avatarImage = require.context('assets/images/users', true);

// ==============================|| REACT TABLE ||============================== //

interface Props {
  columns: Column[];
  data: InvoiceList[];
}

function ReactTable({ columns, data }: Props) {
  const theme = useTheme();
  const history = useNavigate();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  const defaultColumn = useMemo(() => ({ Filter: DateColumnFilter }), []);
  const filterTypes = useMemo(() => renderFilterTypes, []);
  const initialState = useMemo(
    () => ({
      filters: [{ id: 'status', value: '' }],
      hiddenColumns: ['avatar', 'email'],
      pageIndex: 0,
      pageSize: 5
    }),
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    gotoPage,
    setPageSize,
    state: { globalFilter, selectedRowIds, pageIndex, pageSize },
    preGlobalFilteredRows,
    setGlobalFilter,
    setFilter
  } = useTable(
    {
      columns,
      data,
      filterTypes,
      defaultColumn,
      initialState
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect
  );

  const componentRef: React.Ref<HTMLDivElement> = useRef(null);

  // ================ Tab ================

  const groups = ['All', ...new Set(data.map((item: InvoiceList) => item.status))];
  const countGroup = data.map((item: InvoiceList) => item.status);
  const counts = countGroup.reduce(
    (acc: any, value: any) => ({
      ...acc,
      [value]: (acc[value] || 0) + 1
    }),
    {}
  );

  const [activeTab, setActiveTab] = useState(groups[0]);

  useEffect(() => {
    setFilter('status', activeTab === 'All' ? '' : activeTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const [add, setAdd] = useState(false);

  const handleAdd = () => {
    setAdd(!add);
  }

  return (
    <>
      <Box sx={{ p: 3, pb: 0, width: '100%' }}>
        <Tabs
          value={activeTab}
          onChange={(e: ChangeEvent<{}>, value: string) => setActiveTab(value)}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          {groups.map((status: string, index: number) => (
            <Tab
              key={index}
              label={ status === 'All'
              ? "All"
              : status === 'Paid'
              ? "Invited"
              : status === 'Unpaid'
              ? "Halted"
              : "Removed"}
              value={status}
              icon={
                <Chip
                  label={
                    status === 'All'
                      ? data.length
                      : status === 'Paid'
                      ? counts.Paid
                      : status === 'Unpaid'
                      ? counts.Unpaid
                      : counts.Cancelled
                  }
                  color={status === 'All' ? 'primary' : status === 'Paid' ? 'success' : status === 'Unpaid' ? 'warning' : 'error'}
                  variant="light"
                  size="small"
                />
              }
              iconPosition="end"
            />
          ))}
        </Tabs>
      </Box>
      <Stack direction={matchDownSM ? 'column' : 'row'} spacing={1} justifyContent="space-between" alignItems="center" sx={{ p: 3, pb: 3 }}>
        <Stack direction={matchDownSM ? 'column' : 'row'} spacing={2}>
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            size="small"
          />
        </Stack>
        <Stack direction={matchDownSM ? 'column' : 'row'} alignItems="center" spacing={matchDownSM ? 1 : 0}>
          <TableRowSelection selected={Object.keys(selectedRowIds).length} />
          {headerGroups.map((group: HeaderGroup<{}>, index: number) => (
            <Stack direction={matchDownSM ? 'column' : 'row'} spacing={1} {...group.getHeaderGroupProps()}>
              {group.headers.map((column: HeaderGroup<{}>) => (
                <Box {...column.getHeaderProps([{ className: column.className }])}>{column.canFilter ? column.render('Filter') : null}</Box>
              ))}
            </Stack>
          ))}
           <Button variant="contained" startIcon={<PlusOutlined />} onClick={handleAdd}>
          Add Partner
        </Button>
        </Stack>
      </Stack>
      <Box ref={componentRef}>
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()} sx={{ '& > th:first-of-type': { width: '58px' } }}>
                {headerGroup.headers.map((column: HeaderGroup<{}>) => (
                  <TableCell {...column.getHeaderProps([{ className: column.className }])}>
                    <HeaderSort column={column} sort />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row: Row, i: number) => {
              prepareRow(row);
              return (
                <Fragment key={i}>
                  <TableRow
                    {...row.getRowProps()}
                    onClick={() => {
                      row.toggleRowSelected();
                    }}
                    sx={{ cursor: 'pointer', bgcolor: row.isSelected ? alpha(theme.palette.primary.lighter, 0.35) : 'inherit' }}
                  >
                    {row.cells.map((cell: Cell) => (
                      <TableCell {...cell.getCellProps([{ className: cell.column.className }])}>{cell.render('Cell')}</TableCell>
                    ))}
                  </TableRow>
                </Fragment>
              );
            })}
            <TableRow sx={{ '&:hover': { bgcolor: 'transparent !important' } }}>
              <TableCell sx={{ p: 2, py: 3 }} colSpan={9}>
                <TablePagination gotoPage={gotoPage} rows={rows} setPageSize={setPageSize} pageSize={pageSize} pageIndex={pageIndex} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
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
        <AddCustomer onCancel={handleAdd} />
      </Dialog>
    </>
  );
}

// ==============================|| INVOICE - LIST ||============================== //

const Partners = () => {
  const { lists, alertPopup } = useSelector((state) => state.invoice);

  useEffect(() => {
    if (lists.length === 0) {
      dispatch(getInvoiceList());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [list, setList] = useState<InvoiceList[]>([]);
  const [invoiceId, setInvoiceId] = useState(0);
  const [getInvoiceId, setGetInvoiceId] = useState(0);

  useEffect(() => {
    setList(lists);
  }, [lists]);

  const navigation = useNavigate();
  const handleClose = (status: boolean) => {
    if (status) {
      dispatch(getInvoiceDelete(invoiceId));
      dispatch(
        openSnackbar({
          open: true,
          message: 'Column deleted successfully',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
    }
    dispatch(
      alertPopupToggle({
        alertToggle: false
      })
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: 'Sr. No',
        accessor: 'id',
        className: 'cell-center',
        disableFilters: true
      },
      {
        Header: 'Business Name',
        accessor: 'customer_name',
        disableFilters: true,
        Cell: ({ row }: { row: Row }) => {
          const { values } = row;
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Avatar alt="Avatar" size="sm" src={avatarImage(`./avatar-${!values.avatar ? 1 : values.avatar}.png`)} />
              <Stack spacing={0}>
                <Typography variant="subtitle1">{values.customer_name}</Typography>
                <Typography variant="caption" color="textSecondary">
                  {values.email}
                </Typography>
              </Stack>
            </Stack>
          );
        }
      },
      {
        Header: 'Avatar',
        accessor: 'avatar',
        disableSortBy: true,
        disableFilters: true
      },
      {
        Header: 'Email',
        accessor: 'email',
        disableFilters: true
      },
      {
        Header: 'Registration Number',
        accessor: 'date'
      },
      {
        Header: 'Nature of Business',
        accessor: 'due_date'
      },
      {
        Header: 'Verifiers',
        accessor: 'quantity',
        disableFilters: true
      },
      {
        Header: 'Status',
        accessor: 'status',
        disableFilters: true,
        filter: 'includes',
        Cell: ({ value }: { value: string }) => {
          switch (value) {
            case 'Cancelled':
              return <Chip color="error" label="Removed" size="small" variant="light" />;
            case 'Paid':
              return <Chip color="success" label="Paid" size="small" variant="light" />;
            case 'Unpaid':
            default:
              return <Chip color="info" label="Unpaid" size="small" variant="light" />;
          }
        }
      },
      {
        Header: 'Actions',
        className: 'cell-center',
        disableSortBy: true,
        Cell: ({ row }: { row: Row<{}> }) => {
          return (
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
              <Tooltip title="View">
                <IconButton
                  color="secondary"
                  onClick={(e: any) => {
                    e.stopPropagation();
                    navigation(`/apps/invoice/details/${row.values.id}`);
                  }}
                >
                  <EyeTwoTone twoToneColor={theme.palette.secondary.main} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit">
                <IconButton
                  color="primary"
                  onClick={(e: any) => {
                    e.stopPropagation();
                    navigation(`/apps/invoice/edit/${row.values.id}`);
                  }}
                >
                  <EditTwoTone twoToneColor={theme.palette.primary.main} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  color="error"
                  onClick={(e: any) => {
                    e.stopPropagation();
                    setInvoiceId(row.values.id);
                    setGetInvoiceId(row.values.invoice_id); // row.original
                    dispatch(
                      alertPopupToggle({
                        alertToggle: true
                      })
                    );
                  }}
                >
                  <DeleteTwoTone twoToneColor={theme.palette.error.main} />
                </IconButton>
              </Tooltip>
            </Stack>
          );
        }
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const theme = useTheme();

  return (
    <>
      <MainCard content={false}>
        <ScrollX>
          <ReactTable columns={columns} data={list} />
        </ScrollX>
      </MainCard>
      <AlertColumnDelete title={`${getInvoiceId}`} open={alertPopup} handleClose={handleClose} />
    </>
  );
};



export default Partners;