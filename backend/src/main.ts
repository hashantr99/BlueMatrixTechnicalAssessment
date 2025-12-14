import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // enable CORS
  app.enableCors({
    origin: '*', // Replace with your frontend URL (Next.js)
    methods: 'GET, POST, PUT, DELETE', // allow specific HTTP methods
    allowedHeaders: 'Content-Type, Authorization', // allow specific headers
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
