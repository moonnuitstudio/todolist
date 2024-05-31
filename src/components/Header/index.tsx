import { styled } from '@mui/system'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

import Typography from '@mui/material/Typography'

import ProfileAvatar from './ProfileAvatar'

const SpanList = styled('span')(() => ({
    color: 'black',
    fontSize: '1.5rem'
}))

const Header = () => {
    return (
        <AppBar position="static" elevation={0} sx={{ background: 'transparent' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h3">To Do <SpanList>List</SpanList></Typography>
                    </Box>
                    <ProfileAvatar />
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header
