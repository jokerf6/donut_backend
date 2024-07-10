import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class UploadDto {
  @IsOptional()
  title?: string;

  @ApiProperty({
    type: "string",
    format: "binary",
    required: true,
  })
  idImage: Express.Multer.File;
}
