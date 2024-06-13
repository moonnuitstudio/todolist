import { styled } from '@mui/system'
import Box from '@mui/material/Box'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'

import WorkIcon from '@mui/icons-material/Work'
import AccountTreeIcon from '@mui/icons-material/AccountTree'

import Typography from '@mui/material/Typography'

import useModal from '../../../../../hooks/useModal'
import useProjects from '../../../../../hooks/useProjects'

const HeaderTextList = styled(Box)(() => ({
    paddingLeft: '34px',
    paddingRight: '34px',
    marginTop: '30px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center'
}))

const MobileMenuList = () => {

    //const { isTabletOrDesktop } = useResponsive()
    const { openModal: openProjectModal } = useModal('projectModal')
    const { closeModal: closeMobileMenu } = useModal('mobilemenu')
    const { projects } = useProjects()

    return (
        <>
            <HeaderTextList>
                <Typography variant="subtitle1" className='non-mouse-event'>Projects</Typography>
            </HeaderTextList>
            <Divider sx={{ width: '90%', marginLeft: '5%'}} />
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => { closeMobileMenu(); openProjectModal(); }} disableRipple>
                        <ListItemIcon>
                            <AccountTreeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Create Project" />
                    </ListItemButton>  
                </ListItem>
                {projects && projects instanceof Array && projects.length > 0 && projects.map((project, index) => (
                    <ListItem key={`${project.ID}-${index}`} disablePadding> 
                        <ListItemButton onClick={() => { closeMobileMenu(); openProjectModal({ title: project.title }); }} disableRipple>
                            <ListItemIcon>
                                <WorkIcon />
                            </ListItemIcon>
                            <ListItemText primary={project.Title} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </>
    )
}

export default MobileMenuList
