import { BrowserRouter as Router, Route, Routes } from  'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'

import theme from './theme'

import DashboardLayout from './layouts/DashboardLayout'

import DashboardPage from './pages/DashboardPage'

import CssBaseline from '@mui/material/CssBaseline'
import './App.css'

function App() {

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Routes>
          <Route path='/' element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </Router>
  )
}

export default App