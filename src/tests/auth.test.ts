import bcrypt from 'bcrypt';
import request from 'supertest';
import { createConnection, getRepository } from 'typeorm';
import App from '@/app';
import { dbConnection } from '@databases';
import { CreateUserDto } from '@dtos/users.dto';
import AuthRoute from '@routes/auth.route';

beforeAll(async () => {
  await createConnection(dbConnection);
});

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});
