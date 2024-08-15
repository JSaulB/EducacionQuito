import request from 'supertest';
import app from '../server.js';  // Asegúrate de que la ruta es correcta
import administrador from '../models/administrador.js';  // Mockea el modelo si es necesario
/*
describe('POST /api/login', () => {
    it('should login successfully with valid credentials', async () => {
        // Mockear la respuesta de la base de datos
        const adminMock = {
            _id: '609b8d5e7d1c8c6d88e0f1c3',
            email: 'test@ejemplo.com',
            password: 'passwordEn',  
            matchPassword: jest.fn().mockResolvedValue(true),
            confirmEmail: true,
        };
        jest.spyOn(administrador, 'findOne').mockResolvedValue(adminMock);

        const response = await request(app)
            .post('/api/login')
            .send({ email: 'test@ejemplo.com', password: '123456' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    it('should return 404 if the email does not exist', async () => {
        jest.spyOn(administrador, 'findOne').mockResolvedValue(null);

        const response = await request(app)
            .post('/api/login')
            .send({ email: 'noexiste@example.com', password: '123456' });

        expect(response.status).toBe(404);
        expect(response.body.msg).toBe('Lo sentimos, el email no existe');
    });

    it('should return 403 if the password is incorrect', async () => {
        const adminMock = {
            email: 'test@ejemplo.com',
            matchPassword: jest.fn().mockResolvedValue(false),
        };
        jest.spyOn(administrador, 'findOne').mockResolvedValue(adminMock);

        const response = await request(app)
            .post('/api/login')
            .send({ email: 'test@ejemplo.com', password: '1234' });

        expect(response.status).toBe(403);
        expect(response.body.msg).toBe('Lo sentimos, la contraseña es incorrecta');
    });
});

*/