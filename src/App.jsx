
import { RouterProvider } from 'react-router'
import router from './routes/router'
import useAuth from './hooks/useAuth'

const App = () => {
  useAuth();





  return <RouterProvider router={router} />
}

export default App
