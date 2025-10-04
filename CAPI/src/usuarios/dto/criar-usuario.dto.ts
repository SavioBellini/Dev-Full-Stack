import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CriarUsuarioDto {
  @ApiProperty({ description: 'Nome completo do usuário' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ description: 'E-mail único do usuário' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Cidade do usuário' })
  @IsString()
  cidade: string;

  @ApiProperty({ description: 'Telefone (opcional)', required: false })
  @IsOptional()
  @IsString()
  telefone?: string;

}
