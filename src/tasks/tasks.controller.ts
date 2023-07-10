import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTasksStatusDto } from "./dto/update-tasks-status.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { AuthGuard } from "@nestjs/passport";
import { User } from "../auth/user.entity";
import { GetUser } from "../auth/get-user.decorator";
import { ConfigService } from "@nestjs/config";
// import { TaskStatus } from "./tasks-status.enum";
// import { CreateTaskDto } from "./dto/create-task.dto";
// import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
// import { UpdateTasksStatusDto } from "./dto/update-tasks-status.dto";

@Controller("tasks")
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger("TaskController"); // Logların nereden geldiği anlaşılır.
  constructor(private taskService: TasksService, private configService: ConfigService) {
    console.log(configService.get("TEST_VAL"));
  }

  @Get()
  getTasks(@Query() filterDTO: GetTasksFilterDto, @GetUser() user: User): Promise<Task[]> {
    this.logger.verbose(`User '${user.username}' retrieving all tasks! Filters: ${JSON.stringify(filterDTO)}`);
    return this.taskService.getTasks(filterDTO, user);
  }

  @Get("/:id")
  getTaskById(@Param("id") id: string, @GetUser() user: User): Promise<Task> {
    return this.taskService.getTaskById(id, user);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User): Promise<Task> {
    this.logger.verbose(`User '${user.username}' creating new task! Data: ${JSON.stringify(createTaskDto)}`);
    return this.taskService.createTask(createTaskDto, user);
  }
  @Patch("/:id/status")
  updateTaskStatus(@Param("id") id: string, @Body() updateTaskStatusDto: UpdateTasksStatusDto, @GetUser() user: User): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.taskService.updateTaskStatus(id, status, user);
  }
  @Delete("/:id")
  deleteTask(@Param("id") id: string, @GetUser() user: User): Promise<void> {
    return this.taskService.deleteTask(id, user);
  }
}
