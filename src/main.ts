import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { UnauthorizedInterceptor } from './errors/interceptors/unauthorized.interceptor';
import { NotFoundInterceptor } from './errors/interceptors/notfound.interceptor';
import { ConflictInterceptor } from './errors/interceptors/conflict.interceptor';
import { DatabaseInterceptor } from './errors/interceptors/database.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes( new ValidationPipe({
    whitelist:true,
    forbidNonWhitelisted:true,
    transform:true,
  }));
  //app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors( new ConflictInterceptor() );
  app.useGlobalInterceptors( new DatabaseInterceptor() );
  app.useGlobalInterceptors( new UnauthorizedInterceptor() );
  app.useGlobalInterceptors( new NotFoundInterceptor() );


  const configDocument = new DocumentBuilder()
      .setTitle('Projeto Prisma-api')
      .setDescription('API description')
      .setVersion(process.env.VERSION)
      //.addTag('')
      .build();
  const document = SwaggerModule.createDocument(app,configDocument);
  SwaggerModule.setup('api',app,document);


  await app.listen(process.env.PORT || 3000);
}
bootstrap();
