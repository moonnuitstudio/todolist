import { BrowserRouter as Router, Route, Routes } from  'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { useAuth0 } from "@auth0/auth0-react"

import theme from './theme'
import { Provider } from 'react-redux'

import NewDashboardLayout from './layouts/NewDashboardLayout'
import DashboardLayout from './layouts/DashboardLayout'

import DashboardPage from './pages/DashboardPage'
import NewDashboardPage from './pages/NewDashboardPage'

import TaskMenu from './components/menus/TaskMenu'
import MobileMenu from './components/menus/MobileMenu'
import ProjectModal from './modals/ProjectModal'

import { ToastContainer } from 'react-toastify'

import CssBaseline from '@mui/material/CssBaseline'
import store from './store'

import 'react-toastify/dist/ReactToastify.css'
import './App.css'

function App() {

  const { error } = useAuth0()
  
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

            <Route path='/newdesign' element={<NewDashboardLayout />}>
              <Route index element={<NewDashboardPage />} />
            </Route>
          </Routes>

          <TaskMenu />
          <ProjectModal />
          <MobileMenu />

          <ToastContainer />
        </ThemeProvider>
      </Router>
    </Provider>
  )
}

export default App