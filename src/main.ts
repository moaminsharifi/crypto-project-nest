import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
      credentials: false,
    },
  });

  // Swagger config file created
  const config = new DocumentBuilder()
    .setTitle('Crypto Manager API')
    .setDescription('Socket + CRUD Test Project')
    .setVersion('1.0')
    .setBasePath('/v1.0')
    .build();

  // setup swagger on `/docs` route
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // add version prefix to api
  app.setGlobalPrefix('/v1.0');

  // use validator pip for input params and body validation
  app.useGlobalPipes(new ValidationPipe());

  // start listening app
  await app.listen(process.env.LISTENING_PORT || 4000);
}
bootstrap();
