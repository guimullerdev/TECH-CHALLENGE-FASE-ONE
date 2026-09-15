import { HealthController } from './health.controller';

describe('HealthController', () => {
    const ORIGINAL = process.env;

    afterEach(() => {
        process.env = ORIGINAL;
    });

    it('returns status ok', () => {
        const controller = new HealthController();
        expect(controller.check().status).toBe('ok');
    });

    it('identifica ambiente e versão a partir do ambiente do processo', () => {
        process.env = { ...ORIGINAL, APP_AMBIENTE: 'homolog', APP_VERSION: 'abc123def456' };

        expect(new HealthController().check()).toEqual({
            status: 'ok',
            ambiente: 'homolog',
            versao: 'abc123def456',
        });
    });

    it('cai em valores de desenvolvimento quando o pipeline não injetou nada', () => {
        process.env = { ...ORIGINAL };
        delete process.env.APP_AMBIENTE;
        delete process.env.APP_VERSION;

        expect(new HealthController().check()).toMatchObject({ ambiente: 'local', versao: 'dev' });
    });

    // O monitor de uptime do New Relic valida o corpo procurando a substring
    // `"status":"ok"`. Se `status` deixar de ser o primeiro campo, a string
    // continua presente — mas se mudar de nome, o monitor passa a falhar sem
    // que a aplicação tenha caído.
    it('mantém o campo que o monitor de uptime procura', () => {
        expect(JSON.stringify(new HealthController().check())).toContain('"status":"ok"');
    });
});
