import { IsEnum } from "class-validator";
import { TaskStatus } from "../tasks-status.enum";

export class UpdateTasksStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
