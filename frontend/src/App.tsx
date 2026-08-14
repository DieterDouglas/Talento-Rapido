import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Services } from './pages/Services'
import { CreateService } from './pages/CreateService'
import { ServiceDetail } from './pages/ServiceDetail'
import { Profile } from './pages/Profile'
import { AppRoute } from './constants/routes'
import { AuthProvider } from './contexts/AuthContext'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path={AppRoute.Home} element={<Home />} />
            <Route path={AppRoute.Login} element={<Login />} />
            <Route path={AppRoute.Register} element={<Register />} />
            <Route path={AppRoute.Services} element={<Services />} />
            <Route path={AppRoute.CreateService} element={<CreateService />} />
            <Route path={AppRoute.ServiceDetail} element={<ServiceDetail />} />
            <Route path={AppRoute.Profile} element={<Profile />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
