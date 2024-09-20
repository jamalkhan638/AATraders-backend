"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const nestjs_config_1 = require("nestjs-config");
const app_module_1 = require("./app.module");
const { initStorage, initStaticDirectories } = require('../src/config/storage');
const express = require("express");
const path_1 = require("path");
const timezone = require('../src/config/timezone');
var momentTZ = require('moment-timezone');
momentTZ.tz.setDefault("Europe/London");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = app.get(nestjs_config_1.ConfigService);
    const port = config.get('app.port') || 3200;
    app.enableCors();
    app.setGlobalPrefix('api');
    if (process.env.EXPRESS_ENVIRONMENT == 'development') {
        const options = new swagger_1.DocumentBuilder()
            .setTitle('Swagger Project')
            .setDescription('Project Endpoints ')
            .setVersion('0.1')
            .addBearerAuth({
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            name: 'JWT',
            description: 'Enter JWT token',
            in: 'header',
        }, 'jwt')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, options);
        swagger_1.SwaggerModule.setup('api/v1/docs', app, document, {
            swaggerOptions: { defaultModelsExpandDepth: -1 },
        });
    }
    app.use(timezone);
    initStaticDirectories(app);
    app.use(express.static((0, path_1.join)(__dirname, '../media')));
    app.use(express.static((0, path_1.join)(__dirname, '../files')));
    await app.listen(port, () => {
        console.log(`Server listening on port: ${port}...`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map