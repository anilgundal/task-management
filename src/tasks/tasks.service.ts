import { Injectable, NotFoundException } from "@nestjs/common";
import { TasksRepository } from "./tasks.repository";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./tasks-status.enum";

// import { TaskStatus } from "./tasks-status.enum";
// import { CreateTaskDto } from "./dto/create-task.dto";
// import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`Task with ID "${id}" not found!`);
    return found;
  }
  // getTaskById(id: string) {
  //   // try to get task
  //   const found = this.tasks.find(task => task.id === id);
  //
  //   // if not found, throw an error (404 not found)
  //   if (!found) {
  //     throw new NotFoundException(`Task with "${id}" not found!`);
  //   }
  //   //otherwise return the found task
  //   return found;
  // }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  // updateTaskStatus(id: string, status: TaskStatus) {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
  //
  // deleteTask(id: string): void {
  //   const found = this.getTaskById(id);
  //   this.tasks = this.tasks.filter(task => task.id !== found.id);
  // }
}
