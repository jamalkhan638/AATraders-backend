import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { JwtStrategy } from 'src/guards/auth/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Users,
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: config.get('jwtSecret'),
        signOptions: { expiresIn: process.env.JWT_TOKEN_EXPIRY }
      }),
      inject: [ConfigService]
    })
  ],
  providers: [UsersService,JwtStrategy],
  controllers: [UsersController]
})
export class UsersModule { }
