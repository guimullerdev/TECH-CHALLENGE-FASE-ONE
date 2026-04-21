import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: true }));

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Oficina API')
    .setDescription(
      'API para gestão de ordens de serviço de uma oficina mecânica. ' +
      'Inclui CRUD de clientes, veículos, serviços e peças, além do ciclo de vida completo da OS ' +
      '(abertura → diagnóstico → orçamento → aprovação → execução → entrega).',
    )
    .setVersion('1.0')
    .addTag('auth', 'Autenticação e emissão de tokens')
    .addTag('clientes', 'Gestão de clientes')
    .addTag('veiculos', 'Gestão de veículos')
    .addTag('servicos', 'Catálogo de serviços')
    .addTag('pecas', 'Gestão de peças')
    .addTag('os', 'Ordens de serviço')
    .addTag('estoque', 'Controle de estoque')
    .addTag('orcamentos', 'Orçamentos')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
