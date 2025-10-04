import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UsuariosService } from './usuario.service';
import { CriarUsuarioDto } from './dto/criar-usuario.dto';
import { AtualizarUsuarioDto } from './dto/atualizar-usuario.dto';
import * as usuarioEntity from './usuario.entity';

@ApiTags('usuarios')
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly service: UsuariosService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Usuário criado com sucesso' })
  create(@Body() dto: CriarUsuarioDto): usuarioEntity.Usuario {
    return this.service.create(dto);
  }

  @Get()
  @ApiOkResponse({ description: 'Lista todos os usuários' })
  findAll(): usuarioEntity.Usuario[] {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Retorna um usuário pelo id' })
  findOne(@Param('id') id: string): usuarioEntity.Usuario {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Atualiza um usuário' })
  update(@Param('id') id: string, @Body() dto: AtualizarUsuarioDto): usuarioEntity.Usuario {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Remove um usuário' })
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
