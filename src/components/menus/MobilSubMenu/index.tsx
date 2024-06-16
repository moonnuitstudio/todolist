import { styled } from '@mui/system'

import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'

import AddIcon from '@mui/icons-material/Add'

import { useResizeDetector } from 'react-resize-detector'

import useModal from '../../../hooks/useModal'

const MenuContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  height: '50px',
  border: '1px solid rgba(0, 0, 0, .7)',
  //boxShadow: '0px 0px 20px -10px rgba(0,0,0,0.75)'
  borderTopRightRadius: '10px',
  borderTopLeftRadius: '10px',
}))

const AddTaskBtn = styled(Fab)(() => ({
  position: 'absolute',
  bottom: '15px',
  left: '50%',
  transform: 'translate(-50%, 0)',
  border: '1px solid rgba(0, 0, 0, .7)',
  background: 'transparent !important',
  color: 'black !important',
  boxShadow: 'none !important',
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
  bottom: '10px',
  left: '50%',
  transform: 'translate(-50%, 0)',
  borderRadius: '50%',
  background: theme.palette.background.default
}))

const MobilSubMenu = () => {

  const { ref, width, height } = useResizeDetector()
  const { openModal } = useModal("taskmenu")

  return (
    <div style={{ height: '70px' }}>
        <MenuContainer></MenuContainer>
        <AddTaskBtn aria-label="add-task" ref={ref} onClick={() => {openModal()}}>
          <AddIcon />
        </AddTaskBtn>
        <DivBtnDec width={width} height={height} />
    </div>
  )
}

export default MobilSubMenu
