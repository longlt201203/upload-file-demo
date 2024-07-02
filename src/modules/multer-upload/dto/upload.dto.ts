import { ApiProperty } from "@nestjs/swagger";

export class UploadDto {
	@ApiProperty({ type: "string", format: "binary", isArray: true })
	files: any[];
}
