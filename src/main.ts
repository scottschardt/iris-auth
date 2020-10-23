import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  console.log('test')
  await app.listen(port);
}


const connect = async () => {
  let retries = 5;
  while (retries) {
    console.log(retries)
    try {
      await bootstrap();
      break;
    } catch(err) {
      console.log(err)
      retries = -1
      await new Promise(res => setTimeout(res, 3000)) 
    
    }
  }
}

connect();
