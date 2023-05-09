import { PrismaService } from "src/prisma/prisma.service";
import { CreatePostDto } from "../dto/create-post.dto";
import { PostEntity } from "../entities/post.entity";
import { UpdatePostDto } from "../dto/update-post.dto";
import { Injectable } from "@nestjs/common";
import {Prisma} from '@prisma/client';
import { NotFoundError } from "src/errors/types/notFoundError";

@Injectable()
export class PostsRepository{
  constructor( private readonly prisma: PrismaService){}

  async create(createPostDto: CreatePostDto): Promise<PostEntity> {
    const {authorEmail} = createPostDto; //separando só o email para achar o autor posteriormente
    delete createPostDto.authorEmail; //remove o campo do DTO para não dar erro quando usar o DTO para gravar no banco, já que o campo email não faz parte da entity

    const user = await this.prisma.user.findUnique({
      where:{
        email:authorEmail,
      }
    });

    if(!user){
      throw new NotFoundError('Autor não encontrado!');
    }

    const data: Prisma.PostCreateInput = {
      ...createPostDto, //passa todos os campos, menos o email que já foi removido do DTO
      author:{          //indica que vai passa o autor também
        connect:{       //um autor que já existe
          email: authorEmail, //pelo campo email, que já foi validado que existe este autor com este email.
        },
      },
    };

    return this.prisma.post.create({
      data,
    });
  }

  async findAll(): Promise<PostEntity[]> {
    return this.prisma.post.findMany({
      include:{
        author: true,
      }
    });
  }

  async findOne(id: number): Promise<PostEntity> {
    return this.prisma.post.findUnique({
      where:{
        id
      },
      include:{
        author: {
          select:{
            name:true,
            email:true,
          }
        }
      },
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto) : Promise<PostEntity> {
    const {authorEmail} = updatePostDto;

    if(!authorEmail){ //não tem email informado, atualiza pelo id
      return this.prisma.post.update({
        data: updatePostDto,
        where: {id},
      });
    }

    //tem email, tira do DTO para não dar erro com a entity que não tem esse campo
    delete updatePostDto.authorEmail;

    const user = await this.prisma.user.findUnique({
      where:{
        email:authorEmail,
      }
    });

    if(!user){
      throw new NotFoundError('Autor não encontrado!');
    }

    const data: Prisma.PostUpdateInput = {
      ... updatePostDto,      //passa todos os campos, menos o email que já foi removido do DTO
      author:{                //indica que vai passa o autor também
        connect:{             //um autor que já existe
          email:authorEmail,  //pelo campo email, que já foi validado que existe este autor com este email.
        }
      }
    }

    return this.prisma.post.update({
      where:{ id },
      data,
      include:{
        author:{
          select:{
            name:true
          }
        }
      }
    });
  }

  async remove(id: number) : Promise<PostEntity>{
    return this.prisma.post.delete({
      where:{
        id
      }
    });
  }
}
