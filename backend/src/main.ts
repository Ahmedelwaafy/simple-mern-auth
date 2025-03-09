import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createApp } from './app.create';
import { AppLogger } from './common/logger/logger.config';

async function bootstrap() {
  const logger = new AppLogger('Bootstrap');
  try {
    const app = await NestFactory.create(AppModule, {
      logger: new AppLogger(),
    });
    createApp(app);
    const port = process.env.PORT || 3000;
    await app.listen(port);
    logger.log(`Application started successfully on port ${port}`);
  } catch (error) {
    logger.error(`Failed to start application: ${error.message}`, error.stack);
    process.exit(1);
  }
}
bootstrap();
