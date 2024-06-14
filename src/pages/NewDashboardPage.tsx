import { styled } from '@mui/system'

import Box from '@mui/material/Box'

import PageHeader from '../components/PageHeader'

import TaskTable from '../components/tables/TaskTable'

const CustomContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
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
      <PageHeader />
      <TaskTable />
    </CustomContainer>
  )
}

export default NewDashboardPage
