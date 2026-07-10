import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class WebhookAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = (request.headers as any)['authorization'] as
      | string
      | undefined;

    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Token de webhook ausente ou mal formatado',
      );
    }

    const token = authHeader.slice(7);
    const secret = process.env.WEBHOOK_SECRET;

    if (!secret || token !== secret) {
      throw new UnauthorizedException('Token de webhook inválido');
    }

    return true;
  }
}
