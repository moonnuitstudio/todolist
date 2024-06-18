import React from 'react'

import { styled } from '@mui/system'

import Box from '@mui/material/Box'

import PageHeader from '../../components/PageHeader'

import TaskTable from '../../components/tables/TaskTable'

import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import useProjects from '../../hooks/useProjects'
import { ProjectType } from '../../models/Project'

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
  
  const [project, setProject] = React.useState<ProjectType | undefined>(undefined)

  const { getProjectById, loading } = useProjects()

  const { id } = useParams()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (!loading) {
      if (id && !isNaN(parseInt(id)) && !isNaN(parseFloat(id))) {
        const project = getProjectById(parseInt(id))
      
        if (!project) navigate("/")

        setProject(project)
      } else navigate("/")
    }
  }, [id, getProjectById, loading, navigate])

  return (
    <CustomContainer>
      <PageHeader useproject project={project} />
      <TaskTable useproject project={project} />
    </CustomContainer>
  )
}

export default ProjectPage
