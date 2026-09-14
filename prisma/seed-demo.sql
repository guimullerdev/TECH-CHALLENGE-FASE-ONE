-- ---------------------------------------------------------------------------
-- Massa de demonstração
-- ---------------------------------------------------------------------------
-- Aplicada por `k8s/seed-demo-job.yaml`. Existe para que a gravação do vídeo
-- da Fase 3 tenha o que mostrar: as migrations criam o schema, não os dados.
--
-- NÃO é seed de produção. É massa fixa e idempotente, pensada para um
-- ambiente descartável.
--
-- Idempotente de propósito: rodar duas vezes não duplica nem falha, então dá
-- para reexecutar entre ensaios da gravação.
--
-- Não cria usuário de staff: `POST /auth/register` é público, então o login
-- da oficina se cria pela própria API — assim nenhuma senha (nem hash) mora
-- no repositório.
--
-- Os CPFs abaixo são sintéticos, com dígito verificador válido (a Lambda de
-- autenticação valida o DV antes de consultar o banco). Não pertencem a
-- ninguém.
-- ---------------------------------------------------------------------------

BEGIN;

-- ---------------------------------------------------------------------------
-- Clientes
-- ---------------------------------------------------------------------------
-- Três perfis, cada um cobrindo um caminho do roteiro:
--   ativo    → autentica e recebe JWT
--   inativo  → 403, mesmo com CPF válido e cadastrado
--   outro    → dono de uma OS alheia, para demonstrar o 404 de /os/:id/status
INSERT INTO clientes (id, nome, documento, tipo_documento, telefone, email, ativo, created_at, updated_at)
VALUES
  ('11111111-1111-4111-8111-111111111111', 'Helena Duarte',  '69759054876', 'CPF', '11988880001', 'helena.duarte@exemplo.test',  true,  NOW() - INTERVAL '90 days', NOW()),
  ('22222222-2222-4222-8222-222222222222', 'Rui Albuquerque','38405253149', 'CPF', '11988880002', 'rui.albuquerque@exemplo.test', false, NOW() - INTERVAL '80 days', NOW()),
  ('33333333-3333-4333-8333-333333333333', 'Iara Fontenele', '18547707131', 'CPF', '11988880003', 'iara.fontenele@exemplo.test',  true,  NOW() - INTERVAL '70 days', NOW())
ON CONFLICT (documento) DO NOTHING;

-- ---------------------------------------------------------------------------
-- Veículos
-- ---------------------------------------------------------------------------
INSERT INTO veiculos (id, cliente_id, placa, marca, modelo, ano, cor, km_atual, ativo, created_at, updated_at)
VALUES
  ('aaaaaaaa-1111-4111-8111-aaaaaaaaaaaa', '11111111-1111-4111-8111-111111111111', 'RKT2A19', 'Volkswagen', 'Gol',    2019, 'Prata', 78400,  true, NOW() - INTERVAL '90 days', NOW()),
  ('aaaaaaaa-2222-4222-8222-aaaaaaaaaaaa', '11111111-1111-4111-8111-111111111111', 'RKT5B42', 'Fiat',       'Argo',   2021, 'Branco', 41200, true, NOW() - INTERVAL '60 days', NOW()),
  ('aaaaaaaa-3333-4333-8333-aaaaaaaaaaaa', '33333333-3333-4333-8333-333333333333', 'RKT8C77', 'Chevrolet',  'Onix',   2020, 'Preto', 63900,  true, NOW() - INTERVAL '70 days', NOW())
ON CONFLICT (placa) DO NOTHING;

-- ---------------------------------------------------------------------------
-- Catálogo de serviços
-- ---------------------------------------------------------------------------
INSERT INTO servicos (id, nome, descricao, preco_base, tempo_estimado, ativo, created_at, updated_at)
VALUES
  ('bbbbbbbb-1111-4111-8111-bbbbbbbbbbbb', 'Troca de óleo e filtro', 'Óleo sintético 5W30 e filtro de óleo',   189.90, 45,  true, NOW() - INTERVAL '120 days', NOW()),
  ('bbbbbbbb-2222-4222-8222-bbbbbbbbbbbb', 'Alinhamento e balanceamento', 'Quatro rodas',                      149.00, 60,  true, NOW() - INTERVAL '120 days', NOW()),
  ('bbbbbbbb-3333-4333-8333-bbbbbbbbbbbb', 'Revisão de freios', 'Pastilhas, discos e fluido',                  420.00, 120, true, NOW() - INTERVAL '120 days', NOW()),
  ('bbbbbbbb-4444-4444-8444-bbbbbbbbbbbb', 'Diagnóstico eletrônico', 'Leitura de códigos e laudo',              120.00, 30,  true, NOW() - INTERVAL '120 days', NOW())
ON CONFLICT (id) DO NOTHING;

