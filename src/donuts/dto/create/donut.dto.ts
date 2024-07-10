import { ApiProperty } from "@nestjs/swagger";
import {
  IsDate,
  IsNotEmpty,
  IsString,
  IsOptional,
  isNotEmpty,
} from "class-validator";

export class DestinationDto {
  @ApiProperty({ example: "Destination" })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "sssss" })
  @IsNotEmpty()
  brief: string;

  @ApiProperty({ type: "string", format: "binary", required: true })
  idImage: string;
}

export class EditDestinationDto {
  @ApiProperty({ example: "Destination" })
  @IsOptional()
  name: string;

  @ApiProperty({ example: "sssss" })
  @IsOptional()
  brief: string;

  @ApiProperty({ type: "string", format: "binary", required: false })
  @IsOptional()
  idImage: string;
}
