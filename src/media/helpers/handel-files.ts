import * as path from "path";
import { handelSucceededTemp } from "./handel-temp-files";
import { renameFile } from "./rename-file";

export class HandelFiles {
  private baseFolder?: string | number;
  constructor(baseFolder: string | number) {
    this.baseFolder = baseFolder;
  }

  handelFilesObjectTemp(filesObject: { [key: string]: Express.Multer.File[] }) {
    Object.values(filesObject).map((files) => {
      if (files) return handelSucceededTemp(files, this.baseFolder);
    });
  }

  handelFileTemp(file: Express.Multer.File) {
    return renameFile(
      file?.path,
      HandelFiles.path(file?.path, this.baseFolder)
    );
  }

  static path(
    filePath: string | undefined,
    baseFolder?: string | number | undefined
  ) {
    if (baseFolder) {
      return path
        .join(path.dirname(filePath), `${baseFolder}`, path.basename(filePath))
        .replace(env("TEMP_FILE_KEY"), "");
    } else {
      return path
        .join(path.dirname(filePath), path.basename(filePath))
        .replace(env("TEMP_FILE_KEY"), "");
    }
  }

  static generatePath<
    FilesType extends Express.Multer.File | Express.Multer.File[],
    DTOType
  >(files: FilesType, dto: DTOType, parentPath?: string | number) {
    if (Array.isArray(files))
      for (const key of Object.keys(files)) {
        dto[files[key]] =
          process.env.MEDIA_LINK +
          HandelFiles.path(files[key]?.at(0).path, parentPath);
      }
    else
      dto[files.fieldname] = parentPath
        ? process.env.MEDIA_LINK + HandelFiles.path(files?.path, parentPath)
        : process.env.MEDIA_LINK + HandelFiles.path(files?.path);
  }

  static handelReplaced<FilesType, CurrentDocsType>(
    files: FilesType,
    currentDocs: CurrentDocsType
  ) {
    for (const key of Object.keys(files)) {
      if (files[key]?.at(0)?.path !== currentDocs[key] && currentDocs[key]) {
        renameFile(
          currentDocs[key],
          HandelFiles.path(currentDocs[key], "replaced")
        );
      }
    }
  }
}
