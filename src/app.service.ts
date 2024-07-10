import { Injectable } from "@nestjs/common";
import { UploadDto } from "./dtos/upload.dto";
import { HandelFiles } from "./media/helpers/handel-files";
import * as google from "@googleapis/calendar";
import { getHolidays } from "public-holidays";

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World!";
  }

  async upload(file: any) {
    // handelFiles.handelFileTemp(file);
    return file.filename;
  }
  async getHolidays(countryCode: string, lang: string, start: any, end: any) {
    const holidays = await getHolidays({
      country: countryCode,
      lang: lang,
      start: new Date(start),
      end: new Date(end),
    });

    return holidays;
  }

  // Example usage
}
