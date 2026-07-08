import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export enum WebhookAcao {
  APROVAR = 'APROVAR',
  REPROVAR = 'REPROVAR',
}

export class WebhookNotificacaoDto {
  @ApiProperty({
    example: 'uuid-da-os',
    description: 'UUID da Ordem de Serviço',
  })
  @IsNotEmpty()
  @IsUUID()
  osId: string;

  @ApiProperty({ enum: WebhookAcao, description: 'Ação a executar' })
  @IsEnum(WebhookAcao)
  acao: WebhookAcao;

  @ApiPropertyOptional({ example: 'Cliente aprovou via portal' })
  @IsOptional()
  @IsString()
  observacoes?: string;
}
