import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from 'src/app.module';

describe('Auth (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('POST /auth/register → 201', async () => {
        const res = await request(app.getHttpServer())
            .post('/auth/register')
            .send({ email: `e2e-app-${Date.now()}@test.com`, password: 'senha123' })
            .expect(201);

        expect(res.body.accessToken).toBeDefined();
    });

    it('POST /auth/login com credenciais inválidas → 401', async () => {
        await request(app.getHttpServer())
            .post('/auth/login')
            .send({ email: 'naoexiste@test.com', password: 'errada' })
            .expect(401);
    });
});
