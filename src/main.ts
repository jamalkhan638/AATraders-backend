import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from 'nestjs-config';
import { AppModule } from './app.module';
const { initStorage, initStaticDirectories } = require('../src/config/storage');
import * as express from 'express';
import { join } from 'path';
const timezone = require('../src/config/timezone');
var momentTZ = require('moment-timezone');
momentTZ.tz.setDefault("Europe/London");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);

  const port = config.get('app.port') || 3200;
  app.enableCors();
  app.setGlobalPrefix('api');
  if (process.env.EXPRESS_ENVIRONMENT == 'development') {
    const options = new DocumentBuilder()
      .setTitle('Swagger Project')
      .setDescription('Project Endpoints ')
      .setVersion('0.1')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'JWT',
          description: 'Enter JWT token',
          in: 'header',
        },
        'jwt',
      )
      .build();
    const document = SwaggerModule.createDocument(app, options);
    // SwaggerModule.setup('docs', app, document);
    SwaggerModule.setup('api/v1/docs', app, document, {
      swaggerOptions: { defaultModelsExpandDepth: -1 },
    });
    // SwaggerModule.setup('api/v1/docs', app, document);
  }
  app.use(timezone);
  initStaticDirectories(app);
  app.use(express.static(join(__dirname, '../media')))
  app.use(express.static(join(__dirname, '../files')))
   await app.listen(port, () => {
    console.log(`Server listening on port: ${port}...`);
  });

}
bootstrap();
