import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import LayoutSistema from './Layout/Sistema.jsx'
import Login from './screens/Auth/Login.jsx'
import Contratos from './screens/Sistema/Contratos/Contratos.jsx'
import Dashboard from './screens/Sistema/Dashboard/Dashboard.jsx'
import Pagos from './screens/Sistema/Pagos/page.jsx'
import Personal from './screens/Sistema/Personal/page.jsx'
import Ediciones from './screens/Sistema/Ediciones/page.jsx'
import CalendarioScreen from './screens/Sistema/Calendario/page.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
     <Routes>
       <Route path='/' element={<Login />}>
         <Route index element={<Login />}  />
       </Route>

       <Route path='dashboard' element={<LayoutSistema />}>
          <Route index element={<Dashboard />} />
          <Route path='/dashboard/contratos' element={<Contratos />} />
          <Route path='/dashboard/pagos' element={<Pagos />} ></Route>
          <Route path='/dashboard/ediciones' element={<Ediciones />} ></Route>
           <Route path='/dashboard/empleados' element={<Personal />} ></Route>
           <Route path='/dashboard/calendario' element={<CalendarioScreen />} ></Route>
       </Route>
     </Routes>
  </BrowserRouter>
)
