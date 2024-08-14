import swaggerJsdoc from 'swagger-jsdoc'
const options = {

    definition : {

        openapi: '3.0.3',
        info: {
            title: 'Educacion en Quito API',
            version: '1.0.0',
            description: 'API para la educacion en Quito',
            contact: {
                name: 'Grupo 2',
            },
            servers: [
                {   
                    url: 'http://localhost:3000/api/',
                    description: 'servidor local'
                }
            ]
        }
    },
    apis: ['./src/swagger/*.yml']
};

const specs = swaggerJsdoc(options);
export default specs;