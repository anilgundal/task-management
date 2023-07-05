import { TaskStatus } from "../tasks.model";
import { IsEnum, IsOptional, IsString } from "class-validator";

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
