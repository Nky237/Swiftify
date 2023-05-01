import {
    createBrowserRouter,
  Route, 
   createRoutesFromElements,
   RouterProvider
  } from "react-router-dom";
import SideLayout from '../src/Layouts/SideLayout';
import Shrt from '../src/pages/Shrt';
import Weather from "../src/pages/Weather";
import Menu from "../src/pages/Menu";
import Order from "../src/pages/Order";
import Dashboard from "../src/pages/Dashboard";
import Spotify from "../src/pages/Spotify";
  
const MyRoute = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
          <Route path='/' element={<SideLayout />}>
            <Route index element = {<Shrt />} />
            <Route path="/weather" element = {<Weather />} />
            <Route path="/menu" element = {<Menu />} />
            <Route path="/order" element = {<Order />} />
            <Route path="/dash" element = {<Dashboard />} />
            <Route path="/spot" element = {<Spotify />} />
          </Route>
        )
      )
  return (
    <RouterProvider router={router} />
  )
}

export default MyRoute