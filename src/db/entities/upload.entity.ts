import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class UploadEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	name: string;

	@Column()
	mimetype: string;

	@Column()
	path: string;

	@CreateDateColumn()
	createdAt: Date;
}
