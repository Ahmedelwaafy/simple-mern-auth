import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import environmentValidation from './config/environment.validation';
import jwtConfig from './config/jwt.config';
import { DataResponseInterceptor } from './common/interceptors/data-response/data-response.interceptor';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { SubjectModule } from './subject/subject.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { AppLogger } from './common/logger/logger.config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppThrottlerGuard } from './common/guards/throttler.guard';
import securityConfig from './config/security.config';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      load: [appConfig, databaseConfig, jwtConfig, securityConfig],
      validationSchema: environmentValidation,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const logger = new AppLogger('MongoDB');
        logger.log('Attempting to connect to MongoDB...');
        return {
          uri: configService.get<string>('database.uri'),
          dbName: configService.get<string>('database.dbName'),
          connectionFactory: (connection) => {
            connection.on('connected', () => {
              logger.log('MongoDB connection established successfully');
            });
            connection.on('error', (error) => {
              logger.error('MongoDB connection error:', error.message);
            });
            connection.on('disconnected', () => {
              logger.warn('MongoDB disconnected');
            });
            return connection;
          },
        };
      },
    }),
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: {
          expiresIn: `${configService.get<number>('jwt.accessTokenTtl')}s`,
          audience: configService.get<string>('jwt.audience'),
          issuer: configService.get<string>('jwt.issuer'),
        },
      }),
    }),
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        throttlers: [
          {
            ttl: config.get<number>('security.throttle.ttl'),
            limit: config.get<number>('security.throttle.limit'),
          },
        ],
      }),
    }),
    SubjectModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: DataResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AppThrottlerGuard,
    },
    AppLogger,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
