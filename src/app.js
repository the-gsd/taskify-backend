import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./middleware/globalErrorHandler.middleware.js";
import { appError } from "./utils/appError.js";
import { userRouter } from "./routes/user.routes.js";
import { taskRouter } from "./routes/task.routes.js";
import { verifyJWT } from "./middleware/auth.middleware.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb", extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// giving routes.
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/tasks", verifyJWT, taskRouter);

app.all("*", (req, res, next) => {
  throw new appError(404, `can't find ${req.originalUrl} on this server!`);
});
app.use(globalErrorHandler);

export { app };
