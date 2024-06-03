import React from 'react'
import { styled } from '@mui/system'

import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Checkbox from '@mui/material/Checkbox'

import IconButton from '@mui/material/IconButton'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye'

import useResponsive from '../../../../hooks/useResponsive'

import { TableTaskType } from '../../../../models/Task'

const ToDoTableRow = styled(TableRow)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        '& th': {
            padding: '10px 0px 10px 10px !important',
            boxSize: 'borber-box'
        }
    }
}))

type HandleClickType = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => void;

interface ToDoRowType {
    isItemSelected: boolean;
    labelId: string;
    row: TableTaskType;
    handleClick: HandleClickType;
}

const ToDoRow = ({ isItemSelected, labelId, row, handleClick }:ToDoRowType) => {

    const { isMobile } = useResponsive()

    return (
        <ToDoTableRow
            hover
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            selected={isItemSelected}
            sx={{ cursor: 'pointer' }}
        >
            {!isMobile && (<TableCell padding="checkbox">
                <Checkbox
                    color="primary"
                    checked={isItemSelected}
                    inputProps={{ 'aria-labelledby': labelId }}
                    onClick={(event) => handleClick(event, row.id)}
                />
            </TableCell>)}
            <TableCell component="th" id={labelId} scope="row" padding="none"> {row.title}</TableCell>

            {!isMobile && (<>
                <TableCell sx={{ textTransform: 'capitalize' }} align="left" style={{ width: 300 }} >{row.project}</TableCell>
                <TableCell align="left" style={{ width: 160 }} >{row.due}</TableCell>
                <TableCell align="right" style={{ width: 160 }} >
                    <IconButton aria-label="delete"><PanoramaFishEyeIcon /></IconButton>
                    <IconButton aria-label="delete"><StarBorderIcon /></IconButton>
                </TableCell>
            </>)}
    </ToDoTableRow>
    )
}

export default ToDoRow
