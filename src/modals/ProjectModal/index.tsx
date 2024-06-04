import * as React from 'react'
import { styled } from '@mui/system'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'

import IconButton from '@mui/material/IconButton'

import CloseIcon from '@mui/icons-material/Close'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import ProjectModalForm from './ProjectModalForm'

import useModal from '../../hooks/useModal'

import Slide from '@mui/material/Slide'
import Backdrop from '@mui/material/Backdrop'

import { useResizeDetector } from 'react-resize-detector'
import useResponsive from '../../hooks/useResponsive'

const ModalBox = styled(Box, {
    shouldForwardProp: (props) => props !== "boxwidth" && props !== "boxheight"
})(({ theme, boxwidth, boxheight }) => ({
    position: 'absolute',
    top: `calc(50% - ${ boxheight?  boxheight / 2 : 100 }px)`,
    left: `calc(50% - ${ boxwidth?  boxwidth / 2 : 100 }px)`,
    maxWidth: 800,
    width: '500px',
    background: 'white',
    boxShadow: '0px 0px 25px -12px rgba(0,0,0,0.75)',
    padding: '20px',
    borderRadius: '15px',
    [theme.breakpoints.down("sm")]: {
        width: '100vw',
        left: '0 !important',
        top: `calc(100% - ${boxheight + 50}px)`,
        paddingBottom: '50px',
        borderRadius: '0px !important'
    }
}))

const ProjectModal = () => {
    const { open, data, closeModal } = useModal('projectModal')

    const isEdit = React.useMemo(() => Boolean(data), [data])

    const { ref: modalBoxRef, width: modalBoxWidth, height: modalBoxheight  } = useResizeDetector()

    const { isMobile } = useResponsive()

    return (
        <Modal
            open={open}
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Slide direction="up" in={open} mountOnEnter unmountOnExit>
                <ModalBox ref={modalBoxRef} boxwidth={modalBoxWidth} boxheight={modalBoxheight}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Box sx={{ flexGrow: '1' }}><Typography variant='h2' sx={{ lineHeight: '1.4rem', fontSize: '1.6rem' }}>Projects:</Typography></Box>
                        <IconButton aria-label="close-modal" onClick={closeModal}>
                            {isMobile? (<KeyboardArrowDownIcon />):(<CloseIcon />)}
                        </IconButton>
                    </Box>
                    <ProjectModalForm isEdit={isEdit} project={data} />
                </ModalBox>

            </Slide>
        </Modal>
    )
}

export default ProjectModal
