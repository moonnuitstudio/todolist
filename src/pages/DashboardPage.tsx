import { styled } from '@mui/system'

import Box from '@mui/material/Box'

import ToDoTable from '../components/tables/ToDoTable'

import { useResizeDetector } from 'react-resize-detector'

const DashContainer = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  flexGrow: 1,
}))

const DashboardPage = () => {

  const { ref: containerRef, height: containerHeight } = useResizeDetector()

  return (
    <DashContainer ref={containerRef}>
      <ToDoTable containerheight={containerHeight} />
    </DashContainer>
  )
}

export default DashboardPage
