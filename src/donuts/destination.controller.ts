import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  Res,
  Headers,
  Delete,
  Param,
  UploadedFile,
} from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { ResponseService } from "src/globals/services/response.service";
import { DestinationService } from "./destination.service";
import { UploadImage } from "../media/decorators/upload.decorator";
import { ResponseController } from "src/util/response.controller";
import { DestinationDto, EditDestinationDto } from "./dto/create/donut.dto";
import { uploadPath } from "src/media/configs/upload.config";

@Controller("destinations")
@ApiTags("Destinations")
export class DestinationController {
  constructor(
    private userService: DestinationService,
    private responseService: ResponseService
  ) {}

  @Post("/")
  @UploadImage(uploadPath.destinations, "idImage")
  async AddDestination(
    @Res() res: Response,
    @Body() destinationDto: DestinationDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    await this.userService.AddDestination(destinationDto, file);
    return ResponseController.success(res, "Add Destination Successfully");
  }
  @Patch("/:id")
  @UploadImage(uploadPath.destinations, "idImage")
  async EditDestination(
    @Res() res: Response,
    @Param("id") id: string,
    @Body() destinationDto: EditDestinationDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    await this.userService.EditDestination(id, destinationDto, file);
    return ResponseController.success(res, "Update Destination Successfully");
  }
  @Delete("/:id")
  async DeleteDestination(@Res() res: Response, @Param("id") id: string) {
    await this.userService.deleteDes(id);
    return ResponseController.success(res, "Add Destination Successfully");
  }

  @Get("/")
  async getAll(@Res() res: Response) {
    const data = await this.userService.getAll();
    return ResponseController.success(
      res,
      "Add Destination Successfully",
      data
    );
  }
  @Get("/:id")
  async getDes(@Res() res: Response, @Param("id") id: string) {
    const data = await this.userService.getDes(id);
    return ResponseController.success(
      res,
      "Get Destination Successfully",
      data
    );
  }
}
