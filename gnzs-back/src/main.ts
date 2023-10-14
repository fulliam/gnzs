import { NestFactory } from '@nestjs/core';
import { CrmModule } from './crm.module';

async function bootstrap() {
  const app = await NestFactory.create(CrmModule);

  app.enableCors();

  await app.listen(3000);
}
bootstrap();
