import React from 'react'

import { styled } from '@mui/system'

import Box from '@mui/material/Box'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'

import Typography from '@mui/material/Typography'

import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'

import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import AccountTreeIcon from '@mui/icons-material/AccountTree'
import WorkIcon from '@mui/icons-material/Work'

import Skeleton from '@mui/material/Skeleton'

import useResponsive from '../../../../hooks/useResponsive'
import useModal from '../../../../hooks/useModal'
import useProjects from '../../../../hooks/useProjects'

import { useNavigate } from "react-router-dom"
import { useAuth0 } from '@auth0/auth0-react'

const CostumListItemIcon = styled(ListItemIcon)(() => ({
    color: '#707070',
    transition: 'color .2s ease-in-out',
    minWidth: '30px',
    '& svg': {
        fontSize: '1.2rem',
    }
}))

const CostumListItemText = styled(ListItemText)(() => ({
    color: '#18181C',
    transition: 'color .2s ease-in-out, font-weight .2s ease-in-out',
    '& .MuiTypography-root': {
        fontFamily: "'Montserrat'",
        fontWeight: '400',
        fontSize: '.9rem'
    }
}))

const CostumListItemButton = styled(ListItemButton)(() => ({
    background: 'transparent !important',
    transition: 'border .1s ease-in-out, border-radius .1s ease-in-out, padding-left .1s ease-in-out',
    border: '1px solid rgba(0, 0, 0, .0)',
    paddingLeft: '5px',
    paddingRight: '5px',
    '&:hover': {
        '& .MuiListItemIcon-root': { color: '#18181C', },
        '& .MuiTypography-root': { fontWeight: '500' },
        border: '1px solid rgba(0, 0, 0, .2)',
        borderRadius: '12px',
        paddingLeft: '15px',
    }
}))

const MenuContent = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down('lg')]: {
        flexGrow: '1',
        overflowY: 'scroll',
    }
}))

const HeaderTextList = styled(Box)(() => ({
    marginTop: '10px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
}))

type OnMenuCloseType = () => void

interface MainMenuContentPropsType {
    onMenuClose: OnMenuCloseType
}

const MainMenuContent = ({ onMenuClose }:MainMenuContentPropsType) => {

    const { isLoading } = useAuth0()
    const navigate = useNavigate()

    const { openModal: openProjectModal } = useModal('projectModal')
    const { isTabletOrMobile, isMobile } = useResponsive()
    const { projects, loading: isProjectLoading } = useProjects()

    const closeMenu = () => {
        if (isTabletOrMobile) {
            onMenuClose()
        }
    }

    return (
        <MenuContent>
            <List sx={{ marginBottom: '7px' }}>
                <ListItem disablePadding>
                    <CostumListItemButton onClick={() => {closeMenu();}} onClickCapture={() => {navigate(`/`)}} disableRipple>
                        <CostumListItemIcon> <FormatListNumberedIcon /> </CostumListItemIcon>
                        <CostumListItemText primary="Tasks" />
                    </CostumListItemButton>
                </ListItem>
            </List>
            <HeaderTextList>
                <Typography variant="subtitle1" className='non-mouse-event'>Projects</Typography>
                {!isMobile && (
                    <IconButton disableRipple aria-label="add project" onClick={() => { openProjectModal(); closeMenu(); }}>
                        <AddIcon />
                    </IconButton>
                )}
            </HeaderTextList>
            { !isMobile && (<Divider />) }
            <List>
                {isTabletOrMobile && (
                    <ListItem disablePadding>
                        <CostumListItemButton onClick={() => { closeMenu(); openProjectModal(); }} disableRipple>
                            <CostumListItemIcon> <AccountTreeIcon /> </CostumListItemIcon>
                            <CostumListItemText primary="Create Project" />
                        </CostumListItemButton>  
                    </ListItem>
                )}
                {(isLoading || isProjectLoading ) && (<>
                    <Skeleton sx={{ bgcolor: 'grey.400', marginBottom: '10px' }} variant="rounded" width="100%" height={35} />
                    <Skeleton sx={{ bgcolor: 'grey.400', marginBottom: '10px' }} variant="rounded" width="100%" height={35} />
                    <Skeleton sx={{ bgcolor: 'grey.400', marginBottom: '10px' }} variant="rounded" width="100%" height={35} />
                </>)}
                {projects && projects instanceof Array && projects.length > 0 && projects.map((project, index) => (
                    <ListItem key={`${project.ID}-${index}`} disablePadding>
                        <CostumListItemButton onClick={() => {closeMenu();}} onClickCapture={() => {navigate(`/project/${project.ID}`)}} disableRipple>
                            <CostumListItemIcon> <WorkIcon /> </CostumListItemIcon>
                            <CostumListItemText primary={project.Title} />
                        </CostumListItemButton>
                    </ListItem>
                ))}
            </List>
        </MenuContent>
    )
}

export default MainMenuContent
