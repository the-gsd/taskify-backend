import { Task } from "../model/task.model.js";
import { appError } from "../utils/appError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";

export const createTask = asyncHandler(async (req, res) => {
  const { title, description, priority, status } = req.body;
  if (
    [title, description, priority, status].some(
      (field) => field?.trim() === "" || field === undefined
    )
  ) {
    throw new appError(
      400,
      "title, description, priority, status all these fields are required."
    );
  }
  const userId = req.user._id;
  const task = await Task.create({
    title,
    description,
    priority,
    status,
    userId,
  });
  if (!task)
    throw new appError(500, "something went wrong while creating task.");
  return res
    .status(201)
    .json(new apiResponse(201, task, "task added successfully."));
});

export const getTasks = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  if (id) {
    // const task = await Task.findOne({
    //   $and: [{ _id: id }, { userId }],
    // });
    const task = await Task.findById(id);
    if (!task) throw new appError(404, "can not find task.");
    return res
      .status(200)
      .json(new apiResponse(200, task, "task fetched successfully."));
  } else {
    const tasks = await Task.find({ userId });
    if (!tasks) throw new appError(404, "can not find tasks.");
    return res
      .status(200)
      .json(new apiResponse(200, tasks, "tasks fetched successfully."));
  }
});

export const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, priority, status } = req.body;
  if (
    [title, description, priority, status].every(
      (field) => field?.trim() === "" || field === undefined
    )
  )
    throw new appError(
      400,
      "any one from title,description,priority and status is required."
    );
  const task = await Task.findByIdAndUpdate(
    id,
    {
      $set: { title, description, priority, status },
    },
    { new: true, runValidators: true }
  );
  if (!task)
    throw new appError(500, "something went wrong while updating the task.");
  return res
    .status(200)
    .json(new apiResponse(200, task, "task updated successfully."));
});

export const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedTask = await Task.deleteOne({ _id: id });
  console.log(deletedTask);
  if (!deletedTask) throw new appError(400, "can not find task to delete.");
  return res
    .status(200)
    .json(new apiResponse(204, deletedTask, "task deleted successfully."));
});
