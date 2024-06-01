import { Outlet } from "react-router-dom"

import { styled } from '@mui/system'

import Container from "@mui/material/Container"
import Box from "@mui/material/Box"

import Header from "../components/Header"
import RightMenu from "../components/RightMenu"

import HeaderPageInfo from  "../components/UI/HeaderPageInfo"

const DashboardContainer = styled(Container)(() => ({
    width: '100vw !important',
    maxWidth: '100vw !important',
    height: '100vh !important',
    margin: '0px !important',
    padding: '0px !important',
    overflow: 'hidden'
}))

const BoxContentContainer = styled(Box)(({ theme }) => ({
    padding: '0px',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    [theme.breakpoints.down('sm')]: {
        padding: '0px 5%'
    }
}))

const BoxOutletContent = styled(Box)(({ theme }) => ({
    flexGrow: 1, 
    padding: '10px 2%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: '20px',
    [theme.breakpoints.down('md')]: {
        padding: '10px 5%',
    }
}))

const RealContentContainer = styled(Box)(({ theme }) => ({
    flexGrow: 1, 
    width: '100%', 
    display: 'flex',
    paddingTop: '20px'
}))

const DashboardLayout = () => {
  return (
    <DashboardContainer>
        <Header />
        <BoxContentContainer>
            <RightMenu />
            <BoxOutletContent>
                <HeaderPageInfo title="Tasks" />
                <RealContentContainer>
                    <Outlet />
                </RealContentContainer>
            </BoxOutletContent>
        </BoxContentContainer>
    </DashboardContainer>
  )
}

export default DashboardLayout
