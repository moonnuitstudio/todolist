import React from 'react'
import { styled } from '@mui/system'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'

import MobileMenuList from './MobileMenuList'

import CloseIcon from '@mui/icons-material/Close'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import useModal from '../../../../hooks/useModal'

type onCloseModalType = () => void

interface MobileMenuContentPropsType {
  onCloseModal: onCloseModalType;
}

const AvatarImage = styled(Avatar)(() => ({
  width: '80px',
  height: '80px'
}))

const MobileMenuContent = ({ onCloseModal }:MobileMenuContentPropsType) => {

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
        <IconButton aria-label="close-modal" onClick={onCloseModal}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Stack sx={{ width: '100%' }} flexDirection="row" justifyContent="center">
        <AvatarImage />
      </Stack>
      <MobileMenuList />
    </>
  )
}

export default MobileMenuContent
