
import { styled } from '@mui/system'

import Box from '@mui/material/Box'

const CustomContainer = styled(Box)(({ theme }) => ({
    [theme.breakpoints.up('lg')]: {
        padding: '10px',
    },
    [theme.breakpoints.down('lg')]: {
        padding: '10px 5%',
    },
    [theme.breakpoints.down('sm')]: {
        padding: '10px 0px',
    }
}))

const NewDashboardPage = () => {
  return (
    <CustomContainer>
      Test
    </CustomContainer>
  )
}

export default NewDashboardPage
