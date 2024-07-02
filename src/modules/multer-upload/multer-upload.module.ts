import { Module } from "@nestjs/common";
import { MulterUploadService } from "./multer-upload.service";
import { MulterModule } from "@nestjs/platform-express";
import { initMulterDiskStorage } from "@utils";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UploadEntity } from "@db/entities";
import { MulterUploadController } from "./multer-upload.controller";

@Module({
	imports: [
		TypeOrmModule.forFeature([UploadEntity]),
		MulterModule.register({ storage: initMulterDiskStorage("public/uploads") }),
	],
	providers: [MulterUploadService],
	controllers: [MulterUploadController],
})
export class MulterUploadModule {}
