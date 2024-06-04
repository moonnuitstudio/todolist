import React from 'react'

import { styled } from '@mui/system'

import Menu from '@mui/material/Menu'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'

import EditIcon from '@mui/icons-material/Edit'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye'
import StarIcon from '@mui/icons-material/Star'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import DeleteIcon from '@mui/icons-material/Delete';

import Divider from '@mui/material/Divider'

import { TableTaskType } from '../../../models/Task'

import useModal from '../../../hooks/useModal'

type onCloseType = () => void

interface PositionType {
    x: number;
    y: number;
}

interface ToDoTableSubMenuProps {
    id: string;
    position: null | PositionType;
    open: boolean;
    task: TableTaskType;
    onClose: onCloseType;
}

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

const ToDoTableSubMenu = ({ id, position, open, task, onClose }:ToDoTableSubMenuProps) => {

    const { openModal } = useModal("taskmenu")

    const realPosition = React.useMemo<PositionType>(() => {
        if (!open) return { x:0, y:0 }
        if (!position) return { x: 0, y: 0 }

        return {
            x: position.x,
            y: position.y
        }
    }, [open, position])
    
    const editOptionHandle = () => {
        onClose()
        openModal(task)
    }

    return (
        <Menu
            id={id}
            open={open}
            onClose={onClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
            anchorReference="anchorPosition"
            anchorPosition={{ top: realPosition.y, left: realPosition.x }}
        >
            <MenuList>
                <MenuItem onClick={editOptionHandle}>
                    <MenuListItemIcon>
                        <EditIcon fontSize="small" />
                    </MenuListItemIcon>
                    <MenuListItemText>Edit</MenuListItemText>
                </MenuItem>
                <MenuItem>
                    <MenuListItemIcon>
                        { task.started? (<StarIcon fontSize="small"/>) : (<StarOutlineIcon fontSize="small" />) }
                    </MenuListItemIcon>
                    <MenuListItemText>Mark as started</MenuListItemText>
                </MenuItem>
                <MenuItem>
                    <MenuListItemIcon>
                        { task.completed? (<CheckCircleOutlineIcon fontSize="small"/>) : (<PanoramaFishEyeIcon fontSize="small" />) }
                    </MenuListItemIcon>
                    <MenuListItemText>Mark as compleated</MenuListItemText>
                </MenuItem>
                <Divider/>
                <MenuItem>
                    <MenuListItemIcon>
                        <DeleteIcon fontSize="small" />
                    </MenuListItemIcon>
                    <MenuListItemText>Delete</MenuListItemText>
                </MenuItem>
            </MenuList>
        </Menu>
    )
}

export default ToDoTableSubMenu
