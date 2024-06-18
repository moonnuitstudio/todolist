import React from 'react'

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

import { ProjectType } from '../../../models/Project'
import { TaskType } from '../../../models/Task'

import useResponsive from '../../../hooks/useResponsive'
import useModal from '../../../hooks/useModal'
import useTasks from '../../../hooks/useTasks'
import useToken from '../../../hooks/useToken'
import useToast from '../../../hooks/useToast'

import { useAuth0 } from '@auth0/auth0-react'

// -----------------------

type Order = 'asc' | 'desc';

interface TaskTablePropsType {
    project?: null | ProjectType;
    useproject?: boolean;
}

const TaskTable = ({ project=null, useproject=false } : TaskTablePropsType ) => {
    const [loadingtable, setLoadingTable] = React.useState<boolean>(true)
    const [rows, setRows] = React.useState<TaskType[]>([])
    const [totalrows, setTotalRows] = React.useState<number>(0)
    
    const { token } = useToken()
    const { openModal } = useModal("taskmenu")
    const { isMobile } = useResponsive()

    const { isLoading, isAuthenticated } = useAuth0()

    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<string>('title');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const { getAllTasks, forceReloadTask, updateStarOnTask, deleteTaskNoReload, getAllTasksByProjectID, reload } = useTasks()
    const { showSuccessToast, showErrorToast } = useToast()

    const reloadTasksRows = () => {
        forceReloadTask()
        setLoadingTable(true)
    }

    const handleRequestSort = ( _event: React.MouseEvent<unknown>, property: string) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
        reloadTasksRows();
    }

    const emptyRows = React.useMemo<number>( () => (page > 0 )? rowsPerPage - rows.length : 0, [page, rowsPerPage, rows])

    const handleChangePage = (_event: unknown, newPage: number) => { 
        setPage(newPage)
        reloadTasksRows();
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
        reloadTasksRows();
    }

    const handleStartRow = (task:TaskType) => {
        updateStarOnTask(task.id, task.starred, (status) => {
            if (status) showSuccessToast("Task Updated")
            else showErrorToast("ERR")
        })
        setRows(rows.map(row => (row.id == task.id)? task : row))
    }

    const handleDeleteTask = (task:TaskType) => {
        deleteTaskNoReload(task.id, (status) => {
            if (status) {
                showSuccessToast("Task Deleted")
                reloadTasksRows()
            }
            else showErrorToast("ERR")
        })
    }

    React.useEffect(() => {
        forceReloadTask()
    }, [])

    React.useEffect(() => {
        if (useproject && project) {
            reloadTasksRows()
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [project, useproject])

    interface ITasksResponse {
        total: number;
        tasks: TaskType[]
    }

    React.useEffect(() => {
        if (isLoading || !isAuthenticated || !token || !reload) return

        const limit = rowsPerPage

        const handleStatus = (status:boolean, data:unknown) => {

            if (status) {
                if (data instanceof Object) {
                    const dataTask = (data as ITasksResponse)

                    setTotalRows(dataTask.total)
                    setRows(dataTask.tasks)

                    if (dataTask.tasks.length == 0 && page > 0) {
                        setPage(0)
                    }
                }
            }

            setLoadingTable(false)
        }

        if (useproject && project) getAllTasksByProjectID(token, project.id, { limit, page, orderBy, order}, handleStatus)
        else getAllTasks(token, { limit, page, orderBy, order}, handleStatus)

    }, [setPage, isLoading, isAuthenticated, getAllTasks, token, reload, rowsPerPage, page, orderBy, order, getAllTasksByProjectID, useproject, project])

    return (
        <Box sx={{ paddingTop: '10px', paddingBottom: '10px' }}>
            <Stack sx={{ width: '100%', paddingBottom: '10px', paddingTop: '5px', gap: '10px' }} flexDirection="row" justifyContent={isMobile? 'space-between' : 'flex-start'}>
                <Button sx={{ textTransform: 'capitalize !important' }} variant='outlined' startIcon={<AddCircleIcon />} onClick={() => { openModal() }}>Add Task</Button>
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
                                {[...Array(rowsPerPage)].map((_, i) => (<TableRow key={`id-skeleton-${i}`}><TableCell colSpan={6} style={{ padding: '2px 0px' }}><Skeleton variant="rectangular" width="100%" height={28} /></TableCell></TableRow>))}
                            </>) : (<>
                                {rows.map((row, index) => (<TaskRow key={row.id}  labelId={`table-task-row-${index}`} row={row} onChangeStar={handleStartRow} onDeleteTask={handleDeleteTask} />))}
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
                    count={totalrows}
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