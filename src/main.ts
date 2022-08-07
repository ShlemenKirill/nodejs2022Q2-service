import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { stringify } from 'yaml';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import { PrismaService } from './prisma/prisma.service';
import passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
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

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
