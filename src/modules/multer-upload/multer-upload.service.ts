import { UploadEntity } from "@db/entities";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class MulterUploadService {
	constructor(
		@InjectRepository(UploadEntity)
		private readonly uploadEntityRepository: Repository<UploadEntity>,
	) {}

	create(files: Express.Multer.File[]) {
		return this.uploadEntityRepository.save(
			files.map((item) =>
				this.uploadEntityRepository.create({
					name: item.originalname,
					mimetype: item.mimetype,
					path: item.destination,
				}),
			),
		);
	}

	async getOneById(id: string) {
		const entity = await this.uploadEntityRepository.findOne({
			where: { id },
		});
		if (!entity) throw new NotFoundException();
		return entity;
	}
}
