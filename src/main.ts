import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Blog Pessoal')
    .setDescription('Projeto Blog Pessoal')
    .setContact("Generation Brasil", "http://www.generationbrasil.online", "generation@email.com")
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  process.env.TZ = '-03:00'; //fuso-horario brasileiro

  app.useGlobalPipes(new ValidationPipe()); //utilizado para validar os objetos, registra pipes globais, todas as requisições serão validadas através dessa biblioteca

  app.enableCors(); //cross origins SOFEA, se não habilita ele não irá comunicar back e front "aceite requisições de um servidor diferente do backend"

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
