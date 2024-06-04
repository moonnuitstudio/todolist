import { alpha } from '@mui/material/styles'
import { styled } from '@mui/system'
import React from 'react';

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip';

import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton';

import DeleteIcon from '@mui/icons-material/Delete'
import FilterListIcon from '@mui/icons-material/FilterList'

import Button from '@mui/material/Button'

import useResponsive from '../../../../hooks/useResponsive';

import useModal from '../../../../hooks/useModal';

import Chip from '@mui/material/Chip'

import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import { useResizeDetector } from 'react-resize-detector';
import { OnRefChangeType } from 'react-resize-detector/build/types/types';

const ToDoToolbar = styled(Toolbar)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    padding: '0px !important',
    minHeight: '50px'
  }
}))

const ProjectSelect = styled(Select)(() => ({
  '& .MuiSelect-select': {
    fontFamily: "'Montserrat'",
    fontSize: '1rem',
    fontWeight: 400,
    padding: '10px 10px',
    width: '100px',
  },
  '& fieldset': {
    border: '1px solid black !important',
    ourline: 'none !important',
  },
}))

const FilterSelectMenuItem = styled(MenuItem)(() => ({
  fontFamily: "'Montserrat'",
  fontSize: '.9rem',
  fontWeight: 400,
}))

const FilterChip = styled(Chip)(() => ({
  fontFamily: "'Montserrat'",
  fontWeight: 500,
  backgroundColor: 'rgba(0, 0, 0, .0.01)'
}))

const FilterContainer = styled(Stack, {
  shouldForwardProp: (props) => props !== "openMenu"
})(({ theme, openMenu }) => ({
  height: '0px',
  display: 'none',
  transition: theme.transitions.create(['height'], {
    duration: theme.transitions.duration.standard,
  }),
  ...(openMenu && {
    height: 'fit-content',
    display: 'flex'
  })
}))

interface EnhancedTableToolbarProps {
    numSelected: number;
    filterRef: OnRefChangeType<HTMLElement>
}

const EnhancedTableToolbar = ({numSelected, filterRef}: EnhancedTableToolbarProps) => {

  const { openModal } = useModal("taskmenu")

  const { isMobile, isTabletOrMobile } = useResponsive()

  const [ openFilterMenu, setOpenFiltetMenu ] = React.useState<boolean>(false)

  const handleOpenFilterMenu = () => setOpenFiltetMenu(!openFilterMenu)

    const BtnContents = React.useMemo(() => {
      if (isMobile) return null

      return numSelected > 0? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ):(
        <Button type='button' sx={{ boxShadow: 'none !important' }} variant='contained' size='large' p={2} onClick={() => {openModal()}}>Add Task</Button>
      )

    }, [isMobile, numSelected])

    return (
      <>
        <ToDoToolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 }, ...(numSelected > 0 && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        })}}>
          {numSelected > 0 ? (
            <Typography
                sx={{ flexGrow: 1 }}
                color="inherit"
                variant="h6"
                component="div"
                className='non-mouse-event'
            >
                {numSelected} selected
            </Typography>
          ) : (
            <Typography
              sx={{ flexGrow: 1 }}
              variant="h6"
              id="tableTitle"
              component="div"
              className='non-mouse-event'
            >
                All Tasks
            </Typography>
          )}
          {isTabletOrMobile && (
            <div style={{ marginRight: isMobile? '0px' : '10px' }}>
              <Tooltip title="filter">
                <IconButton onClick={handleOpenFilterMenu}>
                  <FilterListIcon sx={{ color: 'black' }} />
                </IconButton>
              </Tooltip>
            </div>
          )}
          {BtnContents}
        </ToDoToolbar> 
        {isTabletOrMobile && (
          <FilterContainer ref={filterRef} openMenu={openFilterMenu} flexDirection="row" gap="10px" justifyContent="flex-start" alignItems="center" sx={{ flexWrap: 'wrap', paddingBottom: '10px' }}>
            <ProjectSelect value={""} displayEmpty inputProps={{ 'aria-label': 'Without label' }}
              // onChange={handleChange} 
            >
              <FilterSelectMenuItem value=""><em>Projects</em></FilterSelectMenuItem>
              <FilterSelectMenuItem value={10}>Default</FilterSelectMenuItem>
            </ProjectSelect>
            {isMobile && (<Box sx={{ flexGrow: '1', width: '100%' }} />)}
            <FilterChip label="Started" variant='outlined' />
            <FilterChip label="Complete" variant='outlined' />
            <FilterChip label="Today" variant='outlined' />
            <FilterChip label="This week" variant='outlined' />
          </FilterContainer> 
        )}
      </>
    );
}

export default EnhancedTableToolbar
