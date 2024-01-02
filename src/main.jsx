import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Login from './componnents/Login.jsx'
import User from './componnents/User.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom' 
import Admin from './componnents/Admin.jsx'
import Service from './componnents/Service.jsx'
import Appointment from './componnents/Appointment.jsx'


const router=createBrowserRouter([
  {
    path:'/',
    element:<User />,
  },
  {
    path:'/admin',
    element:<Admin/>,
    children:[
      {
        path:'Service',
        element:<Service/>,
      },
      {
        path:'Appointment',
        element:<Appointment/>,
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
