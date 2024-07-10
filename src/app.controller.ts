import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
  UseGuards,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { AuthGuard } from "@nestjs/passport";
import { Request, Response } from "express";
import { WorkData } from "./static/work";
import { CountriesData } from "./static/countries";
import { NationalityData } from "./static/nationality";
import { ResponseController } from "./util/response.controller";
import { UploadImage } from "./media/decorators/upload.decorator";
import { uploadPath } from "./media/configs/upload.config";
import { UploadDto } from "./dtos/upload.dto";
import axios from "axios";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
