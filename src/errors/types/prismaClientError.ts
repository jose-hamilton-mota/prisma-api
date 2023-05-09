import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

//além de definir o tipo para PrismaClientKnownRequestError ainda configura o campo [meta] que viria como object para o formato {target: string}
export type PrismaClientError = PrismaClientKnownRequestError & {
  meta?: {target: string}
};
