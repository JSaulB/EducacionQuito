// Requerir los módulos
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import ministerio_routes from './routers/ministerio_routes.js';
import adminRoutes from './routers/admin_routes.js';
import ciudadaniaRoutes from './routers/ciudadania_routes.js';

import swaggerUi from 'swagger-ui-express'
import specs from './swagger/swagger.js';
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

app.use('/api', ministerio_routes)
app.use('/api', adminRoutes);
app.use('/api/ciudadania', ciudadaniaRoutes)
// DOCUMENTAR LA API
app.use('/api/docs',swaggerUi.serve, swaggerUi.setup(specs))



// Exportar la instancia de express por medio de app
export default  app