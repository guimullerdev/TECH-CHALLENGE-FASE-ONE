import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { WebhookAuthGuard } from './webhook-auth.guard';

function makeContext(authHeader?: string): ExecutionContext {
  return {
    switchToHttp: () => ({
      getRequest: () => ({
        headers: authHeader ? { authorization: authHeader } : {},
      }),
    }),
  } as unknown as ExecutionContext;
}

describe('WebhookAuthGuard', () => {
  const guard = new WebhookAuthGuard();
  const originalEnv = process.env.WEBHOOK_SECRET;

  beforeEach(() => {
    process.env.WEBHOOK_SECRET = 'test-secret';
  });
  afterAll(() => {
    process.env.WEBHOOK_SECRET = originalEnv;
  });

  it('allows request with correct Bearer token', () => {
    expect(guard.canActivate(makeContext('Bearer test-secret'))).toBe(true);
  });

  it('throws UnauthorizedException when Authorization header is absent', () => {
    expect(() => guard.canActivate(makeContext())).toThrow(
      UnauthorizedException,
    );
  });

  it('throws UnauthorizedException when token is wrong', () => {
    expect(() => guard.canActivate(makeContext('Bearer wrong-token'))).toThrow(
      UnauthorizedException,
    );
  });

  it('throws UnauthorizedException when prefix is not Bearer', () => {
    expect(() => guard.canActivate(makeContext('Token test-secret'))).toThrow(
      UnauthorizedException,
    );
  });

  it('throws UnauthorizedException when WEBHOOK_SECRET env var is not set', () => {
    delete process.env.WEBHOOK_SECRET;
    expect(() => guard.canActivate(makeContext('Bearer test-secret'))).toThrow(
      UnauthorizedException,
    );
  });
});
