// Precisa ser o primeiro import do processo: o agente do New Relic
// instrumenta os módulos conforme eles são carregados, então qualquer coisa
// importada antes dele fica sem instrumentação. O agente só liga de fato se
// NEW_RELIC_ENABLED=true (ver newrelic.cjs).
import 'newrelic';

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  // bufferLogs: segura os logs do boot até o logger do pino estar pronto,
  // senão as primeiras linhas sairiam no formato padrão do Nest, sem JSON.
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.useLogger(app.get(Logger));

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
    .addTag('health', 'Health check')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
