import { styled } from '@mui/system'

import Box from "@mui/material/Box"

import MenuList from './MenuList'

const MenuContainer = styled(Box)(({ theme }) => ({
    border: '1px solid #18181C',
    minWidth: '350px',
    borderTopRightRadius: '100px',
    padding: '50px 0px 20px 0px',
    [theme.breakpoints.down('md')]: {
        display: 'none',
        visibility: 'hidden',
        position: 'absolute',
        zIndex: '-9999999'
    }
}))

const RightMenu = () => {
  return (
    <MenuContainer>
        <MenuList />
    </MenuContainer>
  )
}

export default RightMenu
