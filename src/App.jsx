import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/home/Home'
import Information from './pages/information/Information'

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/pokemon/:id",
      element: <Information />,
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
