import { styled } from '@mui/system'

import Box from '@mui/material/Box'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'

import InboxIcon from '@mui/icons-material/Inbox'
import StarIcon from '@mui/icons-material/Star'
import TodayIcon from '@mui/icons-material/Today'
import DateRangeIcon from '@mui/icons-material/DateRange'

import WorkIcon from '@mui/icons-material/Work'
import EditIcon from '@mui/icons-material/Edit'

import Typography from '@mui/material/Typography'

import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'

import useResponsive from '../../../hooks/useResponsive'

import useModal from '../../../hooks/useModal'
import useProjects from '../../../hooks/useProjects'

const HeaderTextList = styled(Box)(() => ({
    paddingLeft: '34px',
    paddingRight: '34px',
    marginTop: '30px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center'
}))

const MenuList = () => {

    const { isTabletOrDesktop } = useResponsive()
    const { openModal: openProjectModal } = useModal('projectModal')
    const { projects } = useProjects()

    return (
        <>
            <Typography variant="subtitle1" className='non-mouse-event' sx={{ paddingLeft: '34px' }}>Filters</Typography>
            <Divider sx={{ width: '80%', marginLeft: '24px' }} />
            <List>
                <ListItem disablePadding>
                    <ListItemButton disableRipple>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="All" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton disableRipple>
                        <ListItemIcon>
                            <StarIcon />
                        </ListItemIcon>
                        <ListItemText primary="Starred" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton disableRipple>
                        <ListItemIcon>
                            <TodayIcon />
                        </ListItemIcon>
                        <ListItemText primary="Today" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton disableRipple>
                        <ListItemIcon>
                            <DateRangeIcon />
                        </ListItemIcon>
                        <ListItemText primary="This Week" />
                    </ListItemButton>
                </ListItem>
            </List>
            <HeaderTextList>
                <Typography variant="subtitle1" className='non-mouse-event'>Projects</Typography>
                {isTabletOrDesktop && (
                    <IconButton aria-label="plus" onClick={() => { openProjectModal() }}>
                        <AddIcon />
                    </IconButton>
                )}
            </HeaderTextList>
            <Divider sx={{ width: '80%', marginLeft: '24px' }} />
            <List>
                {projects && projects instanceof Array && projects.length > 0 && projects.map((project, index) => (
                    <ListItem key={`${project.id}-${index}`} disablePadding>
                        <ListItemButton disableRipple>
                            <ListItemIcon>
                                <WorkIcon />
                            </ListItemIcon>
                            <ListItemText primary={project.title} />
                        </ListItemButton>
                        <IconButton aria-label="plus" sx={{ marginRight: '30px' }} onClick={() => { openProjectModal(project) }}>
                            <EditIcon />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        </>
    )
}

export default MenuList
