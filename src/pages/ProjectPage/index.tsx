import React from 'react'

import { styled } from '@mui/system'

import Box from '@mui/material/Box'

import PageHeader from '../../components/PageHeader'

import { useParams } from 'react-router-dom'
import useProjects from '../../hooks/useProjects'
import { string } from 'yup'

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
  
  const [loadingPage, setLoadingPage] = React.useState(true)
  const { getProjectById, loading } = useProjects()

  const { id } = useParams();

  React.useEffect(() => {
    if (!loading && id && !isNaN(id) && !isNaN(parseFloat(id))) {
      
      const project = getProjectById(parseInt(id))
      
      if (!project) {
        alert('ERR')
      } 

      setLoadingPage(false)
    }
  }, [id, getProjectById, loading])

  return (
    <CustomContainer>
      <PageHeader />
    </CustomContainer>
  )
}

export default ProjectPage
