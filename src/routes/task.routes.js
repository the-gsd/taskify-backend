import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../controller/task.controller.js";

const taskRouter = Router();

taskRouter.route("/").post(createTask);
taskRouter.route("/:id?").get(getTasks);
taskRouter.route("/:id").patch(updateTask).delete(deleteTask);

export { taskRouter };
