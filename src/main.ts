import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { stringify } from 'yaml';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const options = new DocumentBuilder()
    .setTitle('Home Library')
    .setDescription('Home library api')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  const yamlString: string = stringify(document, {});
  fs.writeFileSync('./doc/api.yaml', yamlString);
  SwaggerModule.setup('/doc', app, document);

  await app.listen(4000);
}
bootstrap();
