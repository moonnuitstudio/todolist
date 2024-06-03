import { Outlet } from "react-router-dom"

import { styled } from '@mui/system'

import Container from "@mui/material/Container"
import Box from "@mui/material/Box"

import Header from "../components/Header"
import RightMenu from "../components/RightMenu"

import HeaderPageInfo from  "../components/UI/HeaderPageInfo"
import MobilSubMenu from "../components/menus/MobilSubMenu"

import useResponsive from "../hooks/useResponsive"
import { useResizeDetector } from "react-resize-detector"

const DashboardContainer = styled(Container)(() => ({
    width: '100vw !important',
    maxWidth: '100vw !important',
    height: '100vh !important',
    margin: '0px !important',
    padding: '0px !important',
    overflow: 'hidden'
}))

const BoxContentContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== "headerheight"
})(({ theme, headerheight }) => ({
    padding: '0px',
    width: '100%',
    height: `calc(100% - ${headerheight}px)`,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    boxSizing: 'border-box',
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
    },
    [theme.breakpoints.down('sm')]: {
        padding: '0px'
    }
}))

const RealContentContainer = styled(Box)(({ theme }) => ({
    flexGrow: 1, 
    width: '100%', 
    display: 'flex',
    paddingTop: '20px',
    [theme.breakpoints.down("sm")]: {
        flexDirection: 'column'
    }
}))

const DashboardLayout = () => {

    const { isMobile } = useResponsive()
    const { ref: HeaderRef, height: headerHeight } = useResizeDetector()

    return (
        <DashboardContainer>
            <Header appref={HeaderRef} />
            <BoxContentContainer headerheight={headerHeight}>
                <RightMenu />
                <BoxOutletContent>
                    <HeaderPageInfo title="Tasks" />
                    <RealContentContainer>
                        <Outlet />

                        {isMobile && (<MobilSubMenu />)}
                    </RealContentContainer>
                </BoxOutletContent>
            </BoxContentContainer>
        </DashboardContainer>
    )
}

export default DashboardLayout
