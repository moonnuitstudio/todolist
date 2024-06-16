import React from "react"

import { Outlet } from "react-router-dom"
import { styled } from '@mui/system'

import Container from "@mui/material/Container"
import Stack from "@mui/material/Stack"

import HeaderToolbar from "../../components/HeaderToolbar"
import MainMenu from "./MainMenu"

import { useAuth0 } from "@auth0/auth0-react"
import { useResizeDetector } from "react-resize-detector"

import MobilSubMenu from "../../components/menus/MobilSubMenu"

import useToken from "../../hooks/useToken"
import useProjects from "../../hooks/useProjects"
import useResponsive from "../../hooks/useResponsive"

const DashboardContainer = styled(Container)(() => ({
    width: '100vw !important',
    maxWidth: '100vw !important',
    height: '100vh !important',
    margin: '0px !important',
    padding: '0px !important',
    overflow: 'hidden',
}))

const BoxContentContainer = styled(Stack, {
    shouldForwardProp: (prop) => prop !== "headerheight"
})(({ theme, headerheight }) => ({
    padding: '0px',
    width: '100%',
    height: `calc(100% - ${headerheight}px)`,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    boxSizing: 'border-box',
    [theme.breakpoints.down('sm')]: {
        padding: '0px 5%'
    }
}))

const NewDashboardLayout = () => {

    const { isMobile } = useResponsive()

    const { saveToken, token } = useToken()
    const { loadProject } = useProjects()

    const { isAuthenticated, user, loginWithRedirect, getAccessTokenSilently, isLoading } = useAuth0()
    const { ref: HeaderRef, height: headerHeight } = useResizeDetector()

    const [menuOpen, setMenuOpen] = React.useState(true)

    const handleOpenMenu = () => setMenuOpen(!menuOpen)

    React.useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            loginWithRedirect()
            return
        }

        if (isAuthenticated && !token) {
            const auth0_domain = import.meta.env.VITE_AUTH0_DOMAIN;
            const audience = `https://${auth0_domain}/api/v2/`;
            
            const getToken = async () => {
                const token = await getAccessTokenSilently({
                    ignoreCache: true,
                    audience: audience,
                    scope: '',
                });

                saveToken(token)
                loadProject(token)
            }

            getToken();
        }

    }, [isAuthenticated, isLoading, loginWithRedirect, getAccessTokenSilently, user, saveToken, token, loadProject])

    return (
        <DashboardContainer>
            <HeaderToolbar appref={HeaderRef} onHandleOpen={handleOpenMenu} />
            <BoxContentContainer headerheight={headerHeight}>
                <MainMenu menuWidth={250} tabletMenuWidth={350} open={menuOpen} onMenuClose={() => setMenuOpen(false)} />
                <Outlet />
                {/* {isMobile && (<MobilSubMenu />)} */}
            </BoxContentContainer>
        </DashboardContainer>
    )
}

export default NewDashboardLayout
