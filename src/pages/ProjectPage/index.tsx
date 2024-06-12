import React from 'react'

import { styled } from '@mui/system'

import Box from '@mui/material/Box'

import PageHeader from '../../components/PageHeader'

import { useParams } from 'react-router-dom'

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

const ProjectPage = () => {
  let { id } = useParams();

  React.useEffect(() => {
    
  }, [id])

  return (
    <CustomContainer>
      <PageHeader />
    </CustomContainer>
  )
}

export default ProjectPage
