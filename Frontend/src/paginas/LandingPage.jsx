
import educacion from  '../assets/educacion.jpg'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export const LandinPage = () =>{
    
    const navigate = useNavigate()

  return (
    <>
    <header>
        <button onClick={() => navigate('/login')}>
          Iniciar Sesión
        </button>
        <button onClick={() => navigate('/registro')}>
          Registrarse
        </button>
    </header>
      <h1 className='Titulo'>EduScholar Portal</h1>
      <div className='Contenedorlogo'>
        <a href="../src/assets/educacion.jpg" target="_blank">
          <img src={educacion} className="logo" alt="educacion" />
        </a>
       
      </div>
      <div className="card">
        <p>
        La educación es el camino hacia un futuro mejor. No dejes que nada te impida alcanzar tus metas. 
        
        </p>
        <p>
        Únete a nosotros en este sueño de apoyar a escuelas y estudiantes, y juntos haremos que la educación sea accesible para todos.
        </p>
      </div>
      <footer className='footer'>
      Todos los derechos reservados - Escuela Politécnica Nacional
      </footer>
      
    </>
  )

}


