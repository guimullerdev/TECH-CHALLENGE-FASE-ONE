import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { PoolConfig } from 'pg';

// Bundle de CAs da AWS para RDS. O certificado do RDS é assinado por uma CA
// da Amazon que não está no trust store padrão do Node, então sem ele o
// handshake falha com "self-signed certificate in certificate chain".
const CA_BUNDLE_PATH = join(process.cwd(), 'certs', 'rds-global-bundle.pem');

/**
 * Monta a configuração do pool `pg` usado pelo adapter do Prisma.
 *
 * O `pg` dá precedência ao que vem parseado da connectionString sobre o
 * config explícito, então um `sslmode` na URL viraria `ssl: {}` e apagaria o
 * bundle de CAs. Por isso ele sai da URL: quem decide o TLS passa a ser só o
 * bloco `ssl` montado aqui.
 *
 * A intenção declarada na URL continua sendo respeitada — sem `sslmode` (ou
 * com `disable`), a conexão segue sem TLS, que é o caso do Postgres em
 * container no desenvolvimento local.
 */
export function buildPoolConfig(databaseUrl: string): PoolConfig {
    const url = new URL(databaseUrl);
    const sslmode = url.searchParams.get('sslmode');
    url.searchParams.delete('sslmode');

    const semTls = !sslmode || sslmode === 'disable';
    if (semTls) {
        return { connectionString: url.toString() };
    }

    return {
        connectionString: url.toString(),
        // rejectUnauthorized fica no default (true): com a CA correta em mãos
        // não há motivo para abrir mão da validação de cadeia e de hostname.
        ssl: { ca: readFileSync(CA_BUNDLE_PATH, 'utf8') },
    };
}
