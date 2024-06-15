import React from 'react'

import { styled } from '@mui/system'

import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'

import Menu from '@mui/material/Menu'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'

import Divider from '@mui/material/Divider'

import IconButton from '@mui/material/IconButton'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import EditIcon from '@mui/icons-material/Edit'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import StarIcon from '@mui/icons-material/Star'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

import useResponsive from '../../../../hooks/useResponsive'

import Tooltip from '@mui/material/Tooltip'

import Swal from 'sweetalert2'

import { TaskType } from '../../../../models/Task'
import useModal from '../../../../hooks/useModal'

interface MousePositionType {
    x: number;
    y: number;
}

const CustomRow = styled(TableRow)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        
    }
}))

const CustomCell = styled(TableCell)(() => ({
    padding: '0px 5px'
}))

const MenuListItemIcon = styled(ListItemIcon)(() => ({
    '& svg': {
        fontSize: '1.2rem',
        color: 'rgba(0, 0, 0, .5) !important'
    } 
}))

const MenuListItemText = styled(ListItemText)(() => ({
    fontSize: '1rem',
    color: 'black !important'
}))

type OnChangeHandle = (task:unknown) => void

interface TaskRowPropsType {
    labelId: string;
    row: TaskType;
    onChangeStar?: null | OnChangeHandle;
    onDeleteTask?: null | OnChangeHandle;
}


const TaskRow = ({ labelId, row, onChangeStar=null, onDeleteTask=null }:TaskRowPropsType) => {
    const { openModal: openTaskMenu } = useModal("taskmenu")

    const { isTabletOrDesktop, isDesktopVersion } = useResponsive()

    const [mousePosition, setMousePosition] = React.useState<null | MousePositionType>(null);
    const openSubMenu = React.useMemo(() => Boolean(mousePosition), [mousePosition])

    const subMenuRealPosition = React.useMemo<MousePositionType>(() => {
        if (!openSubMenu) return { x:0, y:0 }
        if (!mousePosition) return { x: 0, y: 0 }

        return {
            x: mousePosition.x,
            y: mousePosition.y
        }
    }, [openSubMenu, mousePosition])

    const handleSubMenuClose = () => { setMousePosition(null); }

    const editOptionHandle = () => {
        setMousePosition(null)
        openTaskMenu(row)
    }

    const handleChangeStar = () => {
        row.starred = !row.starred
        onChangeStar?.(row)
        setMousePosition(null)
    }

    const handleDeleteTask = () => {
        setMousePosition(null)

        Swal.fire({
            icon: "question",
            title: "Do you want to delete this task?",
            text: "Once the task is deleted, you won't be able to recover it",
            showConfirmButton: false,
            showDenyButton: true,
            showCancelButton: true,
            denyButtonText: `Delete Task`
        }).then((result) => {
            if (result.isDenied) onDeleteTask?.(row)
        });
    }

    return (
        <>
        <CustomRow
            hover
            tabIndex={-1}
            sx={{ cursor: 'pointer' }}
            onDoubleClick={editOptionHandle}
            onContextMenu={(event) => {
                event.preventDefault()
                
                if (!openSubMenu) {
                    setMousePosition({
                        x: event.clientX,
                        y: event.clientY,
                    })
                }
            }}
        >
            <CustomCell component="th" id={labelId} scope="row" padding="none"> 
                <IconButton onClick={handleChangeStar} aria-label="starred" disableRipple>
                    {row.starred? (<StarIcon sx={{ fontSize: '1rem' }} />) : (<StarBorderIcon sx={{ fontSize: '1rem' }} />)}
                </IconButton>
                {row.title}
            </CustomCell>
            { isDesktopVersion && (<CustomCell sx={{ textTransform: 'capitalize' }} align="left" style={{ width: 130 }}>{ row.project && row.project instanceof Object && row.project.title}</CustomCell>) }
            { isDesktopVersion && (<CustomCell sx={{ textTransform: 'capitalize' }} align="left" style={{ width: 130 }}>{row.status}</CustomCell>) }
            { isTabletOrDesktop && (<CustomCell align="left" style={{ width: 160 }}>
                <Tooltip title={`${row.due_date} ${row.due_time}`} placement="left">
                    <span>{row.due_date}</span>
                </Tooltip>
            </CustomCell>) }
            <CustomCell align="right" style={{ width: 20 }}>
                <IconButton aria-label="edit" disableRipple onClick={editOptionHandle}><ArrowForwardIosIcon sx={{ fontSize: '1rem' }} /></IconButton>
            </CustomCell>
        </CustomRow>

        <Menu
            id={`sub-menu-${row.id}-${row.title}`}
            open={openSubMenu}
            onClose={handleSubMenuClose}
            MenuListProps={{ 'aria-labelledby': 'basic-button' }}
            anchorReference="anchorPosition"
            anchorPosition={{ top: subMenuRealPosition.y, left: subMenuRealPosition.x }}
        >
            <MenuList>
                <MenuItem onClick={editOptionHandle}>
                    <MenuListItemIcon>
                        <EditIcon sx={{ fontSize: '1rem' }} />
                    </MenuListItemIcon>
                    <MenuListItemText>Edit</MenuListItemText>
                </MenuItem>
                <MenuItem onClick={handleChangeStar}>
                    <MenuListItemIcon>
                        { row.starred? (<StarIcon sx={{ fontSize: '1rem' }}/>) : (<StarBorderIcon sx={{ fontSize: '1rem' }} />) }
                    </MenuListItemIcon>
                    <MenuListItemText>{ row.starred? "Remove as started" : "Mark as started" }</MenuListItemText>
                </MenuItem>
                <Divider/>
                <MenuItem onClick={handleDeleteTask}>
                    <MenuListItemIcon>
                        <DeleteForeverIcon sx={{ fontSize: '1rem' }} />
                    </MenuListItemIcon>
                    <MenuListItemText>Delete</MenuListItemText>
                </MenuItem>
            </MenuList>
        </Menu>
        </>
    )
}

export default TaskRow