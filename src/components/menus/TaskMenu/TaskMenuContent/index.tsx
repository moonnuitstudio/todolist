import React from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

import CloseIcon from '@mui/icons-material/Close'

import TaskMenuForm from './TaskMenuForm'

import useModal from '../../../../hooks/useModal'

type onCloseModalType = () => void

interface TaskMenuContentPropsType {
  onCloseModal: onCloseModalType;
}

const TaskMenuContent = ({ onCloseModal }:TaskMenuContentPropsType) => {
  const { data: extradata } = useModal("taskmenu")

  const isEdit = React.useMemo(() => Boolean(extradata), [extradata])

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', borderBottom: '1px solid rgba(0, 0, 0, .2)', paddingBottom: '5px' }}>
        <Box sx={{ flexGrow: '1' }}><Typography variant='h2' className='non-mouse-event' sx={{ lineHeight: '1rem', transform: 'translate(0px, 5px)' }}>Task:</Typography></Box>
        <IconButton aria-label="close-modal" onClick={onCloseModal}>
          <CloseIcon />
        </IconButton>
      </Box>
      <TaskMenuForm isEdit={isEdit} task={extradata} />
    </>
  )
}

export default TaskMenuContent
