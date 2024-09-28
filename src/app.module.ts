import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: 'nathanael.vandervort31@ethereal.email',
          pass: 'YeT27FHj5KgUZXjnaU',
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
