import Layout from './components/layout/Layout';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import {Home, Redirect, ClickCount} from './pages';


const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path=':code' element={<Redirect />} />
      <Route path='click' element={<ClickCount />} />
    </Route>
  )
);


function App() {

  return (
    <RouterProvider router={routes}>
      <Layout />
    </RouterProvider>
  )
}

export default App
