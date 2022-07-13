import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AuthModule } from './modules/auth/auth.module';
import { DomainsModule } from './modules/domains/domains.module';
import { FormTypesModule } from './modules/form-types/form-types.module';
import { RoleModule } from './modules/roles/role.module';
import { UsersModule } from './modules/users/users.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
      allowedHeaders: '*',
      methods: '*',
      preflightContinue: false,
    },
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      skipMissingProperties: false,
    }),
  );

  app.setGlobalPrefix('api/v1');
  const config = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('The NestJS API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    include: [UsersModule, RoleModule, AuthModule, FormTypesModule , DomainsModule],
  });
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(3000);
}
bootstrap();
