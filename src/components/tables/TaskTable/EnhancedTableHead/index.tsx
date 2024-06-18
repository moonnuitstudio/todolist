import React from 'react'

import Box from '@mui/material/Box'

import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableSortLabel from '@mui/material/TableSortLabel'

import { visuallyHidden } from '@mui/utils'

import { TBLHEADTASK, MOBILETBLHEADTASK, TABLETBLHEADTASK } from '../../../../models/Task'

import useResponsive from '../../../../hooks/useResponsive'

type Order = 'asc' | 'desc';

interface EnhancedTableHeadPropsType {
    onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
    order: Order;
    orderBy: string;
}

const EnhancedTableHead = ({ order, orderBy, onRequestSort }: EnhancedTableHeadPropsType) => {

    const { isMobile, isTabletOrMobile } = useResponsive()

    const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => { onRequestSort(event, property); }
    
    const HEADS = React.useMemo(() => {

        if (isMobile) return MOBILETBLHEADTASK
        else if (isTabletOrMobile) return TABLETBLHEADTASK

        return TBLHEADTASK

    }, [isMobile, isTabletOrMobile])

    return (
        <TableHead>
            <TableRow>
                {HEADS.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.order)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell></TableCell>
            </TableRow>
        </TableHead>
    )
}

export default EnhancedTableHead