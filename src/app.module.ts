import { Module } from "@nestjs/common";
import { TasksController } from "./tasks/tasks.controller";
import { TasksModule } from "./tasks/tasks.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import * as process from "process";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`], // dev or prod
    }),
    TasksModule,
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
    AuthModule,
  ],
  controllers: [TasksController],
})
export class AppModule {}
