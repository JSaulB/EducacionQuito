import { Registro } from "./paginas/Registro"
import{ Login } from "./paginas/Login"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Dashboard } from "./layouts/Dashboard"
import { LandinPage } from "./paginas/LandingPage"
import { ListaAdministradores } from "./paginas/ListaAdministradores"
import { Perfil } from "./paginas/Perfil"
import { CrearInstitucion } from "./paginas/CrearInstitucion"
import { Actualizar} from './paginas/Actualizar'

function App() {
  return (
    <>

    <BrowserRouter>
      <Routes>
        <Route index ="/" element ={<LandinPage/>}/>
        <Route path='landingpage' element = {<LandinPage/>}/>
        <Route path='login' element = {<Login/>}/>
        <Route path='registro' element = {<Registro/>}/>


        <Route path='dashboard' element = {<Dashboard/>}>
          <Route index element={<Perfil/>}/>       
          <Route path='/dashboard/listar' element = {<ListaAdministradores/>}/>
          <Route path='/dashboard/crear' element={<CrearInstitucion/>}/>
          <Route path='/dashboard/actualizar' element={<Actualizar/>}/>
        
        </Route>
      </Routes>
    
    </BrowserRouter>
    
    </>
  )
}

export default App