-- ---------------------------------------------------------------------------
-- Estoque
-- ---------------------------------------------------------------------------
INSERT INTO pecas (id, nome, codigo, descricao, preco_unitario, qtd_total, qtd_disponivel, qtd_reservada, ativo, created_at, updated_at)
VALUES
  ('cccccccc-1111-4111-8111-cccccccccccc', 'Filtro de óleo',      'FLT-001', 'Compatível com linha VW/Fiat',  38.50, 40, 40, 0, true, NOW() - INTERVAL '120 days', NOW()),
  ('cccccccc-2222-4222-8222-cccccccccccc', 'Óleo 5W30 sintético', 'OLE-530', 'Litro',                          54.90, 60, 60, 0, true, NOW() - INTERVAL '120 days', NOW()),
  ('cccccccc-3333-4333-8333-cccccccccccc', 'Pastilha de freio',   'FRE-210', 'Jogo dianteiro',                189.00, 12, 12, 0, true, NOW() - INTERVAL '120 days', NOW())
ON CONFLICT (codigo) DO NOTHING;

-- ---------------------------------------------------------------------------
-- Ordens de serviço
-- ---------------------------------------------------------------------------
-- OS-2026-0001 — encerrada, com trilha completa de status.
--   Dá conteúdo imediato ao painel "tempo médio por status": sem pelo menos
--   uma OS com histórico, o gráfico nasce vazio e não há o que analisar.
--
-- OS-2026-0002 — parada em EM_DIAGNOSTICO, para transicionar durante a
--   gravação e o painel se mexer ao vivo. A entrada de histórico é datada
--   para trás justamente para a duração aparecer com valor visível.
--
-- OS-2026-0003 — de outro cliente (Iara). É a OS usada para mostrar que
--   Helena recebe 404, e não 403, ao tentar consultá-la.
INSERT INTO ordens_de_servico (id, numero, cliente_id, veiculo_id, status, arquivada, descricao_problema, data_abertura, data_fechamento, created_at, updated_at)
VALUES
  ('dddddddd-1111-4111-8111-dddddddddddd', 'OS-2026-0001', '11111111-1111-4111-8111-111111111111', 'aaaaaaaa-1111-4111-8111-aaaaaaaaaaaa', 'ENTREGUE',       false, 'Barulho ao frear e revisão de 70 mil km', NOW() - INTERVAL '12 days', NOW() - INTERVAL '9 days', NOW() - INTERVAL '12 days', NOW()),
  ('dddddddd-2222-4222-8222-dddddddddddd', 'OS-2026-0002', '11111111-1111-4111-8111-111111111111', 'aaaaaaaa-2222-4222-8222-aaaaaaaaaaaa', 'EM_DIAGNOSTICO', false, 'Luz de injeção acesa de forma intermitente', NOW() - INTERVAL '2 days', NULL, NOW() - INTERVAL '2 days', NOW()),
  ('dddddddd-3333-4333-8333-dddddddddddd', 'OS-2026-0003', '33333333-3333-4333-8333-333333333333', 'aaaaaaaa-3333-4333-8333-aaaaaaaaaaaa', 'EM_EXECUCAO',    false, 'Troca de óleo e alinhamento', NOW() - INTERVAL '1 day', NULL, NOW() - INTERVAL '1 day', NOW())
ON CONFLICT (numero) DO NOTHING;

