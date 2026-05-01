import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { ConsultaOsPublicaResponseDto } from '../dto/consulta-os-publica-response.dto';

@Injectable()
export class ConsultaPublicaOsUseCase {
    constructor(private readonly prisma: PrismaService) {}

    async execute(numero: string, documento: string): Promise<ConsultaOsPublicaResponseDto> {
        const digits = documento.replace(/\D/g, '');

        const os = await this.prisma.ordemDeServico.findFirst({
            where: { numero },
            include: { cliente: true, veiculo: true, orcamento: true },
        });

        if (!os || os.cliente.documento !== digits) {
            throw new NotFoundException('OS não encontrada ou documento não confere');
        }

        return {
            numero: os.numero,
            status: os.status,
            dataAbertura: os.dataAbertura,
            veiculo: {
                placa: os.veiculo.placa,
                marca: os.veiculo.marca,
                modelo: os.veiculo.modelo,
            },
            orcamento: os.orcamento
                ? {
                      valorTotal: Number(os.orcamento.valorTotal),
                      status: os.orcamento.status,
                  }
                : undefined,
        };
    }
}
