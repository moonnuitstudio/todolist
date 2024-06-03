import { styled } from '@mui/system'

import Typography from "@mui/material/Typography"

import { getTodayFormat } from '../../utils/datetools.js'

const HeaderPage = styled('header')(() => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
}))

const HeaderTypography = styled(Typography)(({ theme }) => ({
    [theme.breakpoints.down("sm")]: {
        display: 'none !important'
    }
}))

interface PageHeaderInfoType {
    title: string;
}

const PageHeaderInfo = ({ title }:PageHeaderInfoType) => {
     return (
        <HeaderPage>
            <HeaderTypography variant='h2' sx={{ textTransform: 'uppercase', fontWeight: 700, letterSpacing: '1px' }}>{title}</HeaderTypography>
            <Typography variant="caption" fontSize=".9rem" textTransform="initial">{ getTodayFormat() }</Typography>
        </HeaderPage>
    )
}

export default PageHeaderInfo