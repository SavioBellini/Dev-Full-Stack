import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Usuario } from './usuario.entity';
import { CriarUsuarioDto } from './dto/criar-usuario.dto';
import { AtualizarUsuarioDto } from './dto/atualizar-usuario.dto';

@Injectable()
export class UsuariosService {
  private usuarios: Usuario[] = [];
  private seq = 1;

  create(dto: CriarUsuarioDto): Usuario {
    // e-mail único
    const existeEmail = this.usuarios.some(u => u.email.toLowerCase() === dto.email.toLowerCase());
    if (existeEmail) {
      throw new BadRequestException('E-mail já cadastrado');
    }

    const novo: Usuario = {
      id: this.seq++,
      nome: dto.nome,
      email: dto.email,
      cidade: dto.cidade,
      telefone: dto.telefone,
     
    };

    this.usuarios.push(novo);
    return novo;
  }

  findAll(): Usuario[] {
    return this.usuarios;
  }

  findOne(id: number): Usuario {
    const user = this.usuarios.find(u => u.id === id);
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }

  update(id: number, dto: AtualizarUsuarioDto): Usuario {
    const user = this.findOne(id);

    if (dto.email && dto.email.toLowerCase() !== user.email.toLowerCase()) {
      const existeEmail = this.usuarios.some(
        u => u.email.toLowerCase() === dto.email!.toLowerCase() && u.id !== id,
      );
      if (existeEmail) throw new BadRequestException('E-mail já cadastrado');
    }

    Object.assign(user, dto);
    return user;
  }

  remove(id: number): { deleted: true } {
    this.findOne(id); // garante 404 se não existir
    this.usuarios = this.usuarios.filter(u => u.id !== id);
    return { deleted: true };
  }
}
