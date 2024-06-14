import { Theme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

const useResponsive = () => {
    const isTabletOrDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'))
    const isTabletOrMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))

    return {
        isTabletOrDesktop,
        isTabletOrMobile,
        isDesktopVersion: !isTabletOrMobile,
        isMobile
    }
}

export default useResponsive