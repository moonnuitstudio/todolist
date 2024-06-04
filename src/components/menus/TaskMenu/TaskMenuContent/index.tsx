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
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
        <Box sx={{ flexGrow: '1' }}><Typography variant='h2' sx={{ lineHeight: '1.4rem' }}>Task:</Typography></Box>
        <IconButton aria-label="close-modal" onClick={onCloseModal}>
          <CloseIcon />
        </IconButton>
      </Box>
      <TaskMenuForm isEdit={isEdit} task={extradata} />
    </>
  )
}

export default TaskMenuContent
