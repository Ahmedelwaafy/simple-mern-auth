import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { AppLogger } from './common/logger/logger.config';

export function createApp(app: INestApplication) {
  const configService = app.get(ConfigService);
  const logger = new AppLogger('AppSetup');

  app.setGlobalPrefix('api');

  // Security headers with helmet
  app.use(helmet());

  // Set secure cookie settings
  app.use(cookieParser());

  // Validation pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Swagger configuration
  const swaggerConfig = new DocumentBuilder()
    .setTitle('NestJs Simple Auth System API')
    .setDescription(
      'Use the base API URL as https://simple-mern-auth-production.up.railway.app',
    )
    .setTermsOfService(
      'https://simple-mern-auth-production.up.railway.app/terms-of-service',
    )
    .setLicense(
      'MIT License',
      'https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt',
    )
    .addServer('https://simple-mern-auth-production.up.railway.app')
    .setVersion('1.0')
    .addBearerAuth() // Add bearer auth to Swagger
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  // CORS configuration
  const corsOrigins = configService.get('security.cors.origins');
  app.enableCors({
    origin: corsOrigins,
    credentials: configService.get('security.cors.credentials'),
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    //allowedHeaders: ['Content-Type', 'Authorization'],
  });

  logger.log(`CORS enabled for origins: ${corsOrigins.join(', ')}`);
}
