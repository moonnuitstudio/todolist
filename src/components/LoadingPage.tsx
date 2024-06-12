import { styled } from '@mui/system'

import Box from '@mui/material/Box'

const ContainerBox = styled(Box)(() => ({
    position: 'absolute',
    width: '100vw',
    height: '100vh',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'rgba(0, 0, 0, .15)'
}))

const LoadingPage = () => {
  return (
    <ContainerBox>
        <div className="lds-ripple"><div></div><div></div></div>
    </ContainerBox>
  )
}

export default LoadingPage
