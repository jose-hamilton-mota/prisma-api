import { DatabaseError } from "../types/databaseError";
import { PrismaClientError } from "../types/prismaClientError";
import { UniqueConstraintError } from "../types/uniqueConstraintError";


enum PrismaErrors{
  UniqueConstraintFail  = 'P2002',
  ForeignKeyFail        = 'P2003',
  ConstraintFail        = 'P2004',
  ValueInvalidFieldTypeFail = 'P2005',
  ValueInvalidFieldFail = 'P2006',
  DataValidationFail    = 'P2007',
}

export const handleDatabaseErrors = (e:PrismaClientError): Error =>{
  switch (e.code){
    case PrismaErrors.UniqueConstraintFail:
        return new UniqueConstraintError(e);

    default:
        return new DatabaseError(e.message)
  }
}
