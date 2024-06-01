import * as React from 'react'

import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'

import IconButton from '@mui/material/IconButton'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye'

import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'

import { TableTaskType, createTableTask } from '../../../modes/Task'

import EnhancedTableHead from './EnhancedTableHead'
import EnhancedTableToolbar from './EnhancedTableToolbar'

import { useResizeDetector } from 'react-resize-detector'

type Order = 'asc' | 'desc';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getComparator<Key extends keyof any>( order: Order, orderBy: Key ): ( a: { [key in Key]: number | string }, b: { [key in Key]: number | string } ) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    
    return stabilizedThis.map((el) => el[0]);
}

const rows = [
    createTableTask(1, 'Cupcake', '02/21/2024', false, 'default', false),
];

export default function ToDoTable() {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof TableTaskType>('title');
    const [selected, setSelected] = React.useState<readonly number[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const { height: tableBoxHeight, ref: tableBoxRef } = useResizeDetector();

    const tableHeight = React.useMemo(() => tableBoxHeight? tableBoxHeight - 250: 400, [tableBoxHeight])

    const handleRequestSort = ( event: React.MouseEvent<unknown>, property: keyof TableTaskType) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }

        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: readonly number[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => { setPage(newPage); };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    const isSelected = (id: number) => selected.indexOf(id) !== -1;

  
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo<TableTaskType[]>( () => 
        stableSort<TableTaskType>([...rows], getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage ),
        [order, orderBy, page, rowsPerPage]
    );

    return (
        <Box ref={tableBoxRef} sx={{ width: '100%'}}>
            <Paper sx={{ width: '100%', mb: 2, background: 'transparent', boxShadow: 'none !important' }}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer sx={{ maxHeight: tableHeight }}>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                        stickyHeader 
                    >
                        <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                        />
                        <TableBody>
                        {visibleRows.map((row, index) => {
                            const isItemSelected = isSelected(row.id);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                            <TableRow
                                hover
                                role="checkbox"
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                key={row.id}
                                selected={isItemSelected}
                                sx={{ cursor: 'pointer' }}
                            >
                                <TableCell padding="checkbox">
                                <Checkbox
                                    color="primary"
                                    checked={isItemSelected}
                                    inputProps={{
                                    'aria-labelledby': labelId,
                                    }}
                                    onClick={(event) => handleClick(event, row.id)}
                                />
                                </TableCell>
                                <TableCell
                                component="th"
                                id={labelId}
                                scope="row"
                                padding="none"
                                >
                                {row.title}
                                </TableCell>
                                <TableCell sx={{ textTransform: 'capitalize' }} align="left" style={{ width: 300 }} >{row.project}</TableCell>
                                <TableCell align="left" style={{ width: 160 }} >{row.due}</TableCell>
                                <TableCell align="right" style={{ width: 160 }} >
                                    <IconButton aria-label="delete">
                                        <PanoramaFishEyeIcon />
                                    </IconButton>
                                    <IconButton aria-label="delete">
                                        <StarBorderIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                            );
                        })}
                        {emptyRows > 0 && (
                            <TableRow
                            style={{
                                height: (53) * emptyRows,
                            }}
                            >
                            <TableCell colSpan={6} />
                            </TableRow>
                        )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}
