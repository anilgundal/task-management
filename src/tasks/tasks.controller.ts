import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTasksStatusDto } from "./dto/update-tasks-status.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { AuthGuard } from "@nestjs/passport";

// import { TaskStatus } from "./tasks-status.enum";
// import { CreateTaskDto } from "./dto/create-task.dto";
// import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
// import { UpdateTasksStatusDto } from "./dto/update-tasks-status.dto";

@Controller("tasks")
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get("/:id")
  getTaskById(@Param("id") id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Get()
  getTasks(@Query() filterDTO: GetTasksFilterDto): Promise<Task[]> {
    return this.taskService.getTasks(filterDTO);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }
  @Patch("/:id/status")
  updateTaskStatus(@Param("id") id: string, @Body() updateTaskStatusDto: UpdateTasksStatusDto): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.taskService.updateTaskStatus(id, status);
  }
  @Delete("/:id")
  deleteTask(@Param("id") id: string): Promise<void> {
    return this.taskService.deleteTask(id);
  }
}
