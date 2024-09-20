import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from './shop.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { JwtStrategy } from 'src/guards/auth/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Shop,
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
  providers: [ShopService],
  controllers: [ShopController]
})
export class ShopModule { }
