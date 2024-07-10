import { Module } from "@nestjs/common";

import { JwtModule } from "@nestjs/jwt";
import { MailerModule } from "@nestjs-modules/mailer";
import { GlobalModule } from "src/globals/global.module";
import { MediaModule } from "src/media/media.module";
import { AppController } from "src/app.controller";
import { AppService } from "src/app.service";
import { ScheduleModule } from "@nestjs/schedule";
import { HttpModule, HttpService } from "@nestjs/axios";
import { DestinationModule } from "./destination/destination.module";
import { TripsModule } from './trips/trips.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: env("MAIL_HOST"),
        secure: false,
        port: env("MAIL_PORT"),

        auth: {
          user: env("MAIL_USER"),
          pass: env("MAIL_PASSWORD"),
        },
      },
      defaults: {
        from: `${env("SENDER_NAME")} <${env("SENDER_EMAIL")}>`,
      },
    }),
    GlobalModule,
    MediaModule,
    DestinationModule,
    TripsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
