// Requerir los módulos
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import ministerio_routes from './routers/ministerio_routes.js';



// Inicializaciones
const app = express()
dotenv.config()

// Configuraciones 
app.set('port',process.env.port || 3000)
app.use(cors())

// Middlewares 
app.use(express.json())


// Variables globales


// Rutas 
app.get('/',(req,res)=>{
    res.send("Server on")
    console.log("server on")
    
})
app.use('/api', ministerio_routes)

// Exportar la instancia de express por medio de app
export default  app