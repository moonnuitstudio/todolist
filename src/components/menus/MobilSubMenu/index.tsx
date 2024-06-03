import { styled } from '@mui/system'

import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'

import AddIcon from '@mui/icons-material/Add'

import { useResizeDetector } from 'react-resize-detector'

const MenuContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  height: '50px',
  background: theme.palette.background.default,
  boxShadow: '0px 0px 20px -10px rgba(0,0,0,0.75)'
}))

const AddTaskBtn = styled(Fab)(() => ({
  position: 'absolute',
  bottom: '10px',
  left: '50%',
  transform: 'translate(-50%, 0)',
  background: `#B33F00 !important`,
  color: 'white',
  '& svg': {
    fontSize: '1.8rem',
  }
}))

const DivBtnDec = styled('div', {
  shouldForwardProp: (prop) => prop !== "width" && prop !== "height"
})(({ theme, width, height }) => ({
  width: `${width + 10}px`,
  height: `${height + 10}px`,
  position: 'absolute',
  bottom: '5px',
  left: '50%',
  transform: 'translate(-50%, 0)',
  borderRadius: '50%',
  background: theme.palette.background.default
}))

const MobilSubMenu = () => {

  const { ref, width, height } = useResizeDetector()

  return (
    <div style={{ height: '70px' }}>
        <MenuContainer></MenuContainer>
        <AddTaskBtn aria-label="add-task" ref={ref}>
          <AddIcon />
        </AddTaskBtn>
        <DivBtnDec width={width} height={height} />
    </div>
  )
}

export default MobilSubMenu