-- ---------------------------------------------------------------------------
-- Histórico de status
-- ---------------------------------------------------------------------------
-- É esta tabela que alimenta GET /os/:id/acompanhamento e a métrica de tempo
-- por status. Os intervalos são deliberadamente diferentes entre si para o
-- gráfico não sair achatado.
INSERT INTO historico_status_os (id, os_id, status_anterior, status_novo, data)
VALUES
  ('eeeeeeee-1111-4111-8111-eeeeeeeeeeee', 'dddddddd-1111-4111-8111-dddddddddddd', NULL,                   'RECEBIDA',             NOW() - INTERVAL '12 days'),
  ('eeeeeeee-1112-4111-8111-eeeeeeeeeeee', 'dddddddd-1111-4111-8111-dddddddddddd', 'RECEBIDA',             'EM_DIAGNOSTICO',       NOW() - INTERVAL '12 days' + INTERVAL '3 hours'),
  ('eeeeeeee-1113-4111-8111-eeeeeeeeeeee', 'dddddddd-1111-4111-8111-dddddddddddd', 'EM_DIAGNOSTICO',       'AGUARDANDO_APROVACAO', NOW() - INTERVAL '11 days'),
  ('eeeeeeee-1114-4111-8111-eeeeeeeeeeee', 'dddddddd-1111-4111-8111-dddddddddddd', 'AGUARDANDO_APROVACAO', 'APROVADA',             NOW() - INTERVAL '11 days' + INTERVAL '20 hours'),
  ('eeeeeeee-1115-4111-8111-eeeeeeeeeeee', 'dddddddd-1111-4111-8111-dddddddddddd', 'APROVADA',             'EM_EXECUCAO',          NOW() - INTERVAL '10 days'),
  ('eeeeeeee-1116-4111-8111-eeeeeeeeeeee', 'dddddddd-1111-4111-8111-dddddddddddd', 'EM_EXECUCAO',          'FINALIZADA',           NOW() - INTERVAL '9 days' - INTERVAL '5 hours'),
  ('eeeeeeee-1117-4111-8111-eeeeeeeeeeee', 'dddddddd-1111-4111-8111-dddddddddddd', 'FINALIZADA',           'ENTREGUE',             NOW() - INTERVAL '9 days'),

  ('eeeeeeee-2221-4222-8222-eeeeeeeeeeee', 'dddddddd-2222-4222-8222-dddddddddddd', NULL,                   'RECEBIDA',             NOW() - INTERVAL '2 days'),
  ('eeeeeeee-2222-4222-8222-eeeeeeeeeeee', 'dddddddd-2222-4222-8222-dddddddddddd', 'RECEBIDA',             'EM_DIAGNOSTICO',       NOW() - INTERVAL '2 days' + INTERVAL '90 minutes'),

  ('eeeeeeee-3331-4333-8333-eeeeeeeeeeee', 'dddddddd-3333-4333-8333-dddddddddddd', NULL,                   'RECEBIDA',             NOW() - INTERVAL '1 day'),
  ('eeeeeeee-3332-4333-8333-eeeeeeeeeeee', 'dddddddd-3333-4333-8333-dddddddddddd', 'RECEBIDA',             'EM_DIAGNOSTICO',       NOW() - INTERVAL '1 day' + INTERVAL '2 hours'),
  ('eeeeeeee-3333-4333-8333-eeeeeeeeeeee', 'dddddddd-3333-4333-8333-dddddddddddd', 'EM_DIAGNOSTICO',       'AGUARDANDO_APROVACAO', NOW() - INTERVAL '1 day' + INTERVAL '5 hours'),
  ('eeeeeeee-3334-4333-8333-eeeeeeeeeeee', 'dddddddd-3333-4333-8333-dddddddddddd', 'AGUARDANDO_APROVACAO', 'APROVADA',             NOW() - INTERVAL '8 hours'),
  ('eeeeeeee-3335-4333-8333-eeeeeeeeeeee', 'dddddddd-3333-4333-8333-dddddddddddd', 'APROVADA',             'EM_EXECUCAO',          NOW() - INTERVAL '6 hours')
ON CONFLICT (id) DO NOTHING;

-- ---------------------------------------------------------------------------
-- Itens da OS encerrada
-- ---------------------------------------------------------------------------
INSERT INTO os_itens_servico (id, os_id, servico_id, preco_unitario, inicio_exec, fim_exec, created_at)
VALUES
  ('ffffffff-1111-4111-8111-ffffffffffff', 'dddddddd-1111-4111-8111-dddddddddddd', 'bbbbbbbb-3333-4333-8333-bbbbbbbbbbbb', 420.00, NOW() - INTERVAL '10 days', NOW() - INTERVAL '9 days' - INTERVAL '5 hours', NOW() - INTERVAL '12 days'),
  ('ffffffff-1112-4111-8111-ffffffffffff', 'dddddddd-1111-4111-8111-dddddddddddd', 'bbbbbbbb-1111-4111-8111-bbbbbbbbbbbb', 189.90, NOW() - INTERVAL '10 days', NOW() - INTERVAL '10 days' + INTERVAL '45 minutes', NOW() - INTERVAL '12 days')
ON CONFLICT (id) DO NOTHING;

INSERT INTO os_itens_peca (id, os_id, peca_id, quantidade, preco_unitario, utilizada, created_at)
VALUES
  ('ffffffff-2221-4222-8222-ffffffffffff', 'dddddddd-1111-4111-8111-dddddddddddd', 'cccccccc-3333-4333-8333-cccccccccccc', 1, 189.00, true, NOW() - INTERVAL '11 days'),
  ('ffffffff-2222-4222-8222-ffffffffffff', 'dddddddd-1111-4111-8111-dddddddddddd', 'cccccccc-2222-4222-8222-cccccccccccc', 4,  54.90, true, NOW() - INTERVAL '11 days'),
  ('ffffffff-2223-4222-8222-ffffffffffff', 'dddddddd-1111-4111-8111-dddddddddddd', 'cccccccc-1111-4111-8111-cccccccccccc', 1,  38.50, true, NOW() - INTERVAL '11 days')
ON CONFLICT (id) DO NOTHING;

INSERT INTO orcamentos (id, os_id, status, valor_total, data_geracao, data_envio, data_resposta, observacoes, created_at, updated_at)
VALUES
  ('ffffffff-3331-4333-8333-ffffffffffff', 'dddddddd-1111-4111-8111-dddddddddddd', 'APROVADO', 1053.50, NOW() - INTERVAL '11 days', NOW() - INTERVAL '11 days' + INTERVAL '1 hour', NOW() - INTERVAL '11 days' + INTERVAL '20 hours', 'Aprovado por telefone', NOW() - INTERVAL '11 days', NOW())
ON CONFLICT (os_id) DO NOTHING;

COMMIT;
