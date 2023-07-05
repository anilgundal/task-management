import { Injectable, NotFoundException } from "@nestjs/common";
import { Task, TaskStatus } from "./tasks.model";
import { v4 as uuid } from "uuid";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    // define a temporary array to hold the result
    let tasks = this.getAllTasks();

    // do something with status
    if (status) {
      tasks = tasks.filter(task => task.status === status);
    }

    // do something with search
    if (search) {
      tasks = tasks.filter(task => {
        // if kısaltılmış hali
        // return task.title.includes(search) || task.description.includes(search);

        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }

    // return final result
    return tasks;
  }

  getTaskById(id: string) {
    // try to get task
    const found = this.tasks.find(task => task.id === id);

    // if not found, throw an error (404 not found)
    if (!found) {
      throw new NotFoundException(`Task with "${id}" not found!`);
    }
    //otherwise return the found task
    return found;
  }

  createTask(crateTaskDto: CreateTaskDto): Task {
    const { title, description } = crateTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);

    return task;
  }

  updateTaskStatus(id: string, status: TaskStatus) {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  deleteTask(id: string): void {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter(task => task.id !== found.id);
  }
}
