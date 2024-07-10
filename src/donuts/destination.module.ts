import { Module } from "@nestjs/common";
import { MyModule } from "./(modules)/my/my.module";
import { DestinationController } from "./destination.controller";
import { DestinationService } from "./destination.service";

@Module({
  imports: [MyModule],
  controllers: [DestinationController],
  providers: [DestinationService],
  exports: [DestinationService],
})
export class DestinationModule {}
