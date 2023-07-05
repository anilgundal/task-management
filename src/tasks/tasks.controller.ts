import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task, TaskStatus } from "./tasks.model";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { UpdateTasksStatusDto } from "./dto/update-tasks-status.dto";

@Controller("tasks")
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() filterDTO: GetTasksFilterDto): Task[] {
    // İf we have any filter defined, call tasksService.getTasksWithFilters
    // Otherwise, just get all tasks.

    if (Object.keys(filterDTO).length) {
      return this.taskService.getTasksWithFilters(filterDTO);
    } else {
      return this.taskService.getAllTasks();
    }
  }

  @Get("/:id")
  getTaskById(@Param("id") id: string): Task {
    return this.taskService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.createTask(createTaskDto);
  }

  @Patch("/:id/status")
  updateTaskStatus(@Param("id") id: string, @Body() updateTaskStatusDto: UpdateTasksStatusDto): Task {
    const { status } = updateTaskStatusDto;
    return this.taskService.updateTaskStatus(id, status);
  }

  @Delete("/:id")
  deleteTask(@Param("id") id: string): void {
    return this.taskService.deleteTask(id);
  }
}
