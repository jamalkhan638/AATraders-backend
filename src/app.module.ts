import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './modules/products/products.module';
import { ShopModule } from './modules/shop/shop.module';
import { UsersModule } from './modules/users/users.module';
import * as path from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { MulterModule } from '@nestjs/platform-express';




@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    ProductModule,UsersModule,ShopModule,MulterModule.register({
      dest: './files'
    }),ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'files')
    }), 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
