import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/globals/services/prisma.service";
import { HandelFiles } from "../media/helpers/handel-files";
import { DestinationDto } from "./dto/create/donut.dto";
import { EditDestinationDto } from "./dto/create/donut.dto";

@Injectable()
export class DestinationService {
  constructor(private prisma: PrismaService) {}

  async getDes(id: string) {
    return await this.prisma.destination.findUnique({
      where: { id },
      select: {
        tripDestinations: {
          select: {
            Trip: {
              select: {
                id: true,
                name: true,
                brief: true,
                tripImages: {
                  take: 1,
                  select: {
                    idImage: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }
  async AddDestination(data: DestinationDto, file: Express.Multer.File) {
    const { name, brief, idImage } = data;
    const handelFiles = new HandelFiles(data.name);
    HandelFiles.generatePath(file, data, data.name);

    await this.prisma.destination.create({
      data: {
        name,
        brief,
        idImage: "destinations/" + file.filename,
      },
    });
  }
  async EditDestination(
    id: string,
    data: EditDestinationDto,
    file: Express.Multer.File
  ) {
    const { name, brief, idImage } = data;

    if (file) {
      const handelFiles = new HandelFiles(data.name);
      HandelFiles.generatePath(file, data, data.name);
      await this.prisma.destination.update({
        where: {
          id,
        },
        data: {
          name,
          brief,
          idImage: "destinations/" + file.filename,
        },
      });
    } else {
      await this.prisma.destination.update({
        where: {
          id,
        },
        data: {
          name,
          brief,
        },
      });
    }
  }
  async deleteDes(id: string) {
    await this.prisma.destination.delete({
      where: {
        id,
      },
    });
  }
  async getAll() {
    const data = await this.prisma.destination.findMany({});
    return data;
  }
}
