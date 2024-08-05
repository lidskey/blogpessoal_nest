import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  process.env.TZ = '-03:00'; //fuso-horario brasileiro

  app.useGlobalPipes(new ValidationPipe()); //utilizado para validar os objetos, registra pipes globais, todas as requisições serão validadas através dessa biblioteca

  app.enableCors(); //cross origins SOFEA, se não habilita ele não irá comunicar back e front "aceite requisições de um servidor diferente do backend"

  await app.listen(4000);// porta do local host
}
bootstrap();
