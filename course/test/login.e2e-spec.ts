import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AuthDto } from '../dist/auth/dto/auth.dto';
import { disconnect } from 'mongoose';

const loginDto: AuthDto = {
  login: 'qwe@qwe.ru',
  password: '1',
};

const loginDtoFail: AuthDto = {
  login: 'qwe@qwe.ru',
  password: '12',
};

describe('', () => {
  let app: INestApplication;


  beforeEach(async () => {

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

  });

  it('login - suc', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.access_token).not.toBeUndefined();
      });
  });
  it('password — fail', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDtoFail)
      .expect(401, {
        statusCode: 401,
        message: 'Неверный password',
        error: 'Unauthorized',
      });

  });
  it('login - fail', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ ...loginDto, login: 'rf@rf.ru' })
      .expect(401, {
        statusCode: 401,
        message: 'Пользователь с таким email не найдет',
        error: 'Unauthorized',
      });

  });


  afterAll(() => {
    disconnect();
  });

});