import { IsEnum, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../tasks-status.enum";

// ? olması optional olduğunu belirtir.
// Birinden biri gönderilirse de çalışacaktır
export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
