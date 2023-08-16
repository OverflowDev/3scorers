import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Signup from './auth/Signup'
import Login from './auth/Login'
import Overview from './components/Overview'
import Users from './components/Users'
import Admins from './components/Admins'

import ProtectedRoute from './protected/ProtectedRoute'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path='/overview' element={<Overview />} />
          <Route path='/users' element={<Users />} />
          <Route path='/admin' element={<Admins />} />
        </Route>  
      </Routes>
    </Router>
  )
}

export default App
