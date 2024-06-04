import * as React from 'react'

import { styled } from '@mui/system'

import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'

import Paper from '@mui/material/Paper'

import { TableTaskType, createTableTask } from '../../../models/Task'

import EnhancedTableHead from './EnhancedTableHead'
import EnhancedTableToolbar from './EnhancedTableToolbar'

import ToDoRow from './ToDoRow'

import { useResizeDetector } from 'react-resize-detector'

import useResponsive from '../../../hooks/useResponsive'

const ToDoTableBody = styled(Table)(({ theme }) => ({
    minWidth: 750,
    [theme.breakpoints.down('md')]: {
        minWidth: 0,
    },
}))

// ------------------------------------------------------------------
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
    createTableTask(2, 'Cupcake 1', '02/21/2024', false, 'default', false),
    createTableTask(3, 'Cupcake 2', '02/21/2024', false, 'default', false),
    createTableTask(4, 'Cupcake 3', '02/21/2024', false, 'default', false),
    createTableTask(5, 'Cupcake 4', '02/21/2024', false, 'default', false),
    createTableTask(6, 'Cupcake 5', '02/21/2024', false, 'default', false),
    createTableTask(7, 'Cupcake 6', '02/21/2024', false, 'default', false),
    createTableTask(8, 'Cupcake 7', '02/21/2024', false, 'default', false),
    createTableTask(9, 'Cupcake 8', '02/21/2024', false, 'default', false),
    createTableTask(10, 'Cupcake 9', '02/21/2024', false, 'default', false),
];

interface ToDoTablePropsType {
    containerheight: number | undefined
}

export default function ToDoTable({ containerheight } : ToDoTablePropsType ) {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof TableTaskType>('title');
    const [selected, setSelected] = React.useState<readonly number[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const { ref: filterContainerRef, height: filterContainerHeight } = useResizeDetector<HTMLElement>()

    const { isMobile } = useResponsive()
    //
    const tableHeight = React.useMemo(() => {

        const offset = filterContainerHeight? filterContainerHeight : 0

        if (isMobile) return (containerheight? containerheight - 140: 200) - offset

        return (containerheight? containerheight - 250: 400) - offset
    }, [containerheight, isMobile, filterContainerHeight])

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
        <Paper sx={{ width: '100%', mb: 2, background: 'transparent', boxShadow: 'none !important' }}>
            <EnhancedTableToolbar filterRef={filterContainerRef} numSelected={selected.length} />
            <TableContainer sx={{ maxHeight: tableHeight }}>
                <ToDoTableBody
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

                        return (<ToDoRow key={row.id} isItemSelected={isItemSelected} labelId={`enhanced-table-checkbox-${index}`} row={row} handleClick={handleClick} />);
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
                </ToDoTableBody>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={isMobile? [] : [5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
