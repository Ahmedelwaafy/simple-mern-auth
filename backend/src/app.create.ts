import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

export function createApp(app: INestApplication) {
  app.setGlobalPrefix('api');

  //* Use validation pipes globally

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

  //*  swagger configuration

  const swaggerConfig = new DocumentBuilder()
    .setTitle('NestJs Simple Auth System API')
    .setDescription('Use the base API URL as https://simple-mern-auth-production.up.railway.app')
    .setTermsOfService('https://simple-mern-auth-production.up.railway.app/terms-of-service')
    .setLicense(
      'MIT License',
      'https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt',
    )
    .addServer('https://simple-mern-auth-production.up.railway.app')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  //* cookie parser
  app.use(cookieParser());

  //* enable cors
  app.enableCors({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true, // IMPORTANT for cookies
  });
}
