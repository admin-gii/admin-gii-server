import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });

  const config = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('The NestJS API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    include: [UsersModule, AuthModule],
  });
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(3000);
}
bootstrap();
