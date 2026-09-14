import { buildPoolConfig } from './pg-connection';

describe('buildPoolConfig', () => {
    const URL_RDS =
        'postgresql://user:pass@oficina-db.abc.us-east-1.rds.amazonaws.com:5432/oficina_prod?sslmode=require';
    const URL_LOCAL = 'postgresql://oficina:oficina@localhost:5432/oficina_db';

    describe('com sslmode na URL (RDS)', () => {
        // O `pg` deixa o que vem parseado da connectionString sobrescrever o
        // config explícito: um sslmode na URL vira `ssl: {}` e apaga o bundle
        // de CAs, derrubando o handshake com "self-signed certificate in
        // certificate chain". Foi o que aconteceu no primeiro acesso ao RDS.
        it('remove o sslmode da connectionString', () => {
            const config = buildPoolConfig(URL_RDS);

            expect(config.connectionString).not.toContain('sslmode');
        });

        it('carrega o bundle de CAs do RDS', () => {
            const config = buildPoolConfig(URL_RDS);

            expect(config.ssl).toBeDefined();
            expect((config.ssl as { ca: string }).ca).toContain('BEGIN CERTIFICATE');
        });

        it('mantém a validação de cadeia ligada', () => {
            const config = buildPoolConfig(URL_RDS);

            // rejectUnauthorized não é desligado em lugar nenhum — fica no
            // default (true) do Node.
            expect(config.ssl).not.toHaveProperty('rejectUnauthorized', false);
        });

        it('preserva host, porta, credenciais e database', () => {
            const url = new URL(buildPoolConfig(URL_RDS).connectionString as string);

            expect(url.hostname).toBe('oficina-db.abc.us-east-1.rds.amazonaws.com');
            expect(url.port).toBe('5432');
            expect(url.username).toBe('user');
            expect(url.password).toBe('pass');
            expect(url.pathname).toBe('/oficina_prod');
        });

        it('preserva os demais parâmetros de query', () => {
            const config = buildPoolConfig(`${URL_RDS}&application_name=oficina`);

            expect(config.connectionString).toContain('application_name=oficina');
        });
    });

    describe('sem sslmode na URL (Postgres local)', () => {
        // O Postgres em container do desenvolvimento local não fala TLS;
        // forçar `ssl` aqui quebraria o ambiente de todo mundo.
        it('não liga TLS', () => {
            const config = buildPoolConfig(URL_LOCAL);

            expect(config.ssl).toBeUndefined();
        });

        it('trata sslmode=disable como sem TLS', () => {
            const config = buildPoolConfig(`${URL_LOCAL}?sslmode=disable`);

            expect(config.ssl).toBeUndefined();
        });
    });
});
