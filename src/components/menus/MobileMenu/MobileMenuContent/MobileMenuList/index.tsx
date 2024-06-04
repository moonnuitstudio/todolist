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
                <ListItem disablePadding> 
                    <ListItemButton onClick={() => { closeMobileMenu(); openProjectModal({ title: "default" }); }} disableRipple>
                        <ListItemIcon>
                            <WorkIcon />
                        </ListItemIcon>
                        <ListItemText primary="Default" />
                    </ListItemButton>
                </ListItem>
            </List>
        </>
    )
}

export default MobileMenuList
