import { Module } from "@nestjs/common";
import { TasksController } from "./tasks/tasks.controller";
import { TasksModule } from "./tasks/tasks.module";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
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
  ],
  controllers: [TasksController],
})
export class AppModule {}
