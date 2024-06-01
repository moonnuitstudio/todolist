import { styled } from '@mui/system'

import Container from '@mui/material/Container'

import ToDoTable from '../components/tables/ToDoTable'

const DashContainer = styled(Container)(() => ({
  width: '100%',
  height: '100%',
  padding: '30px'
}))

const DashboardPage = () => {
  return (
    <>
      <ToDoTable />
    </>
  )
}

export default DashboardPage
