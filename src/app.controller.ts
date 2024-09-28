import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { MailerService } from '@nestjs-modules/mailer';

type NotificationDTO = {
  email: string;
  startAt: Date;
  endAt: Date;
  name: string;
  title: string;
  description: string;
};

@Controller()
export class AppController {
  constructor(private mailerService: MailerService) {}

  @MessagePattern('tp_task_notification_1')
  async taskNotification(data: NotificationDTO) {
    console.log(`=== MENSAGEM RECEBIDA === ` + JSON.stringify(data));
    const result = await this.mailerService.sendMail({
      to: data.email,
      subject: 'Notificação de tarefa - Enviado com Kafka',
      from: 'taskmanager@nestjscurso.com.br',
      html: `
        <body>
            <h1>Olá ${data.name} </h1>

            <span>Você tem uma tarefa para hoje </span>
            <br/>
            <span>Título: ${data.title}</span>
            <br/>
            <span>Descrição: ${data.description}</span>
            <br/>
            <span>Início: ${data.startAt}</span>
            <br/>
            <span>Fim: ${data.endAt}</span>
        </body>
      `,
    });
    console.log(result);
  }
}
