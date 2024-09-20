import { Module } from '@nestjs/common';
import { ProductService } from './products.service';
import { ProductController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { JwtStrategy } from 'src/guards/auth/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
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
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule { }
