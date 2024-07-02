import {
	Controller,
	Get,
	Param,
	Post,
	Res,
	UploadedFiles,
	UseInterceptors,
} from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { UploadDto } from "./dto";
import { FilesInterceptor } from "@nestjs/platform-express";
import { MulterUploadService } from "./multer-upload.service";
import { Response } from "express";

@Controller("multer-upload")
@ApiTags("multer-upload")
export class MulterUploadController {
	constructor(private readonly multerUploadService: MulterUploadService) {}

	@Post("static-upload")
	@ApiConsumes("multipart/form-data")
	@ApiBody({ type: UploadDto })
	@UseInterceptors(FilesInterceptor("files"))
	uploadStatic(@UploadedFiles() files: Express.Multer.File[]) {
		return files.map((file) => {
			const host = "http://localhost:3000";
			return `${host}/public/uploads/${file.filename}`;
		});
	}

	@Post("upload-entity")
	@ApiConsumes("multipart/form-data")
	@ApiBody({ type: UploadDto })
	@UseInterceptors(FilesInterceptor("files"))
	async uploadEntity(@UploadedFiles() files: Express.Multer.File[]) {
		const data = await this.multerUploadService.create(files);
		return data.map((entity) => {
			const host = "http://localhost:3000";
			return `${host}/multer-upload/${entity.id}`;
		});
	}

	@Get(":id")
	async getEntity(@Param("id") id: string, @Res() res: Response) {
		const data = await this.multerUploadService.getOneById(id);
		res.sendFile(data.name, { root: data.path });
	}
}
