import { BrowserRouter as Router, Route, Routes } from  'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { useAuth0 } from "@auth0/auth0-react"

import theme from './theme'
import { Provider } from 'react-redux'

import DashboardLayout from './layouts/DashboardLayout'

import DashboardPage from './pages/DashboardPage'

import TaskMenu from './components/menus/TaskMenu'
import MobileMenu from './components/menus/MobileMenu'
import ProjectModal from './modals/ProjectModal'

import CssBaseline from '@mui/material/CssBaseline'
import store from './store'
import './App.css'

function App() {

  const { loginWithPopup, loginWithRedirect, logout, isLoading, error, user, isAuthenticated} = useAuth0()
  
  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  return (
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <Routes>
            <Route path='/' element={<DashboardLayout />}>
              <Route index element={<DashboardPage />} />
            </Route>
          </Routes>

          <TaskMenu />
          <ProjectModal />
          <MobileMenu />
        </ThemeProvider>
      </Router>
    </Provider>
  )
}

export default App