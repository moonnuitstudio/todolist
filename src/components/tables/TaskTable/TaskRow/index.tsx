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

import { TaskType } from '../../../../models/Task'

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

interface TaskRowPropsType {
    labelId: string;
    row: TaskType;
}


const TaskRow = ({ labelId, row }:TaskRowPropsType) => {

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
        //openModal(task)
    }

    return (
        <>
        <CustomRow
            hover
            tabIndex={-1}
            sx={{ cursor: 'pointer' }}
            onDoubleClick={() => {  }}
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
                <IconButton aria-label="starred" disableRipple><StarBorderIcon sx={{ fontSize: '1rem' }} /></IconButton>
                {row.title}
            </CustomCell>
            { isDesktopVersion && (<CustomCell sx={{ textTransform: 'capitalize' }} align="left" style={{ width: 130 }}>{ row.project && row.project instanceof Object && row.project.title}</CustomCell>) }
            { isDesktopVersion && (<CustomCell sx={{ textTransform: 'capitalize' }} align="left" style={{ width: 130 }}>{row.status}</CustomCell>) }
            { isTabletOrDesktop && (<CustomCell align="left" style={{ width: 160 }}>{row.due_date}</CustomCell>) }
            <CustomCell align="right" style={{ width: 20 }}>
                <IconButton aria-label="edit" disableRipple onClick={() => { /*openModal(row)*/ }}><ArrowForwardIosIcon sx={{ fontSize: '1rem' }} /></IconButton>
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
                <MenuItem>
                    <MenuListItemIcon>
                        { row.started? (<StarIcon sx={{ fontSize: '1rem' }}/>) : (<StarBorderIcon sx={{ fontSize: '1rem' }} />) }
                    </MenuListItemIcon>
                    <MenuListItemText>Mark as started</MenuListItemText>
                </MenuItem>
                <Divider/>
                <MenuItem>
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