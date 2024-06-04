import React from 'react'

import { styled } from '@mui/system'

import Typography from '@mui/material/Typography'

interface EventFormTitleProps {
    title: string;
    mt?: number
}

const EventFormTitle:React.FC<EventFormTitleProps> = ({ title, mt=0 }) => {
  return (
    <div style={{ width: '100%' }}>
        <Typography variant='h4' mt={mt}>{title}</Typography>
        <hr style={{ marginBottom: '10px' }} />
    </div>
  )
}

export default EventFormTitle
