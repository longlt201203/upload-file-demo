import { Module } from "@nestjs/common";
import { APP_FILTER, APP_PIPE } from "@nestjs/core";
import { MyExceptionFilter, ValidationPipe } from "@utils";
import { MulterUploadModule } from "@modules/multer-upload";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { DbModule } from "@db";

@Module({
	imports: [
		DbModule,
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, "..", "public"),
			serveRoot: "/public",
		}),
		MulterUploadModule,
	],
	controllers: [],
	providers: [
		{
			provide: APP_FILTER,
			useClass: MyExceptionFilter,
		},
		{
			provide: APP_PIPE,
			useClass: ValidationPipe,
		},
	],
})
export class AppModule {}
