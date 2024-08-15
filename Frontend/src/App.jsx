import './App.css'
import { Registro } from "./paginas/Registro"
import{ Login } from "./paginas/Login"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Dashboard } from "./layouts/Dashboard"
import { LandinPage } from "./paginas/LandingPage"

import { Perfil } from "./paginas/Perfil"
import { CrearInstitucion } from "./paginas/CrearInstitucion"
import { Actualizar} from './paginas/Actualizar'
import { AuthProvider } from './context/AuthProvider'
import { Forgot } from './paginas/Forgot'
import Restablecer from './paginas/Restablecer'
import { Confirmar } from './paginas/Confirmar'
import ListaInstituciones  from './paginas/ListaInstituciones'

import { RegistroMinisterio } from './paginas/Ministerios'
import { NotAllowed } from './paginas/NotAllowed'
import InstitucionEspecifica from './paginas/InstitucionEspecifica'

import ListaInstituciones2 from './paginas/ListaInstituciones 2'
import TablaAyuda from './componets/TablaAyu'
import FormularioAyuda from './componets/FormularioAyuda'



function App() {
  return (
    <>

    <BrowserRouter>
    <AuthProvider>
      
      <Routes>
        
        <Route index ="/" element ={<LandinPage/>}/>
        <Route path='landingpage' element = {<LandinPage/>}/>
        <Route path='login' element = {<Login/>}/>
        <Route path='registro' element = {<Registro/>}/>
        <Route path='forgot/:id' element={<Forgot/>}/>
        <Route path='confirmar/:token' element={<Confirmar/>}/>
        <Route path='recuperar-password/:token' element={<Restablecer/>}/>
        <Route path='*' element={<NotAllowed/>}/>


        <Route path='dashboard' element = {<Dashboard/>}>
          <Route index element={<Perfil/>}/>       
       
          <Route path='/dashboard/crear' element={<CrearInstitucion/>}/>
          <Route path='/dashboard/actualizar/:id' element={<Actualizar/>}/>
          <Route path='/dashboard/ministerio' element={<RegistroMinisterio/>}/>
          <Route path='/dashboard/institucion/:id' element={<InstitucionEspecifica/>}/>
          <Route path='/dashboard/listaInstituciones' element={<ListaInstituciones/>}/>
          <Route path='/dashboard/instituciones' element={<ListaInstituciones2/>}/>
          <Route path="/dashboard/ayuda" element={<TablaAyuda />} />
          <Route path="/dashboard/registrar-ayuda/:id" element={<FormularioAyuda />} />
         
        </Route>
        
      </Routes>
    </AuthProvider>
    </BrowserRouter>
    
    </>
  )
}

export default App
