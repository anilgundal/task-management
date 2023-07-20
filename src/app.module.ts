import { Module } from "@nestjs/common";
import { TasksController } from "./tasks/tasks.controller";
import { TasksModule } from "./tasks/tasks.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import * as process from "process";
import { configValidationSchema } from "./config.schema";

@Module({
  // Init ConfigModule to project
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`], // dev or prod
      validationSchema: configValidationSchema,
    }),
    TasksModule,
    // Dependency Injection için TypeORM Module'u async olarak tanımladık
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // import config module dependency, depends ConfigModule
      inject: [ConfigService], //
      useFactory: async (configService: ConfigService) => ({
        type: "postgres",
        autoLoadEntities: true, // Load entities automatically
        synchronize: true, //Always true database schema sync
        host: configService.get("DB_HOST"),
        port: configService.get("DB_PORT"),
        username: configService.get("DB_USER"),
        password: configService.get("DB_PASS"),
        database: configService.get("DB_NAME"),
      }),
    }),
    /*
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "task-management",
      autoLoadEntities: true, // Load entities automatically
      synchronize: true, //Always true database schema sync
    }),

  */
    AuthModule,
  ],
  controllers: [TasksController],
})
export class AppModule {}
