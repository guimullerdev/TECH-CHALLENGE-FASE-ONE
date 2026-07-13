import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { Public } from '../../modules/auth/decorators/public.decorator';

@ApiTags('health')
@Controller('health')
export class HealthController {
    @Get()
    @Public()
    @ApiOperation({ summary: 'Verifica se a aplicação está no ar (liveness/readiness probe)' })
    @ApiResponse({ status: 200, description: 'Aplicação saudável' })
    check() {
        return { status: 'ok' };
    }
}
