import { ConflictError } from "./conflictError";
import { PrismaClientError } from "./prismaClientError";


export class UniqueConstraintError extends ConflictError{
  constructor(e:PrismaClientError){
    const uniqueField = e.meta.target;

    super(`Já existe registro com o campo ${uniqueField} .`);
  }
}
