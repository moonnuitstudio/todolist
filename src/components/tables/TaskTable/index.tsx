import React, { useState } from 'react'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'

import Paper from '@mui/material/Paper'

import TableContainer from '@mui/material/TableContainer' 
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TablePagination from '@mui/material/TablePagination'

import  Button from  '@mui/material/Button'
import  ButtonGroup from  '@mui/material/ButtonGroup'

import FilterListIcon from '@mui/icons-material/FilterList'
import AddCircleIcon from '@mui/icons-material/AddCircle'

import Skeleton from '@mui/material/Skeleton'

import EnhancedTableHead from './EnhancedTableHead'
import TaskRow from './TaskRow'

import { TaskType, createTableTask } from '../../../models/Task'

import useResponsive from '../../../hooks/useResponsive'
import useModal from '../../../hooks/useModal'
import useTasks from '../../../hooks/useTasks'
import useToken from '../../../hooks/useToken'

import { useAuth0 } from '@auth0/auth0-react'

// -----------------------

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

const TaskTable = () => {
    const [loadingtable, setLoadingTable] = React.useState(true)
    const [rows, setRows] = React.useState([])
    
    const { token } = useToken()
    const { openModal } = useModal("taskmenu")
    const { isMobile, isTabletOrDesktop } = useResponsive()

    const { isLoading, isAuthenticated } = useAuth0()

    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof TaskType>('title');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const { getAllTasks, forceReloadTask, reload } = useTasks()

    const handleRequestSort = ( event: React.MouseEvent<unknown>, property: keyof TaskType) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    }

    const visibleRows = React.useMemo<TaskType[]>( () => 
        stableSort<TaskType>([...rows], getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage ),
        [order, orderBy, page, rowsPerPage, rows]
    )

    const emptyRows = React.useMemo<number>( () => page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0, [page, rowsPerPage, rows])


    const handleChangePage = (event: unknown, newPage: number) => { setPage(newPage); }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    React.useEffect(() => {
        forceReloadTask()
    }, [])

    React.useEffect(() => {
        if (isLoading || !isAuthenticated || !token || !reload) return

        const limit = rowsPerPage

        getAllTasks(token, { limit }, (status, data) => {

            if (status) {
                console.log(data)
                setRows(data)
            }

            setLoadingTable(false)
        })
    }, [isLoading, isAuthenticated, getAllTasks, token, reload])

    return (
        <Box sx={{ paddingTop: '10px', paddingBottom: '10px' }}>
            <Stack sx={{ width: '100%', paddingBottom: '10px', paddingTop: '5px', gap: '10px' }} flexDirection="row">
                {isTabletOrDesktop && (<Button sx={{ textTransform: 'capitalize !important' }} variant='outlined' startIcon={<AddCircleIcon />} onClick={() => { openModal() }}>Add Task</Button>)}
                <ButtonGroup variant="text" >
                    <Button sx={{ padding: '5px 20px !important', minWidth: '60px !important' }} startIcon={<FilterListIcon />}>Filter</Button>
                </ButtonGroup>
            </Stack>
            <Paper sx={{ width: '100%', mb: 2, background: 'transparent', boxShadow: 'none !important' }}>
                <TableContainer sx={{ maxHeight: '500px' }}>
                    <Table 
                        aria-labelledby="taks-table"
                        size={'medium'}
                        stickyHeader 
                    >
                        <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort}  />
                        <TableBody>
                            {(isLoading || loadingtable)? (<>
                                <TableRow><TableCell colSpan={6} style={{ padding: '5px 0px' }}><Skeleton variant="rectangular" width="100%" height={25} /></TableCell></TableRow>
                                <TableRow><TableCell colSpan={6} style={{ padding: '5px 0px' }}><Skeleton variant="rectangular" width="100%" height={25} /></TableCell></TableRow>
                                <TableRow><TableCell colSpan={6} style={{ padding: '5px 0px' }}><Skeleton variant="rectangular" width="100%" height={25} /></TableCell></TableRow>
                                <TableRow><TableCell colSpan={6} style={{ padding: '5px 0px' }}><Skeleton variant="rectangular" width="100%" height={25} /></TableCell></TableRow>
                                <TableRow><TableCell colSpan={6} style={{ padding: '5px 0px' }}><Skeleton variant="rectangular" width="100%" height={25} /></TableCell></TableRow>
                                <TableRow><TableCell colSpan={6} style={{ padding: '5px 0px' }}><Skeleton variant="rectangular" width="100%" height={25} /></TableCell></TableRow>
                            </>) : (<>
                                {visibleRows.map((row, index) => (<TaskRow key={row.id}  labelId={`table-task-row-${index}`} row={row} />))}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: (33) * emptyRows, }} >
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </>)}
                        </TableBody>
                        
                    </Table>
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
        </Box>
    )
}

export default TaskTable