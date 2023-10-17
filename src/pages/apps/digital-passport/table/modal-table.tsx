// material-ui
import { Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// third-party
import { LabelKeyObject } from 'react-csv/components/CommonPropTypes';

// project imports
import MainCard from 'components/MainCard';
import { CSVExport } from 'components/third-party/ReactTable';

// table data
function createData(name: string, calories: string, fat: string, carbs: string, protein: string) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('M123', 'Plastic', 'HDPE', 'KG', '100'),
  createData('M124', 'Aluminium', 'AL256', 'KG', '50'),
  createData('M125 ', 'MS Metal', 'SS202', 'KG', '50'),

];

export const header: LabelKeyObject[] = [
  { label: 'Dessert (100g serving)', key: 'name' },
  { label: 'Calories (g)', key: 'calories' },
  { label: 'Fat (g)', key: 'fat' },
  { label: 'Carbs (g)', key: 'carbs' },
  { label: 'Protein (g)', key: 'protein' },
  { label: 'Protein (g)', key: 'protein' },
  { label: 'Protein (g)', key: 'protein' }
];

// ==============================|| MUI TABLE - BASIC ||============================== //

export default function ModalBatchTable() {
  return (
      <TableContainer>
        <Table sx={{ minWidth: 350 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ pl: 3 }}>Material Code</TableCell>
              <TableCell align="left">Material Name</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="center">Unit</TableCell>
              <TableCell align="center">Total Qty</TableCell>
              <TableCell align="center">Invoice No.</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow hover key={row.name}>
                <TableCell sx={{ pl: 3 }} component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.calories}</TableCell>
                <TableCell align="left">{row.fat}</TableCell>
                <TableCell align="center">{row.carbs}</TableCell>
                <TableCell align="center">{row.protein}</TableCell>
                <TableCell align="center">
                  {/* add dropdown */}
                  <Select
                    native
                    variant="outlined"
                    inputProps={{
                      name: 'age',
                      id: 'outlined-age-native-simple'
                    }}
                  >
                    <option value="" />
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                  </Select>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
}
