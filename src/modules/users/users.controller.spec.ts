import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserEntity } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtStrategy } from '../../guards/auth/jwt.strategy';

describe('UsersController', () => {
  let app: INestApplication;
  let controller: UsersController;
  const mockUserService = {
    register: jest.fn(dto => {
      return {
        id: Date.now(),
        ...dto
      }
    })
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([
          UserEntity,
        ])
      ],
      providers: [UsersService,JwtStrategy],
      controllers: [UsersController]
    }).compile();

    app = module.createNestApplication();
    await app.init();

    controller = module.get<UsersController>(UsersController);
  });

  afterEach(async () => {
    await app.close();
  });

  describe('getUser', () => {
    it('should return a user with the specified id', async () => {
      const result = Promise.resolve({ id: 1, first_name: 'test ',last_name:'user',is_admin:true } as UserEntity)// { id: 1, name: 'test' };
      jest.spyOn(controller, 'getUser').mockImplementation(() =>result );

      expect(await controller.getUser(1)).toBe(result);
    });
  });

  describe('register', () => {
    it('should create a new user', async () => {
      const result = Promise.resolve({user:{ id: 1, first_name: 'test ',last_name:'user',is_admin:true } as UserEntity,token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJhZG1pbjJAeW9wbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiYWRtaW4iLCJsYXN0X25hbWUiOiJ1c2VyIiwiaXNfYWRtaW4iOnRydWUsImlhdCI6MTY3OTgxMjY5MCwiZXhwIjoxNjgwNDE3NDkwfQ.wQa2dDCXtJg4O-62gdmAV2uf62UiCERF-A5ONW-_d0A'})// { id: 1, name: 'test' };

      jest.spyOn(controller, 'register').mockImplementation(() => result);

      const data = {
        "email": "admin11221@yopmail.com",
        "password": "123456",
        "is_admin": true,
        "first_name": "admin",
        "last_name": "user"
      };
      expect(await controller.register(data)).toBe(result);
    });
  });

  describe('update', () => {
    it('should update an existing user', async () => {
      const result = Promise.resolve({ id: 1, first_name: 'test ',last_name:'user',is_admin:true } as UserEntity)// { id: 1, name: 'test' };
      jest.spyOn(controller, 'updateUser').mockImplementation(() => result);

      const data = { email: 'updated',password:'123456' };
      expect(await controller.updateUser(1, data)).toBe(result);
    });
  });

  describe('deleteUser', () => {
    it('should delete an existing user', async () => {
      const result = Promise.resolve({raw:[],affected:1 });

      jest.spyOn(controller, 'deleteUser').mockImplementation(() => result);

      expect(await controller.deleteUser(1)).toBe(result);
    });
  });

  // describe('API endpoint tests', () => {
  //   it('should return an array of users', async () => {
  //     const result = [{ id: 1, name: 'test' }];
  //     jest.spyOn(controller, 'findAll').mockImplementation(() => result);

  //     const response = await request(app.getHttpServer()).get('/users');
  //     expect(response.status).toBe(200);
  //     expect(response.body).toEqual(result);
  //   });

  //   it('should return a user with the specified id', async () => {
  //     const result = { id: 1, name: 'test' };
  //     jest.spyOn(controller, 'findOne').mockImplementation(() => result);

  //     const response = await request(app.getHttpServer()).get('/users/1');
  //     expect(response.status).toBe(200);
  //   });
  // });
     
});