import { Test } from "@nestjs/testing";
import { TasksService } from "./tasks.service";
import { TasksRepository } from "./tasks.repository";
import { TaskStatus } from "./tasks-status.enum";
import { NotFoundException } from "@nestjs/common";

// Tasks Service needs Tasks Repository
// Bu yüzden mockTasksRepository oluşturuyoruz
const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
});

const mockUser = {
  username: "Ariel",
  id: "someId",
  password: "somePass",
  tasks: [],
};

describe("TasksService", () => {
  let tasksService: TasksService;
  let tasksRepository;

  beforeEach(async () => {
    // initialize a NestJS module with tasksService and tasksRepository
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: TasksRepository,
          useFactory: mockTasksRepository,
        },
      ],
    }).compile();

    tasksService = await module.get<TasksService>(TasksService);
    tasksRepository = await module.get<TasksRepository>(TasksRepository);
  });

  describe("getTasks", () => {
    it("calls TasksRepository.getTaks and return result!", async () => {
      // expect(tasksRepository.getTasks).not.toHaveBeenCalled();
      tasksRepository.getTasks.mockResolvedValue("someVal"); // Promise olduğu için mockResolved kullandık
      // call tasksService.getTasks, which should then call the repository's getTasks
      const result = await tasksService.getTasks(null, mockUser);
      // expect(tasksRepository.getTasks).toHaveBeenCalled();
      expect(result).toEqual("someVal");
    });
  });

  describe("getTasksById", () => {
    it("calls TasksRepository.findOneBy and returns the result", async () => {
      const mockTasks = {
        title: "Tasks Title",
        description: "Tasks description",
        id: "someID",
        status: TaskStatus.OPEN,
      };

      tasksRepository.findOne.mockResolvedValue(mockTasks);

      const result = await tasksService.getTaskById("someID", mockUser);
      expect(result).toEqual(mockTasks);
    });
    it("calls TasksRepository.findOneBy and handles the error", async () => {
      tasksRepository.findOne.mockResolvedValue(null);
      expect(tasksService.getTaskById("someID", mockUser)).rejects.toThrow(NotFoundException);
    });
  });
});
