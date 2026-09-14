'use strict';

/**
 * Config do agente New Relic. Precisa ser carregado antes de qualquer outro
 * módulo do processo — ver o primeiro import de src/main.ts.
 */
exports.config = {
  app_name: [process.env.NEW_RELIC_APP_NAME ?? 'oficina-api'],
  license_key: process.env.NEW_RELIC_LICENSE_KEY,

  // Desligado por padrão: sem isso, rodar testes ou subir a app local sem
  // license key faz o agente tentar conectar e poluir a saída. Em homolog e
  // prod o Deployment define NEW_RELIC_ENABLED=true.
  agent_enabled: process.env.NEW_RELIC_ENABLED === 'true',

  distributed_tracing: {
    enabled: true,
  },

  application_logging: {
    enabled: true,
    forwarding: {
      // Encaminha os logs JSON do pino para o New Relic e injeta os ids de
      // trace/span em cada linha, ligando log a trace (ADR 0004).
      enabled: true,
    },
    local_decorating: {
      enabled: false,
    },
  },

  logging: {
    level: process.env.NEW_RELIC_LOG_LEVEL ?? 'info',
  },

  allow_all_headers: true,
  attributes: {
    exclude: [
      'request.headers.authorization',
      'request.headers.cookie',
      'request.headers.proxyAuthorization',
      'request.headers.setCookie*',
      'request.headers.x*',
      'response.headers.cookie',
      'response.headers.setCookie*',
    ],
  },
};
