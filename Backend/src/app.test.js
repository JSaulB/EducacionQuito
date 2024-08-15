import request from 'supertest';
import app from './server.js';

/*describe('GET api/ciudadania/', () => {
    it('responds with 200', (done) => {
        request(app).get('/api/ciudadania/').expect(404, done);
    });
});*/


describe('API Routes', () => {

    test('should respond with 200 for GET /api/ciudadania', async () => {
        const response = await request(app).get('/api/ciudadania');
        expect(response.status).toBe(200);
    });

    test('should respond with 404 for GET /nonexistent-route', async () => {
        const response = await request(app).get('/nonexistent-route');
        expect(response.status).toBe(404);
    });

    test('should respond with 301 for GET /api/docs', async () => {
        const response = await request(app).get('/api/docs');
        expect(response.status).toBe(301);
    });

    test('should respond with 200 for GET /api', async () => {
        const response = await request(app).get('/api');
        expect(response.status).toBe(200);
    });

});






