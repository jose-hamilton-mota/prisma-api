import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';
import { UnauthorizedError } from 'src/errors/types/unauthorizedError';
import { NotFoundError } from 'src/errors/types/notFoundError';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor( private readonly repository: UsersRepository ){}

  create(createUserDto: CreateUserDto) {
    return this.repository.create(createUserDto);
  }

  findAll() {
    //throw new UnauthorizedError('Não autorizado.');
    return this.repository.findAll();
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.repository.findOne(id);

    if(!user){
      throw new NotFoundError('Usuario não encontrado.');
    }

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.repository.update(id,updateUserDto);
  }

  remove(id: number) {
    return this.repository.remove(id);
  }
}
