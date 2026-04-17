import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter());

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
    .addTag('customers', 'Gestão de clientes')
    .addTag('vehicles', 'Gestão de veículos')
    .addTag('services', 'Catálogo de serviços')
    .addTag('parts', 'Estoque de peças')
    .addTag('service-orders', 'Ordens de serviço')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
